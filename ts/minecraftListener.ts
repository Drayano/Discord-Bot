import { Tail } from "tail";
import { TextChannel, Client } from "discord.js";

import dotenv from "dotenv";
dotenv.config();

const serverLogFile = process.env.MINECRAFT_SERVER_LOGS_PATH; // Replace with the path to your Minecraft server log file
const discordChannelId = process.env.MINECRAFT_CHANNEL_PLAYGROUND; // Replace with the Discord channel ID where you want to mirror Minecraft messages
const minecraftRoleId = process.env.MINECRAFT_ROLE_ID; // Replace with the Discord role ID that you want to tag

export function startMinecraftLogListener(discordClient: Client): void {
	const tail = new Tail(serverLogFile);

	tail.on("line", (line: string) => {
		// Parse the log line to extract relevant information
		const parsedLine = parseLogLine(line);

		if (parsedLine) {
			sendToDiscord(parsedLine, discordClient);
		}
	});

	tail.on("error", (error: Error) => {
		console.error("Error occurred while tailing Minecraft server log file : ", error);
	});

	function parseLogLine(line: string): string | null {
		// Implement your custom parsing logic here to extract relevant information from the log line
		// Return an object containing position, username, and message if the line is a valid chat message, otherwise return null
		// Example parsing logic: extract position, username, and message using regular expressions or string manipulation

		// Parsing Online / Offline server
		const serverRegex =
			/\[\d+\w+\d+ (\d+:\d+:\d+)\.\d+\] .+ (Stopping server|Starting minecraft server)/;

		const matchServer = line.match(serverRegex);

		if (matchServer) {
			const timestamp = matchServer[1];
			const message = matchServer[2];

			if (message === "Stopping server") {
				return `<@&${minecraftRoleId}> : The server is OFFLINE !`;
			} else if (message === "Starting minecraft server") {
				return `<@&${minecraftRoleId}> : The server is ONLINE !`;
			} else {
				return `[${timestamp}] ${message}`;
			}
		}

		// Parsing messages
		const chatRegex = /\[\d+\w+\d+ (\d+:\d+:\d+)\.\d+\] .+ <(\w+)> (.+)/;
		const match = line.match(chatRegex);

		if (match) {
			const timestamp = match[1];
			const username = match[2];
			const message = match[3];

			if (checkUsername(username)) {
				return `[${timestamp}] <${username}> : ${message}`;
			}

			return null;
		}

		// Parsing non-chat messages
		const eventRegex =
			/\[\d+\w+\d+ (\d+:\d+:\d+)\.\d+\] .+ (\w+)\s+(joined the game|left the game|has made the advancement.+|has completed the challenge.+|issued server command.+)/;
		const matchEvent = line.match(eventRegex);

		if (matchEvent) {
			const timestamp = matchEvent[1];
			const username = matchEvent[2];
			const message = matchEvent[3];

			if (checkUsername(username)) {
				return `[${timestamp}] ${username} ${message}`;
			}

			return null;
		}

		// Parsing death messages
		const deathRegex =
			/\[\d+\w+\d+ (\d+:\d+:\d+)\.\d+\] .+ (\w+)\s+(blew.+|burned.+|discovered.+|didn't want to live in the same world.+|died.+|drown.+|experienced kinetic.+|fell.+|froze.+|hit the ground too.+|left the confines.+|starved.+|suffocated.+|tried.+|walked.+|was.+|went.+|withered.+)/;

		const matchDeath = line.match(deathRegex);

		if (matchDeath) {
			const timestamp = matchDeath[1];
			const username = matchDeath[2];
			const message = matchDeath[3];

			if (checkUsername(username)) {
				return `[${timestamp}] ${username} ${message}`;
			}

			return null;
		}

		return null;
	}

	function checkUsername(username: string): boolean {
		if (
			username === "AbadAl" ||
			username === "Abed_Dz" ||
			username === "aymen2" ||
			username === "DrayanoX" ||
			username === "gweinblade" ||
			username === "Nebel11" ||
			username === "nebel117" ||
			username === "Raijhin" ||
			username === "Tahtouha"
		) {
			return true;
		}

		return false;
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
