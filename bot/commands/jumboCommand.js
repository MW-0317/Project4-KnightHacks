const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data : new SlashCommandBuilder()
        .setName('jumbo')
        .setDescription('Jumbos your emoji or icon')
        .addStringOption(option => 
            option.setName("input")
                .setDescription("The emoji")
                .setRequired(false)),

    async execute(interaction){
        const emoteRegex = /<:.+:(\d+)>/gm
        const animatedEmoteRegex = /<a:.+:(\d+)>/gm
        const input = interaction.options.getString('input');
        // await interaction.reply("h");
        if (emoji = emoteRegex.exec(input)){
            const url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1";
            interaction.reply(url);
        }
        else if (emoji = animatedEmoteRegex.exec(input)){
            const url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?v=1"
            interaction.reply(url)
        }
        else{
            interaction.reply("Couldn't find an emoji to paste!")
        }
    }
}