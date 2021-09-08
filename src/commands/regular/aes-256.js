/* eslint-disable no-undef */
const { MessageEmbed } = require('discord.js');
const aes256 = require('aes256');


module.exports = {
	name: 'aes256',
	description: 'Encodes/Decodes a String with AES-256',
	usage: '[brief description]',
	aliases: [],
	example: '>aes256 encrypt TrollKey Troll',
	args: true,
	async execute(client, message, args) {
		let subcommand = args.shift(); /*first arg is encode/decode*/
		let encryptionkey = args.shift();
		let string = args.join(' ');


		switch(subcommand) {
		case 'encrypt':
		case 'enc':
			message.channel.send({
				embeds: [
					new MessageEmbed()
						.setTitle('Encoded String')
						.setDescription(aes256.encrypt(encryptionkey, string))
						.addField('Used Key', encryptionkey, true)
						.addField('Source String', string, true)
				]
			});
			break;
		case 'decrypt':
		case 'dec':
			message.channel.send({
				embeds: [
					new MessageEmbed()
						.setTitle(' Decoded String')
						.setDescription(aes256.decrypt(encryptionkey, string))
						.addField('Used Key', encryptionkey, true)
						.addField('Source String', string, true)
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
