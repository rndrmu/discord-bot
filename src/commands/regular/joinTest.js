const { MessageEmbed } = require('discord.js');

module.exports = {
        name: 'testjoin',
        description: 'Emits `guildMemberAdd`',
        usage: '[brief description]',
        aliases: ['helo'],
        example: '>joinTest',
        args: false,
	permission: "MANAGE_ROLES",
        async execute(client, message, args) {
           client.emit('guildMemberAdd', message.member);
           

        }
};
