const { MessageEmbed } = require('discord.js');
const { default: Logger } = require('leekslazylogger');


module.exports = {
    name: "report",
    aliases: ["r", "s", "strike", "warn"],
    description: 'Beta Feature, make a nice report card :D',
    usage: '[userid reason]',
    example: '>report 242385294123335690 cool dude',
    args: false,
    DMenabled: true,
    staffOnly: true,
    permission: 'MANAGE_ROLES',

    async execute(client, message, args) {
        const user = args.shift();
        const reason = args.join(' ');
        const offender = client.users.cache.get(user);

    try {

        client.channels.cache.get("760070565926797313").send (
            {
                embeds: [
                    new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
            .setTitle("Added Report")
            .addField("User Tag (as of " + new Date().toISOString().replace(/T|Z/gm, " ") + ")", offender.tag, true)
            .addField("User ID", offender.id, true)
            .addField("Reason", reason)
            .addField("Mention", `<@${offender.id}>`)
            .setTimestamp(new Date())
                ]
            }
    
        )
    } catch {
        console.error("oopsies :( ");
    }
    }
}
