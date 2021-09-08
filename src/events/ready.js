/**
 *
 *  @name DiscordTickets
 *  @author eartharoid <contact@eartharoid.me>
 *  @license GNU-GPLv3
 *
 */

const Logger = require('leekslazylogger');
const log = new Logger();
const config = require('../../user/' + require('../').config);
const discordLogger = require('../modules/logger');
// write lorem ipsum text to the console


module.exports = {
	event: 'ready',
	execute(client) {
		log.success(`Authenticated as ${client.user.tag}`);
		discordLogger.log(`Authenticated as ${client.user.tag}`);

		// get all guilds the bot is in
		const guildCount = client.guilds.cache.size;
		// get all users the bot has in its cache
		const userCount = client.users.cache.size;
		const updatePresence = () => {
			client.user.setPresence({
				activities: [{
					name: `${guildCount} guilds with ${userCount} users`,
					type: 'WATCHING'
				}]
			});
			log.debug('Updated presence');
		};

		updatePresence();
		setInterval(() => {
			updatePresence();
		}, 60000);
	}
};
