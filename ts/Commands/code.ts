import { Interaction, EmbedBuilder } from "discord.js";

export async function commandCode(interaction: Interaction) {
	if (!interaction.isCommand()) {
		return;
	}

	// Create an Embed with a Title and Description
	const embed = new EmbedBuilder()
		.setTitle("Bot Source Code")
		.setDescription(
			`The bot source code is available on Github at this address : https://github.com/Drayano/Discord-Bot`,
		);

	await interaction.reply({ embeds: [embed] });
}
