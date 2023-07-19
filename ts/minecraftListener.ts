import { Tail } from "tail";
import { TextChannel, Client } from "discord.js";

import dotenv from "dotenv";
dotenv.config();

const serverLogFile = process.env.MINECRAFT_SERVER_LOGS_PATH; // Replace with the path to your Minecraft server log file
const discordChannelId = process.env.MINECRAFT_CHANNEL_PLAYGROUND; // Replace with the Discord channel ID where you want to mirror Minecraft messages

export function startMinecraftLogListener(discordClient: Client): void {
	const tail = new Tail(serverLogFile);

	tail.on("line", (line: string) => {
		// Parse the log line to extract relevant information
		const parsedLine = parseLogLine(line);

		if (parsedLine) {
			const content = `<${parsedLine.username}> : ${parsedLine.message}`;
			sendToDiscord(content, discordClient);
		}
	});

	tail.on("error", (error: Error) => {
		console.error("Error occurred while tailing Minecraft server log file:", error);
	});

	function parseLogLine(line: string): { username: string; message: string } | null {
		// Implement your custom parsing logic here to extract relevant information from the log line
		// Return an object containing position, username, and message if the line is a valid chat message, otherwise return null
		// Example parsing logic: extract position, username, and message using regular expressions or string manipulation

		// Example parsing logic using regular expressions:
		const chatRegex = /<(\w+)> (.+)/;
		const match = line.match(chatRegex);

		if (match) {
			const username = match[1];
			const message = match[2];

			return { username, message };
		}

		return null;
	}

	function sendToDiscord(content: string, discordClient: Client): void {
		const channel = discordClient.channels.cache.get(discordChannelId) as TextChannel;
		if (channel) {
			channel.send(content);
		} else {
			console.error("Invalid Discord channel ID");
		}
	}
}
