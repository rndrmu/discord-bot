/* eslint-disable no-undef */
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'b64',
	description: 'Encodes/Decodes a String to Base64',
	usage: '[brief description]',
	aliases: [],
	example: '>b64 encode Troll',
	args: true,
	async execute(client, message, args) {
		let subcommand = args.shift(); /*first arg is encode/decode*/
		let string = args.toString();

		switch(subcommand) {
		case 'encode':
		case 'enc':
			message.channel.send({
				embeds: [
					new MessageEmbed()
						.setTitle('Base64 Encoded String')
						.setDescription(btoa(string))
				]
			});
			break;
		case 'decode':
		case 'dec':
			message.channel.send({
				embeds: [
					new MessageEmbed()
						.setTitle('Base64 Decoded String')
						.setDescription(atob(string))
				]
			});
			break;

		default: 
			message.channel.send({
				embeds: [
					new MessageEmbed()
						.setTitle(':x: Not a valid Subcommand!')
						.setDescription('Valid Commands')
						.addField('Encode', 'b64 enc or b64 encode', true)
						.addField('Decode', 'b64 dec or b64 decode', true)
						.setColor('RED')
				]
			});
			break;

		}
	}
};
