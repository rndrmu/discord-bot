
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'giveaway_btn',

	async execute(client, interaction) {
		// give the user the "giveaway entree role"
		// if the user has the "giveaway entree role" already, remove it
		if (interaction.member.roles.cache.find(r => r.name === 'DLC Giveaway')) {
			interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'DLC Giveaway'));
			interaction.reply({
				content: ':x: Removed Role',
				ephemeral: true,
			});
		} else {
			interaction.member.roles.add(interaction.guild.roles.cache.find(r => r.name === 'DLC Giveaway'));
			interaction.reply({
				content: ':white_check_mark: Gave you the role',
				ephemeral: true,
			});
		}
	}
};