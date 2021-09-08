/**
 *
 *  @name ASDirect-Bot-Announcement-module
 *  @author rndrmu
 *  @license GNU-GPLv3
 *
 */

 const Logger = require('leekslazylogger');
 const log = new Logger();
 const { MessageEmbed } = require('discord.js');
 module.exports = {
    name: 'announce',
	description: 'Write an announcement via bot',
	usage: '',
	aliases: ['announcement', 'embed'],
	args: true,
    DMenabled: true,
	permission: 'MENTION_EVERYONE', //@everyone perm => only admins

    async execute(client, message, args) {

        switch( args[0] ) {
            case 'edit': 
                args.shift();
                editMsg(client, message, args);
                break;
            case 'announcement':
                args.shift();
                announce(client, message, args);
                break;
            case 'embed':
                args.shift();
                embedMsg(client, message, args);
                break;
            default: break;
        }

        
    }
 }

 function editMsg(client, message, args) {
    const filter = m => m.author.tag === message.author.tag; // only let the caller send the announcement
     const msg = args[0];
    message.channel.messages.fetch(msg).then(msg =>  {
            //let embed = msg.embeds;
            message.channel.send( new MessageEmbed().setTitle("Type the announcement message now! (markdown supported)") ).then( () => {
                message.channel.awaitMessages(filter, { max: 1 }).then( (m) => {
                        // collection stuff, embed 
                        
                           let embed = new MessageEmbed()
                                .setAuthor( m.first().author.nickname ? m.first().author.nickname : m.first().author.tag, m.first().author.avatarURL({dynamic: true}) )
                                .setDescription( m.first().content )
                                .setFooter(m.first().guild.name, m.first().guild.iconURL({dynamic: true}))
                                .setTimestamp();
                            msg.edit(embed)
                            m.delete({reason: "no longer needed, merged into message", timeout: 5000})
                        
                })
            }).then(
                message.delete({reason: "no longer needed, merged into message"})
            )

    })


 }

 function announce(client, message, args) {
    const filter = m => m.author.tag === message.author.tag; // only let the caller send the announcement

    message.channel.send( new MessageEmbed().setTitle("Type the announcement message now! (markdown supported)") ).then( () => {
        message.channel.awaitMessages(filter, { max: 1 }).then( (m) => {
                // collection stuff, embed 
                console.log( m );
                m.first().guild.channels.cache.get("739818681726402611").send( 
                    new MessageEmbed()
                        .setAuthor( m.first().author.nickname ? m.first().author.nickname : m.first().author.tag, m.first().author.avatarURL({dynamic: true}) )
                        .setDescription( m.first().content )
                        .setFooter(m.first().guild.name, m.first().guild.iconURL({dynamic: true}))
                        .setTimestamp() 
                )
        })
    })
 }

 function embedMsg(client, message, args) {
    const filter = m => m.author.tag === message.author.tag; // only let the caller send the announcement
 }

