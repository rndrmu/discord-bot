const { MessageEmbed, User } = require('discord.js');
const moment = require('moment');

module.exports = {
	event: 'guildMemberRemove', 
	async execute(client, [member]) { 
		console.log(member.guild.name);

		// check if the user was kicked
		const fetchedLogs = await member.guild.fetchAuditLogs({
			limit: 1,
			type: 'MEMBER_KICK',
		});

		// check if the member was banned
		const fetchedLogs2 = await member.guild.fetchAuditLogs({
			limit: 1,
			type: 'MEMBER_BAN',
		});

		// Since there's only 1 audit log entry in this collection, grab the first one
		const kickLog = fetchedLogs.entries.first();
		const banLog = fetchedLogs2.entries.first();

		// Perform a coherence check to make sure that there's *something*
		if (!kickLog) {
			switch(member.guild.name) {
			case 'Aniplay': testCase(client, member); break;
			case 'ASDirect': newUser(client, member); break;
			case 'ASDirect Staff': break;
			}
		}

		if (!banLog) {
			switch(member.guild.name) {
			case 'Aniplay': testCase(client, member); break;
			case 'ASDirect': newUser(client, member); break;
			case 'ASDirect Staff': break;
			}
		}

		// Now grab the user object of the person who kicked the member
		// Also grab the target of this action to double-check things
		const { executor, target } = kickLog;

		const { executor: executor2, target: target2 } = banLog;

		// Update the output with a bit more information
		// Also run a check to make sure that the log returned was for the same kicked member
		if (target.id === member.id) {
			console.log(`${member.user.tag} left the guild; kicked by ${executor.tag}?`);
			switch(member.guild.name) {
			case 'Aniplay': kickedTest(client, member, executor); break;
			case 'ASDirect': kickedUser(client, member, executor); break;
			case 'ASDirect Staff': break;
			}
			
		} else {
			console.log(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
			switch(member.guild.name) {
			case 'Aniplay': testCase(client, member, executor); break;
			case 'ASDirect': newUser(client, member, executor); break;
			case 'ASDirect Staff': break;
			}
		}


		

       
	}
};

let byeEmbed = (who) => {
	return new MessageEmbed()
		.setTitle('User Left')
		.setThumbnail(who.user.avatarURL({dynamic: true}))
		.addField('Tag', who.user.bot ? `${who.user.tag} <:bottag:795358492290449439>` : `${who.user.tag}`, {inline: true})
		.addField('Is Bot?', who.user.bot ? 'Yes' : 'No', {inline: true})
		.addField('Mention', `<@${who.user.id}>`, {inline: true})
		.addField('Joined Discord', new Date(who.user.createdAt).toLocaleDateString('DE') )
		.addField('Joined Server', new Date(who.joinedTimestamp).toLocaleString('DE') + ' ' )
		.setFooter('User ID: ' + who.user.id)
		.setColor('#00bc96')
		.setTimestamp(new Date());
};

let kickEmbed = (who, staffMember) => {
	return new MessageEmbed()
		.setTitle('User Kicked')
		.setThumbnail(who.user.avatarURL({dynamic: true}))
		.addField('Tag', who.user.bot ? `${who.user.tag} <:bottag:795358492290449439>` : `${who.user.tag}`, {inline: true})
		.addField('Is Bot?', who.user.bot ? 'Yes' : 'No', {inline: true})
		.addField('Mention', `<@${who.user.id}>`, {inline: true})
		.addField('Kicked By', staffMember.tag, {inline: true})
		.addField('Joined Discord', new Date(who.user.createdAt).toLocaleDateString('DE') )
		.addField('Joined Server', new Date(who.joinedTimestamp).toLocaleString('DE') + ' ' )
		.setFooter('User ID: ' + who.user.id)
		.setColor('#ff0000')
		.setTimestamp(new Date());
};

function newUser(client, member) {
	const byeChannel = client.channels.cache.find(channel => channel.id === '723510552592384041');
	console.log(member.user);
	byeChannel.send(
		{
			embeds: [byeEmbed(member)]
		}
	);
}

function testCase(client, member) {
	const byeChannel = client.channels.cache.find(channel => channel.id === '744477947393605672');
	console.log('[MEMBER LEFT]' + member.user.tag);
	byeChannel.send(
		{
			embeds: [byeEmbed(member)]
		}
	);
}

function kickedUser(client, member, executor) {
	const byeChannel = client.channels.cache.find(channel => channel.id === '723510552592384041');
	console.log(member.user);
	byeChannel.send(
		{
			embeds: [kickEmbed(member, executor)]
		}
	);
}

function kickedTest(client, member, executor) {
	const byeChannel = client.channels.cache.find(channel => channel.id === '744477947393605672');
	console.log('[MEMBER LEFT]' + member.user.tag);
	byeChannel.send(
		{
			embeds: [kickEmbed(member, executor)]
		}
	);
}
