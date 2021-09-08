const { MessageEmbed } = require('discord.js');
const moment = require('moment-timezone');


module.exports = {
	name: 'timezone',
	description: 'Sets your local timezone',
	usage: '[brief description]',
	aliases: ['tz', 'ct'],
	example: '>timezone CEST',
	args: true,
	async execute(client, message, args, {config, Ticket, Timezones}) {



        // if the input string does not match "/^\w+/\w+$/gmi" return an error message
        if (!/^\w+\/\w+$/gmi.test(args.join(' '))) return message.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle("Wrong Format!")
                    .setDescription("Please use the \"Country/City\" Format e.g. `Europe/Berlin` or `America/New_York` or `US/Eastern`")
                    .setColor("RED")
            ]
        });

		let tz = await Timezones.findOne({
			where: {
				user: message.author.id
			}
		});

		let userTZ = args.join();

        if (tz) {
            tz.update({
                timezone: userTZ
            }, {
                where: {
                    user: message.author.id
                }
            });
        } else {
            let user = await Timezones.create({
                user: message.author.id,
                timezone: userTZ
            });

            message.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle("Added Successfully!")
                        .setDescription(user.toJSON() + " :^)")
                ]
            })
        }

		/* Ticket.update({
            channel: c.id
        }, {
            where: {
                id: ticket.id
            }
        }); */


		
        tz.save();
        message.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription(':white_check_mark: Set Timezone successfully!')
            ]
        });

		/* if (!tz) {
			message.reply({
				embeds: [
					new MessageEmbed()
						.setDescription('No Timezone set!')
				]
			});
		} */
	}
};
