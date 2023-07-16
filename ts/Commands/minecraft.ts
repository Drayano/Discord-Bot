import { Interaction } from "discord.js";

export async function commandMinecraft(interaction: Interaction) {
	if (!interaction.isCommand()) {
		return;
	}

	// Reply with the Embed
	await interaction.reply("Minecraft");
}
