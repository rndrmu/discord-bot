const { MessageActionRow, SelectMenuInteraction, MessageSelectMenu, MessageEmbed, MessageButton } = require('discord.js');

module.exports = {
	name: 'rulesmenu',
	description: 'Creates a new instance of the reaction roles menu',
	usage: '',
	aliases: ['rar', 'aaaa'],
	args: false,
	DMenabled: false,
	permission: 'MANAGE_ROLES',

	async execute (client, message, args) {


		const activity_roles_row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('activity_roles')
					.setPlaceholder('Activity Roles')
					.setMinValues(0)
					.setMaxValues(7)
					.addOptions([
						{ label: 'Drawpile', value: 'Drawpile', emoji: '✏️', description: 'The Role for Drawpile' },
						{ label: 'Work Session', value: 'Work Session', emoji: '💻', description: 'The Role for Work Sessions' },
						{ label: 'Detective', value: 'Detective', emoji: '🕵️', description: 'The Role for Wolfia, Skribbl.io and Jackbox games' },
						{ label: 'Adventurer', value: 'Adventurer', emoji: '🏹', description: 'The Role that gives access to the DnD channels' },
						{ label: 'Discussion', value: 'Discussion', emoji: '📝', description: 'The Role for Weekly Wonderings' },
						{ label: 'Gratitude', value: 'Gratitude', emoji: '🌸', description: 'The Role for Gratitude Journaling.' },
						{ label: 'Meditation', value: 'Meditation', emoji: '🧘', description: 'The Role for Meditation Sessions.' },
						{ label: 'Dead Chat Helpers', value: 'Dead Chat Helpers', emoji: '821996523989630986', description: 'To be pinged when the general chats need more activity' },
						{ label: 'Movie', value: 'Movie', emoji: '🎥', description: 'The Role for Movie Streams' },
						{ label: 'Trekkie', value: 'Trekkie', emoji: '🖖', description: 'The Role for Star Trek Streams' },

					])
			);


		const birthday_roles_row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('birthday_roles')
					.setPlaceholder('Birthday Roles')
					.setMinValues(0)
					.setMaxValues(1)
					.addOptions([
						{
							label: 'January',
							value: 'January Birthday'
						},
						{
							label: 'February',
							value: 'February Birthday'
						},
						{
							label: 'March',
							value: 'March Birthday'
						},
						{
							label: 'April',
							value: 'April Birhtday'
						},
						{
							label: 'May',
							value: 'May Birthday'
						},
						{
							label: 'June',
							value: 'June Birthday'
						},
						{
							label: 'July',
							value: 'July Birthday'
						},
						{
							label: 'August',
							value: 'August Birthday'
						},
						{
							label: 'September',
							value: 'September Birthday'
						},
						{
							label: 'October',
							value: 'October Birthday'
						},
						{
							label: 'November',
							value: 'November Birthday'
						},
						{
							label: 'December',
							value: 'December Birthday'
						}
					])
			);

		
		const pronoun_roles_row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('pronoun_roles')
					.setPlaceholder('Select your Pronouns!')
					.setMinValues(0)
					.setMaxValues(5)
					.addOptions([
						{
							label: 'He/Him',
							value: 'He/Him',
							emoji: '825802276256874518'
						},
						{
							label: 'She/Her',
							value: 'She/Her',
							emoji: '825802252618825809'
						},
						{
							label: 'They/Them',
							value: 'They/Them',
							emoji: '825802294503276634'
						},
						{
							label: 'Ask me!',
							value: 'Ask for Pronouns',
							emoji: '825802316699271214'
						},
						{
							label: 'Any!',
							value: 'Any Pronouns',
							emoji: '882707279269462107'
						}
					]),
				
			);
		const pronoun_roles_buttonRow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setEmoji('566918981911576576')
					.setStyle('DANGER')
					.setLabel('Remove All Roles')
					.setCustomId('remove_all_pronoun_roles')
			);

		message.channel.send({
			embeds: [
				new MessageEmbed()
					.setTitle('Birthday Roles')
					.setColor('BLURPLE')
					.setDescription('Birthday roles — to be pinged for happy birthday wishes in the month you were born. \n\nTo reset your roles either deselect all roles or click the \'Remove All\' button.')
			],
			components: [
				birthday_roles_row,
			]
		});

		message.channel.send({
			embeds: [
				new MessageEmbed()
					.setTitle('Activity Roles')
					.setColor('BLURPLE')
					.setDescription('If you want to be pinged every time we run a certain activity, please assign yourself the roles below using the reaction emotes. \n\nTo reset your roles either deselect all roles or click the \'Remove All\' button.')
			],
			components: [
				activity_roles_row,
			]
		});

		message.channel.send({
			embeds: [
				new MessageEmbed()
					.setTitle('Pronoun Roles')
					.setColor('BLURPLE')
					.setDescription('Select your pronoun roles here. \n\nTo reset your roles either deselect all roles or click the \'Remove All\' button.')
			],
			components: [
				pronoun_roles_row,
				pronoun_roles_buttonRow
			]
		});
	}
};