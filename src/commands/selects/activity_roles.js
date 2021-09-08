
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'activity_roles',

	async execute(client, interaction) {
		// iterate through the "interaction.values" array
	// and for each role that is selected, add it to the member

		// if the "interaction.values" array is empty, remove all activity roles
		if (interaction.values.length === 0) {
			// if they do not have any of the roles that they have not selected, remove them
			interaction.guild.members.cache.get(interaction.member.id).roles.cache.forEach(r => {
			// if one of the roles is a pronoun role, remove it
				const activity_roles = ['Drawpile', 'Work Session', 'Detective', 'Adventurer', 'Discussion', 'Gratitude', 'Meditation', 'Dead Chat Helpers', 'Movie', 'Trekkie'];
				if (activity_roles.includes(r.name)) {
					interaction.member.roles.remove(r);
				}
			});
			interaction.reply({
				content: ':white_check_mark: Removed',
				ephemeral: true,
			});
		}

		// if they do not have any of the roles that they have not selected, remove them
		interaction.guild.members.cache.get(interaction.member.id).roles.cache.forEach(r => {
		// if one of the roles is a pronoun role, remove it
			const activity_roles = ['Drawpile', 'Work Session', 'Detective', 'Adventurer', 'Discussion', 'Gratitude', 'Meditation', 'Dead Chat Helpers', 'Movie', 'Trekkie'];
			if (activity_roles.includes(r.name)) {
				interaction.member.roles.remove(r);
			}
		});

		let rolestr = String();
		interaction.values.forEach(role => {
			console.log(role);
			rolestr += `${role.replace(/_/gmi, ' ')}, `;
			// give the member the role
			interaction.member.roles.add(interaction.guild.roles.cache.find(r => r.name === role));
		});
		console.log(rolestr);
		interaction.reply({
			content: 'Added roles' + rolestr,
			ephemeral: true,
		});
	}
};