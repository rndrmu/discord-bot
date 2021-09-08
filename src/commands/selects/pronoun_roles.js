
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'pronoun_roles',

	async execute(client, interaction) {
		// get the roles they selected from the "interaction.values" array
	// and for each role, add it to the member

		// if the "interaction.values" array is empty, remove all pronoun roles
		if (interaction.values.length === 0) {
			interaction.guild.members.cache.get(interaction.member.id).roles.cache.forEach(r => {
				// if one of the roles is a pronoun role, remove it
				const pronoun_roles = ['He/Him', 'She/Her', 'They/Them', 'Ask for Pronouns', 'Any Pronouns'];
				if (pronoun_roles.includes(r.name)) {
					interaction.member.roles.remove(r);
				}
			});
			interaction.reply({
				content: ':white_check_mark: Removed',
				ephemeral: true,
			});
		}

		let rolestr = String();

		// check if the user has any of the roles that they have not selected
		// if they do, remove them

		// if they do not have any of the roles that they have not selected, remove them
		interaction.guild.members.cache.get(interaction.member.id).roles.cache.forEach(r => {
		// if one of the roles is a pronoun role, remove it
			const pronoun_roles = ['He/Him', 'She/Her', 'They/Them', 'Ask for Pronouns', 'Any Pronouns'];
			if (pronoun_roles.includes(r.name)) {
				interaction.member.roles.remove(r);
			}
		});


		interaction.values.forEach(role => {
			console.log(role);
			rolestr += `${role.replace(/_/gmi, ' ')}, `;
			// give the user the role
			interaction.member.roles.add(interaction.guild.roles.cache.find(r => r.name === role));
		// if the user has any of the roles, remove them from the user
		});
		console.log(rolestr);
		interaction.reply({
			content: 'Added roles' + rolestr,
			ephemeral: true,
		});
	}
};