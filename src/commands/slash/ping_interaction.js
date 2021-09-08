const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'ping',
	slash: true,
	async execute (client, interaction) {
		interaction.reply(
			new MessageEmbed()
				.setDescription("🏓 " + client.ws.ping + " ms")

		)
	}
}