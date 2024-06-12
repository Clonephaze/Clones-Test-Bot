const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('secret')
		.setDescription('If a valid string is sent this command will return a matching secret.')
		.addStringOption(option =>
			option.setName('keyphrase')
				.setDescription('The key to get the secret for')
				.setRequired(true)),
	async execute(interaction) {
		const keyOption = interaction.options.getString('keyphrase');

		// Ensure the keyOption is not null before proceeding
		if (!keyOption) {
			await interaction.reply('No key provided.');
			return;
		}

		const key = keyOption.toLowerCase();

		// Define your responses with embeds
		let response;
		switch (key) {
		case 'apple':
			response = new EmbedBuilder()
				.setColor(0xff0000)
				.setTitle('Apple Secret')
				.setDescription('The apple secret is delicious!')
				.setThumbnail('https://example.com/apple.png');
			break;
		case 'banana':
			response = new EmbedBuilder()
				.setColor(0xffff00)
				.setTitle('Banana Secret')
				.setDescription('Bananas are a great source of potassium!')
				.setThumbnail('https://example.com/banana.png');
			break;
		case 'carrot':
			response = new EmbedBuilder()
				.setColor(0xffa500)
				.setTitle('Carrot Secret')
				.setDescription('Carrots help you see in the dark!')
				.setThumbnail('https://example.com/carrot.png');
			break;
		case 'shrimp':
			response = new EmbedBuilder()
				.setColor(0xf7c7a9)
				.setTitle('SeaRoach!')
				.setDescription('Shrimp are nothing more than the roaches of the sea!')
				.setImage('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FTX_bIV1mCro%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=987f8e0cfaf064192cd06790b105770939e3cb1bfe106303af1d8e7b5d92de8a&ipo=images');
			break;
		default:
			response = `Sorry, no secret found for the key: ${key}`;
			break;
		}

		// Reply with the appropriate response
		if (response instanceof EmbedBuilder) {
			await interaction.reply({ embeds: [response] });
		}
		else {
			await interaction.reply(response);
		}
	},
};
