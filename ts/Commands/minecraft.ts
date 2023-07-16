import { Client, Interaction } from "discord.js";

export async function commandMinecraft(discordClient: Client, interaction: Interaction) {
	if (!interaction.isCommand()) {
		return;
	}

	// Reply with the Embed
	await interaction.reply("Minecraft");
}
