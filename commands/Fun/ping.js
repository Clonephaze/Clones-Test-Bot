const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),

	async execute(interaction) {
		const client = interaction.client;

		const embed = new EmbedBuilder()
			.setColor('#0099ff')
			.setTitle('Pong!')
			.addFields(
				{ name: 'Latency', value: `${Date.now() - interaction.createdTimestamp}ms`, inline: true },
				{ name: 'API Latency', value: `${Math.round(client.ws.ping)}ms`, inline: true },
			)
			.setTimestamp();

		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
