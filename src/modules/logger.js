const fetch = require('node-fetch');
module.exports = {
    log: function (message) {
        fetch(process.env.WEBHOOK_LOG_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'embeds': [
                    {
                        'title': 'Log',
                        'description': message,
                        'url': 'https://discordapp.com',
                        'color': 16711680,
                        'timestamp': new Date(),
                    }
                ]
            })
        });
    }
};