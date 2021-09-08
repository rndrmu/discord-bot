const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "deploy",
    description: "Deploy a slash command",

    async execute(client, message) {
        if (message.author.id !== "242385294123335690") return;

        if (!client.application?.owner) await client.application?.fetch();
            
		//create a slash command
        
        const data = {
            name: "time",
            description: "Returns the current time",
            options: [{
                name: "timezone",
                type: "STRING",
                description: "The timezone to use",
                required: true,
                choices: [
                    {
                        name: "Pacific Time",
                        value: "US/Pacific"
                    },
                    {
                        name: "Central Time",
                        value: "US/Central"
                    },
                    {
                        name: "Eastern Time",
                        value: "US/Eastern"
                    },
                    {
                        name: "Mountain Time",
                        value: "US/Mountain"
                    },
                    {
                        name: "Brazil",
                        value: "America/Sao_Paulo"
                    },
                    {
                        name: "UK",
                        value: "Europe/London"
                    },
                    {
                        name: "Central Europe",
                        value: "Europe/Berlin"
                    },
                    {
                        name: "Eastern Europe",
                        value: "Europe/Bucharest"
                    },
                    {
                        name: "Japan",
                        value: "Asia/Tokyo"
                    },
                    {
                        name: "Australia",
                        value: "Australia/Sydney"
                    },
                    {
                        name: "New Zealand",
                        value: "Pacific/Auckland"
                    }, 
                    {
                        name: "South Africa",
                        value: "Africa/Johannesburg"
                    }
                ]
            }]
        };

        const command = await client.application?.commands.create(data);


            message.channel.send(
                {
                    embeds: [
                        new MessageEmbed()
                    .setTitle("Slash Command registered successfully!")
                    ]
                }
            )
    }
}