
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'raffle',
	slash: true, 

	async execute(client, interaction) {
		await interaction.defer();
		const role = interaction.options.get('role');
		const winnerCount = interaction.options.get('winners').value;

		const allEntries = interaction.guild.roles.cache.get(role.value).members.map(m => m.user.tag);

		const winners = new Array();

		for (let i = 1; i <= winnerCount; i++) {
			let win = allEntries[Math.floor(Math.random() * allEntries.length)];
			if (winners.indexOf(`${win}`) !== -1 ) {
				console.log('picked someone twice, rerolling');
				i--;
				continue;
			}
			winners.push(`${win}`);
			console.log(winners);

		} 
		interaction.editReply(
			{
				embeds: [
					new MessageEmbed()
						.setTitle(winnerCount > 1 ? 'The Lucky winners are' : 'The lucky winner is')
						.setDescription(
							winners.toString().replace(/,/gmi, ' \n ')
						)
				]
			}
		);
	}
};