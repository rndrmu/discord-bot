const fetch = require('node-fetch');

module.exports = {
    name: 'copy_message',
	description: 'Copy message from one channel/server into another',
	usage: 'copy_message <message-link> <destination-channel-id>',
	aliases: ['cpm', 'cp_m'],
	args: true,
	DMenabled: true,
	permission: 'MANAGE_MESSAGES',

	async execute (client, message, args) {
        // get guild id, channel id, and message id from the message link
        // also check if its a canary, ptb or stable link
        let link = args[0];
        let dest_channel_id = args[1];
        let guild_id = link.split('/')[4];
        let channel_id = link.split('/')[5];
        let message_id = link.split('/')[6];

        // get the message via raw api call, cuz fuck frameworks
        let message_json = await fetch(`https://discord.com/api/v9/channels/${channel_id}/messages/${message_id}`, {
            headers: {
                'Authorization': `Bot ${process.env.TOKEN}`
            }
        }).then(res => res.json());

        console.log(message_json);

        console.log(`Copying message from ${channel_id}/${message_id} to ${dest_channel_id}`);

        // set the message content to "⠀" so the api doesn't bitch around
        message_json.content = "⠀";

        // send the message to the destination channel 
        client.channels.cache.get(dest_channel_id).send(message_json)




    }
}