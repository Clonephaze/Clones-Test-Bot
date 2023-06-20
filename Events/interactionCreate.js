const { Events } = require('discord.js');

/**
 * Module exports an object containing the name of the exported function and the function itself
 */
module.exports = {
	name: Events.InteractionCreate,

	/**
     * Executes the function passed as an argument to it, if the interaction is a chat input command
     * @param {interaction} interaction - The interaction object that represents the user's interaction with the bot
     */
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};
