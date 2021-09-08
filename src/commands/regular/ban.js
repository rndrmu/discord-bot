const { MessageEmbed, Client } = require('discord.js');

module.exports = {
	name: 'ban',
	description: 'Ban a User by ID',
	usage: '[user reason]',
	aliases: ['ban', 'hammer', 'yeet'],
	example: '>ban <user-id>',
	args: true,
	permission: 'BAN_MEMBERS',
	async execute(client, message, args) {
		//if the bot does not have the permission to ban members, throw an error
		if (!client.member.permissions.has('BAN_MEMBERS')) {
			return message.reply('I do not have the permission to ban members in this guild!');
		}

		//if the user did not provide a reason, throw an error
		if (!args) {
			return message.reply('Please provide a user and reason for your ban.');
		}
		let user = args.shift();
        let reason = args.join(' ');
		let pollembed = (who, why) => { return new MessageEmbed()
			.setTitle('Banned')
			.setDescription(`<@${who}> ${why}`);
        };
		let errorEmbed = (why) => {
			return new MessageEmbed()
				.setTitle("Error")
				.setDescription("Full Error: " + why);
		};

        if (client.guilds.cache.get(message.guild.id).me.permissions.has("BAN_MEMBERS")) {
			try {
				client.guilds.cache.get(message.guild.id).members.cache.get(user).ban({ reason: reason }).catch( err => {
					console.log("ERROR " + err);
					message.channel.send({ embeds: [errorEmbed(err)]});
				});
			message.channel.send({
				embeds: [pollembed(user, reason)]
			});
			} catch (error) {
				console.log(error);
				message.channel.send({ embeds: [errorEmbed(error)]});
			}
		} else {
			message.channel.send(':x: I don\'t have the `BAN_MEMBERS` permission');
		}
	}
};