const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
	name: 'pandaman',
	description: 'PANDAMAN',
	usage: '[brief description]',
	aliases: ['christhemesong'],
	example: '>pandaman',
	args: false,
	async execute(client, message, args) {
        const song = new MessageAttachment()
                        .setFile('../assets/pandaman.mp3');
		message.reply({
            files: [song]
        });
	}
};
