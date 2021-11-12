const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data : new SlashCommandBuilder()
        .setName('embedtest')
        .setDescription('Just and embed test'),

    async execute(interaction){
        let embed = new Discord.MessageEmbed()
            .setColor("#942A0B")
            .setTitle("**Embed Test**")
            .setDescription("*Testing embeds in discord*")
            .setAuthor(interaction.member.displayName)
            .addFields(
                {   name: "Enemy HP", value: "30/100\n🟥🟥🟥⬜⬜⬜⬜⬜⬜", inline: true   },
                {   name: "Your HP", value: "90/100\n🟥🟥🟥🟥🟥🟥🟥🟥⬜", inline: true   },
                {   name: "Field Three", value: "Field Three Description", inline: false    }
            )
            .setImage("https://cdna.artstation.com/p/assets/covers/images/018/654/502/medium/madeleine-fisher-skeletonpreview.jpg?1560208309");
        interaction.reply({embeds: [embed]});   
    }
};