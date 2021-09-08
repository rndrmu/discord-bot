const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
/**
 *
 *  @name DiscordTickets
 *  @author eartharoid <contact@eartharoid.me>
 *  @license GNU-GPLv3
 *
 */

 
module.exports = {
	event: 'threadCreate',
	execute(client, [thread], {config, Ticket, Setting, Timezones}) {
		// set up the logger channel 
		const logChannel = client.channels.cache.get('747933577416802334');
		console.log(
			'digga was soll die scheiße?'
		);
		console.log(thread);
        // get the thread creator
		const threadDaddy = client.users.cache.get(thread.ownerId);
		// construct the thread link
		const threadLink = `https://discord.com/channels/${thread.guildId}/${thread.id}`;

		const threadRow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setLabel('View Thread')
					.setURL(threadLink)
			);

		logChannel.send({
			embeds: [
				new MessageEmbed()
					.setColor('GREEN')
					.setTitle('NEW THREAD CREATED')
					.setAuthor(threadDaddy.tag, threadDaddy.avatarURL())
					.setDescription(`Created in <#${thread.parentId}>. Thread name -> **${thread.name}**`)
					.addField('Is private?', thread.type === 'GUILD_PRIVATE_THREAD' ? 'Yes' : 'No', true)
			],
			components: [
				threadRow
			]
		});
	}
};
 