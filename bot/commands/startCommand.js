const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data : new SlashCommandBuilder()
        .setName('start')
        .setDescription('start command'),

    async execute(interaction){
        
    }
}