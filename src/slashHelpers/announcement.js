

/**
 * @name Slash Announcement Helper
 * 
 */
module.exports = {
    name: "Announcement Helper",
    authorizedUsers: [
        '242385294123335690'
    ],

    /**
     * 
     * @param {import("discord.js").Snowflake} id - The UserID of the caller
     * @param {Object} interaction - The Slash Command Object
     * @param {String} message - The message to send
     */
    run(id, interaction, message) {},

    /**
     * @name ValidatorInator 3001
     * @param {Snowflake} id - The UserID of the caller
     * @returns {Boolean} True if authorized
     */
    validate(id) {
        if (this.authorizedUsers.includes(id))
            return true;
        else 
            return false;
    }
}