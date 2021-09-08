
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
	event: 'guildMemberAdd', 
	async execute(client, [member]) { 
		console.log(member.guild.name);

		switch(member.guild.name) {
		case 'Aniplay': testCase(client, member); break;
		case 'ASDirect': newUser(client, member); break;
		case 'ASDirect Staff': break;
		}

       
	}
};

let byeEmbed = (who) => {
	return new MessageEmbed()
	.setTitle('New User joined')
	.setThumbnail(who.user.avatarURL({dynamic: true}))
	.addField('Tag', who.user.bot ? `${who.user.tag} <:bottag:795358492290449439>` : `${who.user.tag}`, {inline: true})
	.addField('Is Bot?', who.user.bot ? 'Yes' : 'No', {inline: true})
	.addField("Mention", `<@${who.user.id}>`, {inline: true})
	.addField('Joined Discord', new Date(who.user.createdAt).toLocaleDateString('DE') )
	.addField('Joined Server', new Date(who.joinedTimestamp).toLocaleString("DE") + " ")
	.setFooter('User ID: ' + who.user.id)
	.setColor('#00bc96')
	.setTimestamp(new Date());
}

function newUser(client, member) {
	const byeChannel = client.channels.cache.find(channel => channel.id === '734055478841311294');
	console.log('[MEMBER JOINED]' + member.user.tag);
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
