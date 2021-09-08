const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'edit_embed',
	description: 'Return a bot message in a code field to easily edit',
	usage: 'copy_message <message-link>',
	aliases: ['edt', 'ed_m'],
	args: true,
	DMenabled: true,
	permission: 'MANAGE_MESSAGES',

	async execute (client, message, args) {
		// get guild id, channel id, and message id from the message link
		// also check if its a canary, ptb or stable link
		let link = args[0];
		let guild_id = link.split('/')[4];
		let channel_id = link.split('/')[5];
		let message_id = link.split('/')[6];

		// download the message attachment


		// get the message via raw api call, cuz fuck frameworks
		let message_json = await fetch(`https://discord.com/api/v9/channels/${channel_id}/messages/${message_id}`, {
			headers: {
				'Authorization': `Bot ${process.env.TOKEN}`
			}
		}).then(res => res.json());

		console.log(message_json);

		console.log(`Editing message from ${channel_id}/${message_id}`);

		// reply with the message
		message.reply(
			{
				embeds: [
					new MessageEmbed()
						.setTitle('Embed')
						.setDescription(`\`\`\`json\n${JSON.stringify(message_json, null, 4)}\n\`\`\``)
				]
			}
		);




	}
};