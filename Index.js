// Import required modules and packages
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, EmbedBuilder, REST, Routes } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');

// Create a new Discord client with the Guilds intent
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages] });

// Create a collection to store commands
client.commands = new Collection();
const commands = [];

// Find all command folders in the commands directory
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

process.on('SIGINT', () => {
	console.log('Bot shutting down...');
	process.exit();
});

// Loop through each command folder
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);

	// Find all command files in the folder
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	// Loop through each command file
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);

		// Load the command module from the file
		const command = require(filePath);

		// Check if the loaded module has the required "data" and "execute" properties
		if ('data' in command && 'execute' in command) {
			// Add the command to the collection using its name as the key
			client.commands.set(command.data.name, command);
			commands.push(command.data.toJSON());
			// console.log(`[INFO] Command loaded: ${command.data.name}`); //commenting out for now
		}
		else {
			// Log a warning if the loaded module is missing the required properties
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Load event handlers
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// // Start listening for keywords and reply if BCML Bug is detected
// const keywordsBCMLbug = ['loading forever', 'keeps loading', 'wont load', 'won\'t load', 'stuck on loading', 'stuck on load', 'load forever', 'loading screen', 'black screen', 'infinite loading'];
// client.on('messageCreate', message => {
// 	if (!message.author.bot && keywordsBCMLbug.some(word => message.content.toLowerCase().includes(word))) {
// 		const bcmlEmbed = new EmbedBuilder()
// 			.setColor(0x0099FF)
// 			.setTitle('BCML Bug Fix Script')
// 			.setURL('https://cdn.discordapp.com/attachments/978056569994502184/1118745645898022912/BCML_Bug_Fix.py')
// 			.setDescription('Download this then follow the steps provided!');
// 		message.reply({
// 			content: 'Sounds like you have the bcml bug! We have a script that will help fix that linked below. Get that then follow these steps:\n\n• Run the script, and allow it to uninstall bcml for you.\n• Once the script is complete it will re-open bcml for you\n• Click remerge or press Ctrl+M and launch your game when complete.\n\nIf the problem persists, try these steps again! The bug can stick around a handful of times and may need multiple attempts to solve.',
// 			embeds: [bcmlEmbed],
// 		});
// 	}
// });

// // Start listening for keywords and reply if the inventory bug is detected
// const keywordsInvBug = ['everything in my inventory', 'set to zero', 'set to 0', 'lost inventory', 'all my items'];
// client.on('messageCreate', message => {
// 	if (!message.author.bot && keywordsInvBug.some(word => message.content.toLowerCase().includes(word))) {
// 		const dataLayerEmbed = new EmbedBuilder()
// 			.setColor(0x0099FF)
// 			.setTitle('Data Layer Mod')
// 			.setURL('https://gamebanana.com/mods/49886')
// 			.setDescription('Paste this into your DataPack folder.');
// 		message.reply({
// 			content: 'It sounds like you\'re experiencing the inventory bug! If you are on Weekly Release 8 or newer, please ensure you have installed the Data Layer Mod. If you are on an older release, please check out this message and see if it solves the issue for you: https://discord.com/channels/930516653656129617/930518282740592650/1101019391753207840',
// 			embeds: [dataLayerEmbed],
// 		});
// 	}
// });

const keywordsSpamBlock = ['you could win', 'chance to win', 'sign up now', 'you have been randomly selected', 'we are a fast growing', 'crypto giveaway'];
client.on('messageCreate', async message => {
	if (!message.author.bot && keywordsSpamBlock.some(keyword => message.content.toLowerCase().includes(keyword))) {
		// Remove the user's message
		await message.delete();

		// Fetch the user to send them a DM
		const user = await message.client.users.fetch(message.author.id);

		try {
			// Send a DM to the user explaining why their message was deleted
			await user.send('Please do not spam. Your message was automatically deleted.');
		}
		catch (error) {
			console.error(`Failed to send DM to ${user.tag}:`, error);
		}
	}
});

// Number of messages
const messageLimit = 5;
// Timeframe in milliseconds (10000 = 10 seconds)
const timeframe = 10000;
const userMessages = new Collection();
client.on('messageCreate', message => {
	if (message.author.bot) return;

	const now = Date.now();
	const userId = message.author.id;

	if (!userMessages.has(userId)) {
		userMessages.set(userId, []);
	}

	// Add the message to the user's message array
	userMessages.get(userId).push({ timestamp: now, message });

	// Filter out messages that are outside the timeframe
	const recentMessages = userMessages.get(userId).filter(msg => now - msg.timestamp < timeframe);

	// Update the user's messages with the recent ones only
	userMessages.set(userId, recentMessages);

	// Check if the user has exceeded the message limit within the timeframe
	if (recentMessages.length >= messageLimit) {
		// Delete the messages
		recentMessages.forEach(msg => msg.message.delete().catch(console.error));

		// This would kick the user
		// message.guild.members.kick(userId, 'Spamming messages').catch(console.error);

		// This would give the user a timeout, calculated in ms (24 hours = 24 * 60 * 60 * 1000)
		// var timeoutTime = 24 * 60 * 60 * 1000;
		// message.guild.members.cache.get(userId).timeout(timeoutTime, 'Spamming messages').catch(console.error);

		// This sends a warning message to the user
		message.author.send('You would have just been kicked for spamming. Please refrain from sending too many messages in a short period.');

		// Optionally, send a message to the channel or log the action
		// message.channel.send(`User ${message.author.tag} has been warned for spamming.`);

		// Clear the user's message data
		userMessages.delete(userId);
	}
});


// Log in to Discord with the bot token
client.login(token);

// Register or update commands
client.once('ready', async () => {
	console.log(`Logged in as ${client.user.tag}`);

	const rest = new REST({ version: '10' }).setToken(token);

	try {
		console.log('[INFO] Refreshing command list.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('[INFO] Reloaded commands.');
	}
	catch (error) {
		console.error(error);
	}
});
