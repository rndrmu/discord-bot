
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
//const config = require('../../../user/dev.config');
const fs = require('fs');
module.exports = {
	name: 'ticket_new',

	async execute(client, interaction, { config, Ticket, Setting, Timezones}) {

		 const supportRole = interaction.guild.roles.cache.get(config.staff_role),
			userRole      = interaction.guild.roles.cache.get('605527524143005716'),
			elevatedMod   = interaction.guild.roles.cache.get('734056403777486858'),
			adminRole     = interaction.guild.roles.cache.get('605529301969928212'),
			ownerRole     = interaction.guild.roles.cache.get('605524794590625802'), 
			// eslint-disable-next-line no-unused-vars
			 citizen = interaction.guild.roles.cache.get('605527524143005716');

		let tickets = await Ticket.findAndCountAll({
			where: {
				creator: interaction.user.id,
				open: true
			},
			limit: config.tickets.max
		});

		if (tickets.count >= config.tickets.max) {
			let ticketList = [];
			for (let t in tickets.rows) {
				let desc = tickets.rows[t].topic.substring(0, 30);
				ticketList
					.push(`<#${tickets.rows[t].channel}>: \`${desc}${desc.length > 30 ? '...' : ''}\``);
			}

			await interaction.reply(
				{
					embeds: [
						new MessageEmbed()
							.setColor(config.err_colour)
							.setAuthor('Test', 'https://cdn.discordapp.com/avatars/840626952745910343/8c156e31a2b9a84840dec90a392e2a90.png')
							.setTitle(`❌ **You already have ${tickets.count} or more open tickets**`)
							.setDescription(`Use \`${config.prefix}close\` to close unneeded tickets.\n\n${ticketList.join(',\n')}`)
					],
					ephemeral: true,
				}
			);
		}

		let ticket = await Ticket.create({
			channel: '',
			creator: interaction.user.id,
			open: true,
			archived: false,
			topic: 'none'
		});

		let name = 'ticket-' + ticket.get('id');

		interaction.guild.channels.create(name, {
			type: 'text',
			topic: `${interaction.user.tag}`,
			parent: config.tickets.category,
			permissionOverwrites: [{
				id: interaction.guild.roles.everyone,
				deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
			},
			{
				id: userRole, 
				deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
			}, 
			
			{
				id: client.user, // me :pepoHappy:
				allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MANAGE_MESSAGES']
			},
			{
				id: interaction.guild.members.cache.get(interaction.user.id), // Ticket Creator
				allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY']
			},
			{
				id: supportRole, //Basic @Council Role, everyone SHOULD have that, but redundancy bois
				allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MANAGE_MESSAGES']
			},
			{
				id: elevatedMod, //  @Deputy Role, should still be in first categor, but le failsafe
				allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MANAGE_MESSAGES']
			},
			{
				id: adminRole, //  @Chamber Role, should still be in first category, but le failsafe
				allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MANAGE_MESSAGES']
			},
			{
				id: ownerRole, //  Daddy Blank UwU, zwar eh admin aber whatever lol
				allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MANAGE_MESSAGES']
			}  
			],
			reason: 'User requested a new support ticket channel'
		}).then(async c => {

			Ticket.update({
				channel: c.id
			}, {
				where: {
					id: ticket.id
				}
			});

			interaction.reply(
				{
					embeds: [
						new MessageEmbed()
							.setColor(config.colour)
							.setAuthor('Test', 'https://cdn.discordapp.com/avatars/840626952745910343/8c156e31a2b9a84840dec90a392e2a90.png')
							.setTitle('✅ **Ticket created**')
							.setDescription(`Your ticket has been created: ${c}`)
					],
					ephemeral: true,
				}
			);
			let u = interaction.user;

			await c.send({
				content: ` <@&605529301969928212> <@&605525245813719052>, \n ${interaction.user.tag} has created a new ticket`
			});

			let text = config.tickets.text
				.replace(/{{ ?name ?}}/gmi, u.username)
				.replace(/{{ ?(tag|mention) ?}}/gmi, u);
			let controlsRow = new MessageActionRow()
				.addComponents(
					[
						new MessageButton()
							.setLabel('Close Ticket')
							.setEmoji('🔒')
							.setStyle('SECONDARY')
							.setCustomId('ticket_close')
							.setDisabled(false),
						new MessageButton()
							.setLabel('Delete Ticket')
							.setEmoji('❌')
							.setStyle('DANGER')
							.setCustomId('delete_ticket')
							.setDisabled(true)
					]
				);

			await c.send(
				{
					embeds: [
						new MessageEmbed()
							.setColor(config.colour)
							.setDescription(text)
							.addField('Topic', '`none, created via panel`')
							.setFooter(interaction.guild.name, interaction.guild.iconURL())
					],
					components: [controlsRow]
				}
			);
		});
	}
};