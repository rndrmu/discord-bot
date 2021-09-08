const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
        name: 'pandaman_full',
        description: 'PANDAMAN',
        usage: '[brief description]',
        aliases: ['christhemesong_full'],
        example: '>pandaman',
        args: false,
        async execute(client, message, args) {
        const song = new MessageAttachment()
                        .setFile('../../assets/pandaman_full.mp3');
                message.reply({
            files: [song]
        });
        }
};