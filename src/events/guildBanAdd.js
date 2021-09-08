
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
	event: 'guildBanAdd', 
	async execute(client, [ban]) { 
		console.log(ban);

		switch(ban.guild.name) {
		case 'Aniplay': testCase(client, ban); break;
		case 'ASDirect': newUser(client, ban); break;
		case 'ASDirect Staff': break;
		}

       
	}
};



let byeEmbed = (who) => {
	return new MessageEmbed()
	.setTitle('User Banned')
	.setThumbnail(who.user.avatarURL({dynamic: true}))
	.addField('Tag', who.user.bot ? `${who.user.tag} <:bottag:795358492290449439>` : `${who.user.tag}`, {inline: true})
	.addField('Status', who.user.presence.status, {inline: true})
	.addField('Is Bot?', who.user.bot ? 'Yes' : 'No', {inline: true})
	.addField("Mention", `<@${who.user.id}>`, {inline: true})
	.add
	.addField('Joined Discord', new Date(who.user.createdAt).toLocaleDateString('DE') )
	.addField('Joined Server', new Date(who.joinedTimestamp).toLocaleString("DE") + " ")
	.setFooter('User ID: ' + who.user.id)
	.setColor('#ff0000')
	.setTimestamp(new Date());
}

function newUser(client, member) {
	const byeChannel = client.channels.cache.find(channel => channel.id === '723510552592384041');
	console.log('[MEMBER BANNED]' + member.user.tag);
	byeChannel.send(
		{embeds: [byeEmbed(member)]}
	);
}

function testCase(client, member) {
	const byeChannel = client.channels.cache.find(channel => channel.id === '744477947393605672');
	console.log(member.user);
	byeChannel.send(
		{embeds: [byeEmbed(member)]}
	);
}
