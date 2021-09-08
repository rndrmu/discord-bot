const { MessageEmbed } = require('discord.js');

module.exports = {
        name: 'testleave',
        description: 'Emits `guildMemberAdd`',
        usage: '[brief description]',
        aliases: ['byelol'],
        example: '>leaveTest',
        args: false,
        permission: "MANAGE_ROLES",
        async execute(client, message, args) {
           client.emit('guildMemberRemove', message.member);
        }
};
