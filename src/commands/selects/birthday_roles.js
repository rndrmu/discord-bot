
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'birthday_roles',

	async execute(client, interaction) {
		// get the first element of the "interaction.values" array (its only one anyway)
		const month = interaction.values[0];


		// if the "interaction.values" array is empty, remove all pronoun roles
		if (interaction.values.length === 0) {
			interaction.guild.members.cache.get(interaction.member.id).roles.cache.forEach(r => {
				// if one of the roles is a pronoun role, remove it
				const birthday_roles = ['January Birthday', 'February Birthday', 'March Birthday', 'April Birthday', 'May Birthday', 'June Birthday', 'July Birthday', 'August Birthday', 'September Birthday', 'October Birthday', 'November Birthday', 'December Birthday'];
				if (birthday_roles.includes(r.name)) {
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
			const birthday_roles = ['January Birthday', 'February Birthday', 'March Birthday', 'April Birthday', 'May Birthday', 'June Birthday', 'July Birthday', 'August Birthday', 'September Birthday', 'October Birthday', 'November Birthday', 'December Birthday'];
			if (birthday_roles.includes(r.name)) {
				interaction.member.roles.remove(r);
			}
		});
		// create a switch statement to check the roles
		let rolestr = month;
		// give the user the role
		interaction.member.roles.add(interaction.guild.roles.cache.find(r => r.name === month));

		interaction.reply({
			content: 'Added roles' + rolestr,
			ephemeral: true,
		});
	}
};