const { MessageEmbed } = require('discord.js');
const moment = require('moment-timezone');


module.exports = {
	name: 'time',
	description: 'Shows current Time in specified Timezone',
	usage: '[brief description]',
	aliases: ['tz', 'ct'],
	example: '>time CEST',
	args: false,
	async execute(client, message, args, {config, Ticket, Timezones}) {
		//const timezone = args.join();

		// if the argument is a 16-17 digit userid, find the user in the db and return their timezone
		if (args.join(' ').match(/^\d{16,}$/)) {
			const user = args.join(' ');
			const userData = await Timezones.findOne({where: {user: user}});
			if (userData) {
				const userTZ = userData.timezone;
				message.reply({
					embed: new MessageEmbed()
						.setColor('GREEN')
						.setDescription(userTZ)
				});
			}
		}

		if (args.join().length > 2) {
			/* assume user wants to know specific time */

			const fuckyou = new RegExp(/\w+\/\w+/, 'gmi');
			console.log(args);
			console.log(args.join(''));

			if (!fuckyou.test(args.join(''))) return message.reply({
				embeds: [
					new MessageEmbed()
						.setTitle('Wrong Format!')
						.setDescription('Please use the "Country/City" Format e.g. `Europe/Berlin` or `America/New_York` or `US/Eastern`')
						.setColor('RED')
				]
			});

			message.reply({
				embeds: [
					new MessageEmbed()
						.setDescription(
							moment().tz(args.join()).format('YYYY-MM-DD HH:mm:ss')
						)
				]
			});
			return;
		}

		

		let tz = await Timezones.findOne({
			where: {
				user: message.author.id
			}
		});
		if (!tz) {
			return message.reply({
				embeds: [
					new MessageEmbed()
						.setDescription(':x: No Timezone set! \n Set one with `>timezone`')
				]
			});
		}

		const timezone = tz.timezone;

		try {
			message.reply({
				embeds: [
					new MessageEmbed()
						.setDescription(
							moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss')
						)
						.setFooter('If time is not correct for you then it is CEST :^)')
				]
			});
		} catch (error) {
			message.reply({
				embeds: [
					new MessageEmbed()
						.setDescription(
							':x: No timezone data available!'
						)
						.setFooter('If time is not correct for you then it is CEST :^)')
				]
			});
		}
	}
};
