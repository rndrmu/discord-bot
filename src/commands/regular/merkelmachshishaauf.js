const { MessageActionRow, SelectMenuInteraction, MessageSelectMenu, MessageEmbed, MessageButton } = require('discord.js');

module.exports = {
	name: 'thread',
	description: 'Creates new Thread',
	usage: '',
	aliases: ['ct', 'nt'],
	args: false,
	DMenabled: true,
	permission: 'MANAGE_CHANNELS',

	async execute (client, message, args) {
		const thread = await message.channel.threads.create({
			name: `Thread by ${message.author.username}`,
			autoArchiveDuration: 60,
		});
        
		console.log(`Created thread: ${thread.name}`);

        
	}
};