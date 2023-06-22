require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');
const { ChatGPTClient } = require('discordjs-chatgpt');
const chatgpt = new ChatGPTClient(process.env.YOUR_OPENAI_API_KEY);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('gpt')
		.setDescription('Send a message to or ask a question of ChatGPT')
		.addStringOption(option =>
			option
				.setName('message')
				.setDescription('Your message')),
	async execute(interaction) {
		const msg = interaction.options.getString('message', true);
		await chatgpt.chatInteraction(interaction, msg);
	},

};
