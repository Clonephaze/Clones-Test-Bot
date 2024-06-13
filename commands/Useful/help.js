const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Provides a list of all available commands.'),

	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setTitle('How to use me!')
			.setDescription('This will be a list of all my commands and how to use them.')
			.addFields(
				{
					name: '**/introduction**',
					value: 'This command will provide new users with a few resources to find some useful information to get started playing DtgA.',
					inline: false,
				},
				{
					name: '**/instructions instruction-set-name user**',
					value: 'This command can provide various custom lists of instructions to new users and has 2 arguments to work with!\n   1. Instruction-set-name (required): listed just below, this is how you\'ll tell the command which instructions to offer up.\n   2. User (optional): if you choose to use this argument you can select a user, and that user will be pinged when the instructions are sent. Useful for dragging users to the right channel.\n\n**Instruction-set-names:**',
					inline: false,
				},
				{
					name: '**bcml bug**',
					value: 'This will send users instructions on how to fix the classic BCML bug the new way.\nAlt names: bcmlbug',
					inline: false,
				},
				{
					name: '**bcml bug old**',
					value: 'This will send users instructions on how to fix the classic BCML bug the old way.',
					inline: false,
				},
				{
					name: '**collision actors**',
					value: 'This will send users instructions for getting and installing the Collision Actors mod.\nAlt names: collsion actor, collact',
					inline: false,
				},
				{
					name: '**input list**',
					value: 'This will send a list of all the inputs or combos for DtgA\nAlt names: combo list, inputs',
					inline: false,
				},
			)
			.setColor('#00b0f4');
		await interaction.reply({ embeds: [embed] });
	},
};