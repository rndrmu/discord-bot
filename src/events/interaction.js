const { MessageEmbed, GuildMember, Interaction, GuildMemberManager } = require('discord.js');
const discordLogger = require('../modules/logger');

/**
 * Will be added when discord.js V13 releases :D
 */
module.exports = {
	event: 'interactionCreate', 
	async execute(client, [interaction], {config, Ticket, Setting, Timezones }) {
		console.log(interaction.commandName);
		if (interaction.isCommand()) {
			const command = client.slashcommands.get(interaction.commandName);
			try {
				command.execute(client, interaction, {config, Ticket, Setting, Timezones});
			} catch (error) {
				interaction.reply({
					content: `❌ An error occurred whilst executing the \`${interaction.commandName}\` command.`,
					ephemeral: true
				});
			}
		} else if ( interaction.isSelectMenu() ) {
			//select_menu(interaction);
			//console.log(interaction);
			const command = client.slashcommands.get(interaction.customId);
			try {
				command.execute(client, interaction, {config, Ticket, Setting, Timezones});
			} catch (error) {
				interaction.reply({
					content: `❌ An error occurred whilst executing the \`${interaction.customId}\` command.`,
					ephemeral: true
				});
			}	
		} else if ( interaction.isButton()) {
			discordLogger.log('button pressed');
			console.log('button pressed');
			console.log(interaction);

			const command = client.buttons.get(interaction.customId);
			try {
				command.execute(client, interaction, {config, Ticket, Setting, Timezones});
			} catch (error) {
				interaction.reply({
					content: `❌ An error occurred whilst executing the \`${interaction.customId}\` command.`,
					ephemeral: true
				});
			}	
		}



	}
};   

async function select_menu(interaction) {
	let added_roles; // the string containing the roles that the user has been added to
	switch(interaction.customId) {
	case 'pronoun_roles': 
		// set constants as aliases for the roles, so we don't have to keep typing them

		added_roles = await set_pronoun_roles(interaction);
		//added_roles = 'Pronoun roles';
		//interaction.member.roles.add(interaction.guild.roles.cache.find(r => r.name === "test"));
		break;
	case 'birthday_roles': 
		added_roles = await set_birthday_roles(interaction);
		break;
	case 'activity_roles': 
		added_roles = await set_activity_roles(interaction);
		break;
	}
	interaction.member.send({
		embeds: [
			new MessageEmbed()
				.setColor('BLURPLE')
				.setDescription(added_roles + ' -> updated roles!')
		]
	}).catch(err => console.log('no dm'));
	interaction.reply(
		{
			content: `${added_roles}`,
			ephemeral: true
		},
	);
}

async function set_pronoun_roles(interaction) {
	
}

async function set_birthday_roles(interaction) {


}

async function set_activity_roles(interaction) {

}
