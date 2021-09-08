const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'invite',
	description: 'Get the bots invite link',
	usage: '[brief description]',
	aliases: ['gib_bot', 'bot'],
	example: '>invite',
	args: false,
	async execute(client, message, args) {
		let embed = new MessageEmbed()
		.setAuthor("Invite Bot!")
		.setDescription("On a mobile device click [here](https://discord.com/api/oauth2/authorize?client_id=808343390197383209&permissions=806284502&redirect_uri=https%3A%2F%2Ftickets.ducc.one%2F&scope=bot%20applications.commands)");

		embed.author.url = "https://discord.com/api/oauth2/authorize?client_id=808343390197383209&permissions=806284502&redirect_uri=https%3A%2F%2Ftickets.ducc.one%2F&scope=bot%20applications.commands";
		embed.author.iconURL = "https://cdn.discordapp.com/avatars/808343390197383209/5522de8eefec05f1d5c89d27a99e1635.png";
		message.channel.send(
			{
				embeds: [
					embed
				]
			}
		)
	}
};
