

module.exports = {
	name: 'deadchat',
	slash: true,
	async execute (client, interaction) {
		if (interaction.guild.name === 'Aniplay') {
			interaction.reply(':white_check_mark: Done', { ephemeral: true });
			client.channels.cache.get(interaction.channelId).send('<#' + interaction.channelId + '> needs reviving! <@&843419310465744926>');
		}
		if (interaction.channelId == '607645568839319572' || interaction.channelId == '696425186425307177') {
			await interaction.reply('<#' + interaction.channelId + '> needs reviving! <@&826887094638477352>');
			client.channels.cache.get(interaction.channelId).send('<#' + interaction.channelId + '> needs reviving! <@&826887094638477352>');

		} else {
			interaction.reply('This command can not be used in this channel!');
		}
	}
};