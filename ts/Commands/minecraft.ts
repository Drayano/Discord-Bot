import { Interaction } from "discord.js";
import dotenv from "dotenv";

import mcProtocol from "minecraft-protocol";

export async function commandMinecraft(interaction: Interaction) {
	if (!interaction.isCommand()) {
		return;
	}

	const serverStatus = await checkServerStatus();

	// Reply with the Embed
	await interaction.reply(serverStatus);
}

async function checkServerStatus(): Promise<string> {
	dotenv.config();

	const serverHost = process.env.MINECRAFT_SERVER_IP; // Replace with your Minecraft server's IP address or hostname
	const serverPort = process.env.MINECRAFT_SERVER_PORT; // Replace with your Minecraft server's port

	const client = mcProtocol.createClient({
		host: serverHost,
		port: serverPort,
		username: "DrayaBOT",
	});

	return new Promise((resolve) => {
		client.on("connect", () => {
			client.end();
			resolve("The Minecraft server is online.");
		});

		client.on("error", () => {
			resolve("The Minecraft server is offline.");
		});
	});
}
