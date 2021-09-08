const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
/**
 *
 *  @name DiscordTickets
 *  @author eartharoid <contact@eartharoid.me>
 *  @license GNU-GPLv3
 *
 */

 
module.exports = {
	event: 'threadUpdate',
	execute(client, [oldThread, newThread], {config, Ticket, Setting, Timezones}) {
		// set up the logger channel 
        console.log({
            oldThread,
            newThread
        });

        // setup the loggerchannel
		const logChannel = client.channels.cache.get('747933577416802334');

        // setup the embed
        const embed = new MessageEmbed()
            .setColor('BLURPLE')
            .setTitle('Thread Updated')
            .setDescription(
                ` 
\`\`\`diff
- Old Thread Data
- Name: ${oldThread.name}
- Locked: ${oldThread.locked ? 'Yes' : 'No'}
- Archived: ${oldThread.archived ? 'Yes' : 'No'}

+ New Thread Data
+ Name: ${newThread.name}
+ Locked: ${newThread.locked ? 'Yes' : 'No'}
+ Archived: ${newThread.archived ? 'Yes' : 'No'}
\`\`\`
                `
            )

            // send the embed to the log channel
        logChannel.send(
            {
                embeds: [embed]
            }
        )
	}
};
 