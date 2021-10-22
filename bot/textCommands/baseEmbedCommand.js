const Discord = require("discord.js");

module.exports = {
    data: {
        name: "embedtest",
        description: "embed test command"
    },
    async execute(message, args){
        let embed = new Discord.MessageEmbed()
            .setColor("#942A0B")
            .setTitle("**Embed Test**")
            .setDescription("*Testing embeds in discord*")
            .setAuthor(message.author.username)
            .addFields(
                {   name: "Field One", value: "Field One Description", inline: true   },
                {   name: "Field Two", value: "Field Two Description", inline: true   }
            )
            .setThumbnail(message.author.avatarURL())
        message.reply({embeds: [embed]});   
    }
};