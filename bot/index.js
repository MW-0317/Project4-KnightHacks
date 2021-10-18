const { Client, Intents } = require('discord.js');
const { commands, textCommands } = require('./handler.js');
require('dotenv').config({path:__dirname+'./../.env'});

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS,
                                        Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS] });

const TOKEN = process.env.TOKEN;

client.once('ready', () => {
	console.log('Ready!');
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    else if (message.content.startsWith("%%")){ // Command prefix
        const commandFull = message.content.substring(1).split(' ');
        const command = commandFull[0];
        const args = commandFull.splice(1);
        if (tx = textCommands[command]){
            tx.execute(message, args);
        }
    }
});

client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return;
    const {commandName} = interaction;
    commands[commandName].execute(interaction);
});

client.login(TOKEN);