/**
 *
 *  @name DiscordTickets
 *  @author eartharoid <contact@eartharoid.me>
 *  @license GNU-GPLv3
 *
 * DiscordTickets  Copyright (C) 2020  Isaac "eartharoid" Saunders
 * This program comes with ABSOLUTELY NO WARRANTY.
 * This is free software, and you are welcome to redistribute it
 * under certain conditions. See the included LICENSE file for details.
 *
 */

//let version = ((process.version.split('.')[0].replace('v', '') as unknown) as Number);
//if (!version === 14 || !version > 14) return console.log('Please upgrade to Node v14 or higher');

const fs = require('fs');
const {
	join
} = require('path');

let dev = fs.existsSync(join(__dirname, '../user/dev.env')) && fs.existsSync(join(__dirname, '../user/dev.config.js'));

require('dotenv').config({
	path: join(__dirname, '../user/', dev ? 'dev.env' : '.env')
});

module.exports.config = dev ? 'dev.config.js' : 'config.js';
const config = require(join(__dirname, '../user/', module.exports.config));

const {
	Client,
	Intents,
	Collection,
} = require('discord.js');
const discordLogger = require('./modules/logger');


const fetch = require('node-fetch');
const client = new Client({
	autoReconnect: true,
	partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
	intents: [
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		Intents.FLAGS.GUILD_INTEGRATIONS,
		Intents.FLAGS.GUILD_PRESENCES,
		Intents.FLAGS.GUILD_WEBHOOKS,
		Intents.FLAGS.GUILD_MESSAGE_TYPING,
		Intents.FLAGS.GUILD_BANS,
	],
	allowedMentions: {
		parse: ['users', 'roles', 'everyone']
	}
});


client.events = new Collection();
client.commands = new Collection();
client.cooldowns = new Collection();
client.slashcommands = new Collection();
client.buttons = new Collection();
client.selects = new Collection();
const utils = require('./modules/utils');
const leeks = require('leeks.js');

require('./modules/banner')(leeks); // big coloured text thing

const Logger = require('leekslazylogger');
const log = new Logger({
	name: config.name,
	logToFile: config.logs.files.enabled,
	maxAge: config.logs.files.keep_for,
	debug: config.debug
});

require('./modules/updater')(); // check for updates

/**
 * storage
 */
const {
	Sequelize,
	Model,
	DataTypes
} = require('sequelize');

let sequelize;

switch (config.storage.type) {
case 'mysql':
	log.info('Connecting to MySQL database...');
	sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
		dialect: 'mysql',
		host: process.env.DB_HOST,
		logging: log.debug
	});
	break;
case 'mariadb':
	log.info('Connecting to MariaDB database...');
	sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
		dialect: 'mariadb',
		host: process.env.DB_HOST,
		logging: log.debug
	});
	break;
case 'postgre':
	log.info('Connecting to PostgreSQL database...');
	sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
		dialect: 'postgres',
		host: process.env.DB_HOST,
		logging: log.debug
	});
	break;
case 'microsoft':
	log.info('Connecting to Microsoft SQL Server database...');
	sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
		dialect: 'mssql',
		host: process.env.DB_HOST,
		logging: log.debug
	});
	break;
default:
	log.info('Using SQLite storage');
	sequelize = new Sequelize({
		dialect: 'sqlite',
		storage: join(__dirname, '../user/storage.db'),
		logging: log.debug
	});
}

class Ticket extends Model {}
Ticket.init({
	channel: DataTypes.STRING,
	creator: DataTypes.STRING,
	open: DataTypes.BOOLEAN,
	topic: DataTypes.TEXT
}, {
	sequelize,
	modelName: 'ticket'
});

class Setting extends Model {}
Setting.init({
	key: DataTypes.STRING,
	value: DataTypes.STRING,
}, {
	sequelize,
	modelName: 'setting'
});

class Timezones extends Model {}

Timezones.init({
	user: DataTypes.STRING,
	timezone: DataTypes.STRING,
}, {
	sequelize,
	modelName: 'timezone'
});

class Announcement extends Model {}

Announcement.init({
	date: DataTypes.STRING,
	alreadyPosted: DataTypes.BOOLEAN,
}, {
	sequelize,
	modelName: 'announcement'
});

Ticket.sync();
Setting.sync();
Timezones.sync();
Announcement.sync();


	

/**
 * event loader
 */
const events = fs.readdirSync(join(__dirname, 'events')).filter(file => file.endsWith('.js'));
for (const file of events) {
	const event = require(`./events/${file}`);
	client.events.set(event.event, event);

	// client.on(event.event, e => client.events.get(event.event).execute(client, e, Ticket, Setting));
	client.on(event.event, (e1, e2) => client.events.get(event.event).execute(client, [e1, e2], {
		config,
		Ticket,
		Setting,
		Timezones,
		Announcement,
	}));
	log.console(log.format(`> Loaded &7${event.event}&f event`));
}



/**
 * command loader
 */

// load commands from subdirectories
fs.readdirSync(join(__dirname, 'commands')).forEach(dir => {
	if (dir.startsWith('.')) return;
	fs.readdirSync(join(__dirname, 'commands', dir)).forEach(file => {
		// if the dir is called "slash", add to the slash commands
		if (dir === 'slash') {
			const command = require(`./commands/${dir}/${file}`);
			client.slashcommands.set(command.name, command);
			return;
		} 
		//if the directory is called "regular" add to the normal commands
		else if (dir === 'regular') {
			const command = require(`./commands/${dir}/${file}`);
			client.commands.set(command.name, command);
			//discordLogger.log(`> Loaded ${dir}/${command.name} command`);
			log.console(log.format(`> Loaded &7${dir}/${command.name}&f command`));
			return;
		}
		// else if the directory is called "buttons", add to the buttons commands
		else if (dir === 'buttons') {
			const command = require(`./commands/${dir}/${file}`);
			client.buttons.set(command.name, command);
			//discordLogger.log(`> Loaded ${dir}/${command.name} command`);
			log.console(log.format(`> Loaded &7${dir}/${command.name}&f command`));
			return;
		}
		else if (dir === 'selects') {
			const command = require(`./commands/${dir}/${file}`);
			client.selects.set(command.name, command);
			//discordLogger.log(`> Loaded ${dir}/${command.name} command`);
			log.console(log.format(`> Loaded &7${dir}/${command.name}&f command`));
			return;
		}
	});
});

discordLogger.log(`Loaded ${events.length} events ${client.slashcommands.size} Application Commands, ${client.buttons.size} Buttons and ${client.commands.size} Regular Commands!`);
log.info(`Loaded ${events.length} events and n commands`);

/**
 * AutoMessager
 * 
 **/
const lorem = `<@&752903647360188637> Good morning! I hope everyone is having a good day <:ella:766459506757599263>
It’s time to be grateful

Write 5 to 10 things you are grateful for in <#752910440455208981> ! 

What is this?

Every Tuesday we remind people with the <@&752903647360188637> role to Gratitude Journal. That is, sitting down for a few minutes and writing down five to ten things you are grateful for.

To learn more about the benefits of Gratitude Journaling, watch this video > https://www.youtube.com/watch?v=WPPPFqsECz0

To get the @Gratitude role, go to ROLE ASSIGNMENT on <#877179904440033280>.
`;

const yesPingMe = async () => {
	// check if today is tuesday and it is 12:00
	if (new Date().getDay() === 2 && new Date().getHours() >= 15) {

		// check the announcement database if we already posted the message

		const yes = await Announcement.findOne({
			where: {
				date: new Date().toLocaleDateString(),
				alreadyPosted: 1,
			}
		});

		// if the announcement is not found, create it
		//console.log(yes);
		if (!yes) {

			const aChn = client.channels.cache.get('825935485356212235');
			aChn.send({ content: lorem });

			Announcement.create({
				date: new Date().toLocaleDateString(),
				alreadyPosted: true,
			});
			Announcement.update({
				alreadyPosted: true,
			}, {
				where: {
					date: new Date().toLocaleDateString(),
				},
			});	
		} else {
			//console.log('Already posted!');
		}
	} else {
		//console.log('Not today!');
	}
};


client.on('ready', () => {
	console.log('Starting AutoMessenger!');
	yesPingMe();
	setInterval(yesPingMe, 10000);
});




const one_day = 1000 * 60 * 60 * 24;
const txt = '../user/transcripts/text';
const clean = () => {
	const files = fs.readdirSync(join(__dirname, txt)).filter(file => file.endsWith('.txt'));
	let total = 0;
	for (const file of files) {
		let diff = (new Date().getDate() - new Date(fs.statSync(join(__dirname, txt, file))).getDate());
		if (Math.floor(diff / one_day) > config.transcripts.text.keep_for) {
			fs.unlinkSync(join(__dirname, txt, file));
			total++;
		}
	}
	if (total > 0) log.info(`Deleted ${total} old text ${utils.plural('transcript', total)}`);
};

if (config.transcripts.text.enabled) {
	clean();
	setInterval(clean, one_day);
}

process.on('unhandledRejection', error => {
	log.warn('An error was not caught');
	log.warn(`Uncaught ${error}`);
	log.error(error);
	fetch(process.env.WEBHOOK_LOG_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'embeds': [
				{
					'title': 'Uncaught Exception',
					'description': '```' + error + '```',
					'url': 'https://discordapp.com',
					'color': 16711680,
					'timestamp': new Date(),
				}
			]
		})
	});
});




client.login(process.env.TOKEN).then(() => {
	log.info('Logged in as ' + client.user.tag);
});
