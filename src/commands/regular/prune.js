const {MessageEmbed} = require('discord.js');
const Logger = require('leekslazylogger');
const log = new Logger();
module.exports = {
    name: 'prune',
    aliases: ['prn', 'pp'],
    category: 'Moderation',
    usage: ['command', 'amount of messages to delete'],
    desc: 'Deletes n amount of messages in a Channel',
    permission: 'MANAGE_MESSAGES',
    DMenabled: false,

    execute(client, message, args) {
        const amount = parseInt(args[0]);
        if(!amount|| isNaN(amount)) return (message.reply('That doesnt seem like a valid number!'));
        if (amount <= 1 || args[0] > 99) return(message.reply('The number has to be between 1 and 99!'));
 
        try {
            message.channel.bulkDelete(amount, true)
                .then( message.reply( new MessageEmbed().setDescription(`✅ | Successfully deleted ${amount} messages!`).then( m => {
                    setTimeout(() => {
                        m.delete()
                    }, 5000)
                }) ) )
                .then ( log.info(`${message.author.tag} deleted ${amount + 1} messages in channel ${message.channel.name}`) )
        } catch {
            log.info(message.author.tag + ' Tried to use the prune command');
            new MessageEmbed().setDescription('An Error occured while deleting the messages!');
        }

    }
};
