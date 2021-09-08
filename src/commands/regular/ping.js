const Logger = require('leekslazylogger');
const log = new Logger();
const { MessageEmbed, MessageActionRow } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Returns current WebSocket ping',
    args: false,

    async execute(client, message, args) {
	let pingEmbed = new MessageEmbed()
	    			.setTitle("Pong!")
	    			.setDescription(client.ws.ping + " ms")
        message.channel.send(
		{
			embeds: [pingEmbed] 
		}
        );
    }
}
