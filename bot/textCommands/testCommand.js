const Discord = require("discord.js")

module.exports = {
    data: {
        name: "test",
        description: "test command"
    },
    async execute(message, args){
        let messagesFull = new Discord.Collection();
        await message.channel.messages.fetch({limit: 20})
            .then(messages => { messagesFull = messagesFull.concat(messages); });

        messagesFull
                        .sort((a, b) => b.createdTimestamp - a.createdTimestamp)
                        .each(message => console.log(message.content));


        console.log(messagesFull
                .sort((a, b) => b.createdTimestamp - a.createdTimestamp).last().embeds[0].fields.filter(field => field.name == "Link to Message"))
    }
};