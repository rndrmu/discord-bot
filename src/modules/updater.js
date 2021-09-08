/**
 *
 *  @name DiscordTickets
 *  @author eartharoid <contact@eartharoid.me>
 *  @license GNU-GPLv3
 *
 */

 const Logger = require('leekslazylogger');
const log = new Logger();
const fetch = require('node-fetch');
let config = require('../../user/' + require('../').config);
let {version} = require('../../package.json');
version = 'v' + version;
const boxen = require('boxen');
const link = require('terminal-link');

module.exports = async () => {
	if (!config.updater) return;
	const json = await (await fetch('https://api.github.com/repos/eartharoid/DiscordTickets/releases')).json();
	const update = json[0];
	let notice = [];

	if (version !== update.tag_name) {
		console.log(`There is an update available for Discord Tickets (${version} -> ${update.tag_name})`);

	}
};