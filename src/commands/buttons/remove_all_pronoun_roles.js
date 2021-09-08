
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'remove_all_pronoun_roles',

	async execute(client, interaction) {
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'He/Him'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'She/Her'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'They/Them'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'Ask for Pronouns'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'Any Pronouns'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'January Birthday'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'February Birthday'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'March Birthday'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'April Birthday'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'May Birthday'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'June Birthday'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'July Birthday'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'August Birthday'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'September Birthday'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'October Birthday'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'November Birthday'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'December Birthday'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'Drawpile'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'Work Session'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'Detective'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'Adventurer'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'Discussion'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'Gratitude'));
		interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name === 'Meditation'));
		interaction.reply({
			content: 'All self-assignable roles have been removed.',
			ephemeral: true,
		});
	}
};