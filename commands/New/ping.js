const { SlashCommandBuilder } = require('discord.js');

// Define a new module and export it
module.exports = {

	// Define the "data" property of the module, which is a new SlashCommandBuilder
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),

	// Define an asynchronous function named "execute" that takes an "interaction" parameter
	async execute(interaction) {

		// Send a reply to the interaction with the message "Pong!"
		await interaction.reply('Pong!');
	},
};
