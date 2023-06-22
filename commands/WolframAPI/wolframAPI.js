const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { WolfAPI } = require('../../config.json');
const { request } = require('undici');

const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wolfram')
		.setDescription('Get an answer from Wolfram Alpha')
		.addStringOption((option) =>
			option.setName('term')
				.setDescription('The term to search for')
				.setRequired(true),
		),
	async execute(interaction) {
		await interaction.deferReply();


		if (interaction.commandName === 'wolfram') {
			const term = interaction.options.getString('term');
			const query = new URLSearchParams({ input:term });

			try {
				const wolfResult = await request(`http://api.wolframalpha.com/v2/query?appid=${WolfAPI}&${query.toString()}&format=image,plaintext&output=json`);
				const { queryresult } = await wolfResult.body.json();

				// Find the first pod with a subpod that has a plaintext field
				const podWithPlaintext = queryresult?.pods?.find((pod, index) => index === 1 && pod.subpods?.[0]?.plaintext != null);

				if (!podWithPlaintext) {
					throw new Error('No results found for the query');
				}

				const plaintext = podWithPlaintext.subpods[0].plaintext;
				const image = queryresult?.pods?.[2]?.subpods?.[0]?.img?.src;

				const title = term.length > 48 ? term.slice(0, 48) + '...' : term;

				const wolframEmbed = new EmbedBuilder()
					.setColor(0xff7e00)
					.setTitle(title.toUpperCase())
					.setURL(`https://www.wolframalpha.com/input?i=${encodeURIComponent(term)}`)
					.setImage(image)
					.addFields(
						{ name: 'Results', value: trim(plaintext, 1024) },
					);

				await interaction.editReply({ embeds: [wolframEmbed] });
			}
			catch (error) {
				console.error(error);
				await interaction.editReply('An error occurred while processing the query.');
			}
		}
	},
};