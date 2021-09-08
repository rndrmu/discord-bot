module.exports = {
    name: 'emotionswheel',
	description: 'Replies with the emotionswheel',
	usage: '',
	aliases: ['emotions', 'emotionwheel'],
	args: false,
    DMenabled: true,

    async execute (client, message, args) {
        message.reply("https://cdn.discordapp.com/attachments/803240346364542977/851523296636960828/unknown.png")
    }
}