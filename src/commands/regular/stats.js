/**
 *
 *  @name DiscordTickets
 *  @author eartharoid <contact@eartharoid.me>
 *  @license GNU-GPLv3
 *
 */

const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'stats',
	description: 'View ticket stats.',
	usage: '',
	aliases: ['data', 'statistics'],
	DMenabled: false,
	
	args: false,
	async execute(client, message, _args, {config, Ticket}) {
		const guild = client.guilds.cache.get(config.guild);

		let open = await Ticket.count({ where: { open: true } });
		let closed = await Ticket.count({ where: { open: false } });
		console.log(open. closed);
		message.channel.send(
			new MessageEmbed()
				.setColor(config.colour)
				.setTitle(':bar_chart: Statistics')
				//.addField('Open tickets', open === undefined ? "No Tickets or failed to fetch" : open, true)
				//.addField('Closed tickets', closed === undefined ? "No Tickets or failed to fetch" : closed, true)
				.setFooter(guild.name, guild.iconURL())
		);
	}
};