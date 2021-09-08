const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'poll',
	description: 'Create a Poll',
	usage: '[brief description]',
	aliases: ['question', 'p'],
	example: '>poll ban everyone',
	args: true,
	async execute(client, message, args) {
		let question = args.join(' ');
		let pollembed = new MessageEmbed()
			.setTitle('Poll')
			.setDescription(question);
		let errEmbed = (why) => {
			return new MessageEmbed()
				.setTitle('Error creating Poll')
				.addField('Error', why);
		};

		message.channel.send({ embeds: [pollembed] }).then( m => {
			m.react('861237782172139550');
			m.react('861237782114861058');
		}).catch( error => {
			console.log(error);
			//message.channel.send({ embeds: [errEmbed(error)]});
		});
	}
};
