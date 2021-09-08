const { MessageEmbed } = require('discord.js');
const moment = require('moment-timezone');


module.exports = {
	name: 'time',
	description: 'Shows current Time in specified Timezone',
	usage: '[brief description]',
	aliases: ['tz', 'ct'],
	example: '>time CEST',
	args: false,
	slash: true,
	async execute(client, interaction) {
		console.log(interaction);
		const timezone = interaction.options.get('timezone').value;
		const tzName = interaction.options.get('timezone').name;

		console.log(timezone);

		interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor('BLURPLE')
					.setTitle('Current Time in ' + timezone)
					.setDescription(moment().tz(timezone).format('dddd, MMMM Do YYYY, h:mm:ss a'))
					.setTimestamp(new Date().getTime())
			]
		});

		
	}
};
