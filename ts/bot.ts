import {
	ChannelType,
	Client,
	Embed,
	GatewayIntentBits,
	Interaction,
	Message,
	Partials,
	User,
} from "discord.js";

import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import dotenv from "dotenv";

import * as https from "https";

import { commandHelp } from "./Commands/help.js";
import { commandCode } from "./Commands/code.js";
import { commandSpongebob } from "./Commands/spongebob.js";
import { commandMemes } from "./Commands/memes.js";
import { commandXkcd } from "./Commands/xkcd.js";
import { commandTranslate } from "./Commands/translate.js";
import { commandPokedex } from "./Commands/pokedex.js";
import { commandMinecraft } from "./Commands/minecraft.js";

dotenv.config();

const DISCORD_CLIENT: Client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
	],

	partials: [Partials.Channel],
});

// List of commands
interface CommandInterface {
	name: string;
	description: string;
	options?: {
		name: string;
		description: string;
		type: number;
		required?: boolean;
	}[];
}

const commands: CommandInterface[] = [
	{
		name: "help",
		description: "Shows the list of commands available",
	},
	{
		name: "code",
		description: "Bot Source Code",
	},
	{
		name: "spongebob",
		description: "sPoNgE bOb cAsE",
		options: [
			{
				name: "input",
				description: "Text to transform",
				required: true,
				type: 3, // String
			},
		],
	},
	{
		name: "memes",
		description: "Make memes",
		options: [
			{
				name: "input",
				description: "Choose a meme template",
				required: true,
				type: 3, // String
			},
			{
				name: "first_line",
				description: "First Meme Line",
				required: true,
				type: 3, // String
			},
			{
				name: "second_line",
				description: "Second Meme Line",
				required: true,
				type: 3, // String
			},
		],
	},
	{
		name: "xkcd",
		description: "Post a random XKCD",
	},
	{
		name: "translate",
		description: "Translate the input text",
		options: [
			{
				name: "target",
				description: "Language to translate to",
				required: true,
				type: 3, // String
			},
			{
				name: "input",
				description: "Text to translate",
				required: true,
				type: 3, // String
			},
		],
	},
	{
		name: "pokedex",
		description: "Infos about Pokemons, Moves and Items",
		options: [
			{
				name: "input",
				description: "Content you want to search : Pokemon, Move or Item",
				required: true,
				type: 3, // String
			},
			{
				name: "value",
				description: "The name of the content your want to search",
				required: true,
				type: 3, // String
			},
		],
	},
	{
		name: "minecraft",
		description: "Check the status of the Minecraft Server",
	},
];

const DISCORD_TOKEN: string = process.env.DISCORDJS_TESTBOT_TOKEN;
const CLIENT_ID: string = process.env.DISCORDJS_TESTBOT_ID;
const PLAYGROUND_GUILD_ID: string = process.env.GUILD_ID_PLAYGROUND;

const rest: REST = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

(async () => {
	try {
		console.log("Started refreshing application (/) commands.");

		await rest.put(
			// This is for testing purposes
			Routes.applicationGuildCommands(CLIENT_ID, PLAYGROUND_GUILD_ID),
			// This is for production
			// Routes.applicationCommands(CLIENT_ID),
			{ body: commands },
		);

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}
})();

// When the client is ready, run this code (only once)
DISCORD_CLIENT.once("ready", () => {
	console.log(`${DISCORD_CLIENT.user?.tag} has logged in`);

	DISCORD_CLIENT.user?.setPresence({
		status: "online", // You can show online, idle....
		activities: [
			{
				name: "DrayaBOT",
			},
		],
	});

	console.log(`${DISCORD_CLIENT.user?.tag} status set to "DrayaBOT"`);
});

// Slash (/) commands handling
DISCORD_CLIENT.on("interactionCreate", async (interaction: Interaction) => {
	if (!interaction.isCommand()) {
		return;
	}

	const { commandName, options } = interaction;

	// Check if the interaction is happening in a discord server,
	// If the Channel is a Text Channel (i.e : not a voice, thread or news channel) (to get channel.name)
	if (interaction.inGuild() && interaction.channel?.type === ChannelType.GuildText) {
		console.log(
			`${interaction.user.tag} in ${interaction.channel?.name} in ${interaction.guild?.name} : used the ${commandName} command`,
		);
	}

	// Interaction happening in a DM
	else {
		console.log(
			`${interaction.user.tag} in a Direct Message : used the ${commandName} command`,
		);
	}

	// help command
	if (commandName === "help") {
		commandHelp(DISCORD_CLIENT, interaction);
	}

	// code command
	else if (commandName === "code") {
		commandCode(interaction);
	}

	// spongebob command
	else if (commandName === "spongebob") {
		console.log(`with '${options.get("input")?.value?.toString()}'`);
		commandSpongebob(interaction);
	}

	// memes command
	else if (commandName === "memes") {
		console.log(
			`with '${options.get("input")?.value?.toString()}' '${options
				.get("first_line")
				?.value?.toString()}' '${options.get("second_line")?.value?.toString()}'`,
		);
		commandMemes(interaction);
	}

	// xkcd command
	else if (commandName === "xkcd") {
		commandXkcd(interaction);
	}

	// translate command
	else if (commandName === "translate") {
		console.log(
			`with '${options.get("target")?.value?.toString()}' '${options
				.get("input")
				?.value?.toString()}'`,
		);
		commandTranslate(interaction);
	}

	// translate command
	else if (commandName === "pokedex") {
		console.log(
			`with '${options.get("input")?.value?.toString()}' '${options
				.get("value")
				?.value?.toString()}'`,
		);
		commandPokedex(interaction);
	}

	// help command
	else if (commandName === "minecraft") {
		commandMinecraft(interaction);
	}
});

// Messages handling
DISCORD_CLIENT.on("messageCreate", (message: Message) => {
	// Check if the message is sent in a discord DM
	if (message.channel.type === ChannelType.DM) {
		console.log(`${message.author.tag} in a Direct Message : ${message.content}`);

		printAdditionalMessageContent(message);
	}

	// The message is being sent in a discord server so we can get (channel.name)
	else {
		if (message.content !== "") {
			console.log(
				`${message.author.tag} in #${message.channel.name} in ${message.guild?.name} : ${message.content}`,
			);

			printAdditionalMessageContent(message);
		}
	}

	// Don't reply to ourselves or other bots
	if (message.author.bot) {
		return;
	}
});

function printAdditionalMessageContent(message: Message) {
	// Get the mentions IDs and use them to find out the named of who's being mentioned
	let text: string = message.content;
	text = text.replace(/[^0-9\s]/g, "");
	const arr: string[] = text.split(" ");
	arr.forEach((id: string) => {
		if (DISCORD_CLIENT.users.cache.find((user: User) => user.id === id) !== undefined) {
			console.log(
				`Tag : ${DISCORD_CLIENT.users.cache.find((user: User) => user.id === id)?.tag}`,
			);
		}
	});

	// Get the emotes IDs and use them to find out the emote URL
	let emoji: string = message.content;
	emoji = emoji.replace(/[^0-9\s]/g, "");

	const arr1: string[] = emoji.split(" ");

	arr1.forEach((id: string) => {
		https.get(`https://cdn.discordapp.com/emojis/${id}.png`, (res) => {
			const { statusCode } = res;
			if (statusCode === 200) {
				// HTTP 200 = OK
				console.log(`Emote : https://cdn.discordapp.com/emojis/${id}.png`);
			}
		});
	});

	// Get Attachement files if there are any
	message.attachments.each((attachmentItem: any) =>
		console.log(`Attached file : ${attachmentItem.attachment}`),
	);

	// Print embeds if there are any
	if (message.embeds.length > 0) {
		message.embeds.forEach((embed: Embed) =>
			console.log(`\nEmbed : ${JSON.stringify(embed.toJSON())}\n`),
		);
	}
}

// Login to Discord with the token
DISCORD_CLIENT.login(DISCORD_TOKEN);

// TODO : Add catch around promises
