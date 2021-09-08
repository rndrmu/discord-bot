const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'serverinfo',
	description: 'Displays info of the current guild',
	usage: '[brief description]',
	aliases: ['server', 'guild', 'server_info'],
	example: '>serverinfo',
	args: false,
	async execute(client, message, args) {
		let question = args.join(' ');
		let pollembed = new MessageEmbed()
			.setTitle('Poll')
			.setDescription(question);
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setTitle('Info for ' + message.guild.name)
                    .addField("Members", `${message.guild.memberCount}`)
					.addField("Created", `${message.guild.createdAt}`)
                    .addField('Verification Level', `${message.guild.verificationLevel}`)
                    .addField('Owner', `<@${message.guild.ownerID}>`)
					.setThumbnail(`${message.guild.iconURL()}`, {dynamic: true})

            ]
        })
	}
};
