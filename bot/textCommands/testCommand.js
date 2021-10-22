const Discord = require("discord.js")

module.exports = {
    data: {
        name: "test",
        description: "test command"
    },
    async execute(message, args){
        message.reply(args.join(" "));   
    }
};