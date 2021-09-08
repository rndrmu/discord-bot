const { MessageEmbed } = require('discord.js');
const moment = require('moment-timezone');


module.exports = {
	name: 'choice',
	description: 'Shows current Time in specified Timezone',
	usage: '[brief description]',
	aliases: [],
	example: '>choice rust, rust, rust, rust',
	args: false,
	async execute(client, message, args, {config, Ticket, Timezones}) {
        // join the args array and then split it by commas
        const choices = args.join(' ').split(',');

        // get a random choice from the array
        const choice = choices[Math.floor(Math.random() * choices.length)];

        // return the choice in as a message embed
        return message.reply({
            embeds: [
                new MessageEmbed()
                    .setColor("BLURPLE")
                    .setTitle(`Choice`)
                    .setDescription(choice)
            ]
        })
	}
};
