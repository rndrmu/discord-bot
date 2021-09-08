/**
 *
 *  @name DiscordTickets
 *  @author eartharoid <contact@eartharoid.me>
 *  @license GNU-GPLv3
 *
 */

const Logger = require('leekslazylogger');
const log = new Logger();
const fs = require('fs');
const { join } = require('path');
const { MessageEmbed } = require('discord.js');
const discordLogger = require('../modules/logger');

module.exports = {
	event: 'messageDelete',
	async execute(client, [message], {config, Ticket}) {
		//log.info(message);
		if (message.author.tag == "Groovy#7254" || message.author.tag == "ASDirect Bot#4185" || message.author.tag == "ASDirect Bot [DEV]#1471") return;
		log.info(`Message Deleted: ${message.channel.name}: ${message.author.tag} said ${message.content}`);
		discordLogger.log(`Message Deleted: ${message.channel.name}: ${message.author.tag} said ${message.content}`)
		const messageHadImage = message.attachments.first();

		const delEmbed = new MessageEmbed()
			.setTitle('[MESSAGE DELETED] Channel: #' + message.channel.name)
			.setColor('RED')
			.setAuthor(message.author.tag.toString())
			.setDescription(message.content);

		if (messageHadImage) {
			delEmbed.setImage(messageHadImage.proxyURL);
		}

		client.channels.cache.get('818180336532979712').send(
			{
				embeds: [
					delEmbed
				]
			}
		);

		if (!config.transcripts.web.enabled) return;

		if (message.partial) {
			try {
				await message.fetch();
			} catch (err) {
				log.warn('Failed to fetch deleted message');
				log.error(err.message);
				return;
			}
		}

		let ticket = await Ticket.findOne({ where: { channel: message.channel.id } });
		if (!ticket) return;


		let path = `../../user/transcripts/raw/${message.channel.id}.log`;
		let embeds = [];
		for (let embed in message.embeds) embeds.push(message.embeds[embed].toJSON());

		fs.appendFileSync(join(__dirname, path), JSON.stringify({
			id: message.id,
			author: message.author.id,
			content: message.content, // do not use cleanContent!
			time: message.createdTimestamp,
			embeds: embeds,
			attachments: [...message.attachments.values()],
			edited: message.edits.length > 1,
			deleted: true // delete the message
		}) + '\n');
	}
};
