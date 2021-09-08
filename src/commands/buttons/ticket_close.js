
const { MessageEmbed } = require('discord.js');
const { join } = require('path');
const fs = require('fs');
const wait = require('util').promisify(setTimeout);
const archive = require('../../modules/archive');

module.exports = {
	name: 'ticket_close',

	async execute(client, interaction, { config, Ticket, Setting, Timezones}) {

		let ticket;
		let channel = false;
		// || client.channels.resolve(await Ticket.findOne({ where: { id: args[0] } }).channel) // channels.fetch()

		if (!channel) {
			channel = interaction.channel;

			ticket = await Ticket.findOne({
				where: {
					channel: interaction.channelId
				}
			});
			//if (!ticket) return interaction.channel.send(notTicket);
		} else {
			ticket = await Ticket.findOne({
				where: {
					channel: channel.id
				}
			});
			if (!ticket) {
				console.log("fuck");
			}

		}

		let paths = {
			text: join(__dirname, `../../../user/transcripts/text/${ticket.get('channel')}.txt`),
			log: join(__dirname, `../../../user/transcripts/raw/${ticket.get('channel')}.log`),
			json: join(__dirname, `../../../user/transcripts/raw/entities/${ticket.get('channel')}.json`)
		};

		await interaction.deferUpdate();
		interaction.editReply({
			embeds: [
				new MessageEmbed()
					.setTitle('Ticket Closed')
					.setDescription('The ticket will be closed once the content has been archived')
			]
		});
		let users = [];
		if (config.transcripts.text.enabled || config.transcripts.web.enabled) {
			let u = await client.users.fetch(ticket.creator);
			if (u) {
				let dm;
				try {
					dm = u.dmChannel || await u.createDM();
				} catch (e) {
					log.warn(`Could not create DM channel with ${u.tag}`);
				}

				let res = {};
				const embed = new MessageEmbed()
					.setColor(config.colour)
					.setAuthor(interaction.user.username, interaction.user.displayAvatarURL())
					.setTitle(`Ticket ${ticket.id}`)
					.setFooter(interaction.guild.name, interaction.guild.iconURL());

				if (fs.existsSync(paths.text)) {
					embed.addField('Text transcript', 'See attachment');
					res.files = [{
						attachment: paths.text,
						name: `ticket-${ticket.id}-${ticket.get('channel')}.txt`
					}];
				}

				if (fs.existsSync(paths.log) && fs.existsSync(paths.json)) {
					let data = JSON.parse(fs.readFileSync(paths.json));
					for (u in data.entities.users) users.push(u);
					embed.addField('Web archive', await archive.export(Ticket, channel)); // this will also delete these files
				}

				if (embed.fields.length < 1) {
					embed.setDescription(`No text transcripts or archive data exists for ticket ${ticket.id}`);
				}

				res.embed = embed;

				try {
					if (config.commands.close.send_transcripts) dm.send(res);
					if (config.transcripts.channel.length > 1) client.channels.cache.get(config.transcripts.channel).send({
						embeds: [res.embed],
					});
				} catch (e) {
					console.log("hehelol");
					//interaction.channel.send('❌ Couldn\'t send DM or transcript log message');
				}
			}
		}

		// update database
		ticket.update({
			open: false
		}, {
			where: {
				channel: channel.id
			}
		});

		// update the interaction reply, indicating that archiving has concluded
		// and channel will be deleted
		interaction.editReply({
			embeds: [
				new MessageEmbed()
					.setTitle('Ticket Closed')
					.setDescription('The ticket has been closed and archived')
			]
		});

		// wait 5 seconds, so that the user can see the message
		await wait(5000);

		// delete the channel
		channel.delete({
			timeout: 5000
		});

		console.log(`${interaction.user.tag} closed a ticket (#ticket-${ticket.id})`);

		if (config.logs.discord.enabled) {
			let embed = new MessageEmbed()
				.setColor(config.colour)
				.setAuthor(interaction.user.username, interaction.user.displayAvatarURL())
				.setTitle(`Ticket ${ticket.id} closed`)
				.addField('Creator', `<@${ticket.creator}>`, true)
				.addField('Closed by', interaction.author, true)
				.setFooter(interaction.guild.name, interaction.guild.iconURL())
				.setTimestamp();

			/* if (users.length > 1)
				embed.addField('Members', users.map(u => `<@${u}>`).join('\n')); */

			client.channels.cache.get(config.logs.discord.channel).send(embed);
		}
	}
};
