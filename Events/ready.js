// Importing the Events class from the discord.js library
const { Events } = require('discord.js');

// Exporting a named object containing the event name ('ClientReady'),
// a boolean indicating whether the event should only be executed once, and a function to execute the event
module.exports = {
	// The event name
	name: Events.ClientReady,
	// Should the event only be executed once
	once: true,
	// Function to execute the event
	execute(client) {
		// Log a message to the console indicating that the bot is ready and which user it is logged in as
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
