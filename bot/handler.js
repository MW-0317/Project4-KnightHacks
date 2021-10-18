const fs = require('fs');
const path = require('path');

require('dotenv').config({path:__dirname+'./../.env'});

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { CommandInteractionOptionResolver } = require('discord.js');
const TOKEN = process.env.TOKEN;

const clientId = '896127866864037968';
const guildId = '896129894960992287';

const textCommands = {};
const commands = {};
const pushedServerCommands = [];

const fileRegx = /.+\..+/

const getAllPaths = function(dirPath) {
    const files = fs.readdirSync(dirPath);
	// console.log("dirPath: " + dirPath)
	// console.log("f: ["+files +"]");
	
	let filteredFiles = [];
	let recursiveFiles = []

	for(let i = 0; i<files.length; i++){
		let f = files[i];
		let match = f.match(fileRegx);
		
		if (match != null){
			if (match[0].endsWith('Command.js')){
				filteredFiles.push(dirPath +'/'+ match[0]);
			}
			
		}else{
			recursiveFiles = recursiveFiles.concat(getAllPaths(dirPath+"/"+f));
		}
	}
	
	let a = filteredFiles.concat(recursiveFiles);
    return a;
}
const commandFiles = getAllPaths("./bot/commands");
const textCommandFiles = getAllPaths("./bot/textCommands");


textCommandFiles.forEach(file => {
    const command = require(file.replace("bot/",""));
    textCommands[command.data.name] = command;
});


commandFiles.forEach(file => {
    const command = require(file.replace("bot/",""));
    commands[command.data.name] = command;
    pushedServerCommands.push(command.data.toJSON());
    
});

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: pushedServerCommands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

module.exports = {
    getAllPaths,
    commands,
	textCommands
};