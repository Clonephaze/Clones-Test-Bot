const { SlashCommandBuilder, EmbedBuilder, userMention } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('instructions')
		.setDescription('Provides instructions based on the given set name.')
		.addStringOption(option =>
			option.setName('instruction-set-name')
				.setDescription('Type the name of the instructions you want to send')
				.setRequired(true))
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to mention if needed')
				.setRequired(false)),
	async execute(interaction) {
		const instructionSetName = interaction.options.getString('instruction-set-name').toLowerCase();
		const user = interaction.options.getUser('user');

		let response;

		switch (instructionSetName) {
		case 'bcml bug old':
			response = new EmbedBuilder()
				.setColor([174, 235, 220])
				.setTitle('Instructions for fixing the BCML bug the old way')
				.setFields([
					{ name: 'Step 1', value: 'Press Windows + R and type `cmd` then press enter' },
					{ name: 'Step 2', value: 'Type `pip uninstall bcml --yes` and press enter' },
					{ name: 'Step 3', value: 'Type `del /Q "%localappdata%/bcml/merged"` and press enter' },
					{ name: 'Step 4', value: 'Type `pip install bcml==3.10.4` and press enter' },
					{ name: 'Step 5', value: 'Type `bcml` and press enter, once bcml is launched press Ctrl + m to remerge your mods' },
					{ name: 'Step 6', value: 'Attempt launching your game again. If the bug persists, please start back and step 1 and try again. This bug can be fixed the first time you try this fix, but sometimes it can take trying it 10+ times.' },
				])
				.setThumbnail('https://media.discordapp.net/attachments/978056569994502184/1227730375850328094/Logo_Overlay.png?ex=666a1183&is=6668c003&hm=6b985a580402d8b9156b43502bd1ac6f1ccf8f4352bd35d358f70656464f0061&=&format=webp&quality=lossless&width=657&height=621');
			break;
		case 'bcml bug':
			response = new EmbedBuilder()
				.setColor([174, 235, 220])
				.setTitle('Instructions for fixing the BCML bug')
				.setFields([
					{ name: 'Step 1', value: 'Open BCML and uninstall the ReBorn and ReAnimated modules of DtgA.' },
					{ name: 'Step 2', value: 'Open BCML and **AT THE SAME TIME** install the ReBorn and ReAnimated modules of DtgA in a queued install.' },
					{ name: 'Step 3', value: 'Fix the load order of the mods so that dtga mods are below the Collision actor mod, then launch your game after bcml is done.' },
					{ name: 'Step 4', value: 'That should be it! If the bug persists, please let us know or use the `/instructions bcml bug old` command to see the old instructions instead.' },
				])
				.setThumbnail('https://media.discordapp.net/attachments/978056569994502184/1227730375850328094/Logo_Overlay.png?ex=666a1183&is=6668c003&hm=6b985a580402d8b9156b43502bd1ac6f1ccf8f4352bd35d358f70656464f0061&=&format=webp&quality=lossless&width=657&height=621');
			break;
		// Add more cases as needed
		default:
			response = `Sorry, no instructions found for the set: ${instructionSetName}`;
			break;
		}

		if (response instanceof EmbedBuilder) {
			if (user) {
				await interaction.reply({ content: userMention(user.id), embeds: [response] });
			}
			else {
				await interaction.reply({ embeds: [response] });
			}
		}
		// else if (user) {
		// 	await interaction.reply({ content: `${userMention(user.id)} ${response}` });
		// }
		// else {
		// 	await interaction.reply(response);
		// }
	},
};
