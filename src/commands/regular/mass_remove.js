const { MessageActionRow, SelectMenuInteraction, MessageSelectMenu, MessageEmbed, MessageButton } = require('discord.js');

module.exports = {
	name: 'mass_remove',
	description: 'Mass removes specified role from all users',
	usage: '>mass_remove <role-id>',
	aliases: ['mr', 'rr'],
	args: true,
	DMenabled: false,
	permission: 'MANAGE_ROLES',

	async execute (client, message, args) {
		// get the role id which is the first argument
        const roleId = args[0];
        // check if the role id is valid 18 digit number
        if (!roleId.match(/^[0-9]{18}$/)) {
            return message.reply({ content: "Invalid role Id" });
        }
        // get the role object
        const role = message.guild.roles.cache.get(roleId);

       // get all users with the role
        const users = message.guild.members.cache.filter(member => member.roles.cache.has(roleId));

        // remove the role from all users
        users.forEach(user => user.roles.remove(role));
        // send a message to the user
        return message.reply({
            embeds: [
                new MessageEmbed()
                    .setColor("BLURPLE")
                    .setTitle("Mass remove role")
                    .setDescription(`Removed role **${role.name}** from **${users.size}** users`)
                    .setFooter(`Role Id: ${roleId}`)
            ]
        });
        

        
	}
};