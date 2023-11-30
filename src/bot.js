import dotenv from "dotenv";
import * as fs from "fs";
import * as readline from "readline";
import { Client, Partials } from "discord.js";
import { REST } from "@discordjs/rest";
import { ChannelType, GatewayIntentBits, Routes } from "discord-api-types/v10";
import { commandHelp } from "./Commands/help.js";
import { commandCode } from "./Commands/code.js";
import { commandSpongebob } from "./Commands/spongebob.js";
import { commandMemes } from "./Commands/memes.js";
import { commandXkcd } from "./Commands/xkcd.js";
import { commandTranslate } from "./Commands/translate.js";
import { commandPokedex } from "./Commands/pokedex.js";
dotenv.config();
const DISCORD_CLIENT = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel],
});
const commands = [
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
                type: 3,
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
                type: 3,
            },
            {
                name: "first_line",
                description: "First Meme Line",
                required: true,
                type: 3,
            },
            {
                name: "second_line",
                description: "Second Meme Line",
                required: true,
                type: 3,
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
                type: 3,
            },
            {
                name: "input",
                description: "Text to translate",
                required: true,
                type: 3,
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
                type: 3,
            },
            {
                name: "value",
                description: "The name of the content your want to search",
                required: true,
                type: 3,
            },
        ],
    },
];
const DISCORD_TOKEN = process.env.DISCORDJS_BOT_TOKEN;
const CLIENT_ID = process.env.DISCORDJS_BOT_ID;
const PLAYGROUND_GUILD_ID = process.env.GUILD_ID_PLAYGROUND;
const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
(async () => {
    try {
        console.log("Started refreshing application (/) commands.");
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        console.log("Successfully reloaded application (/) commands.");
    }
    catch (error) {
        console.error(error);
    }
})();
DISCORD_CLIENT.once("ready", () => {
    console.log(`${DISCORD_CLIENT.user?.tag} has logged in`);
    DISCORD_CLIENT.user?.setPresence({
        status: "online",
        activities: [
            {
                name: "DrayaBOT",
            },
        ],
    });
    console.log(`${DISCORD_CLIENT.user?.tag} status set to "DrayaBOT"`);
});
DISCORD_CLIENT.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName, options } = interaction;
    if (interaction.inGuild() && interaction.channel?.type === ChannelType.GuildText) {
        console.log(`${interaction.user.tag} in ${interaction.channel?.name} in ${interaction.guild?.name} : used the ${commandName} command`);
    }
    else {
        console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command`);
    }
    if (commandName === "help") {
        commandHelp(DISCORD_CLIENT, interaction);
    }
    else if (commandName === "code") {
        commandCode(interaction);
    }
    else if (commandName === "spongebob") {
        console.log(`with '${options.get("input")?.value?.toString()}'`);
        commandSpongebob(interaction);
    }
    else if (commandName === "memes") {
        console.log(`with '${options.get("input")?.value?.toString()}' '${options
            .get("first_line")
            ?.value?.toString()}' '${options.get("second_line")?.value?.toString()}'`);
        commandMemes(interaction);
    }
    else if (commandName === "xkcd") {
        commandXkcd(interaction);
    }
    else if (commandName === "translate") {
        console.log(`with '${options.get("target")?.value?.toString()}' '${options
            .get("input")
            ?.value?.toString()}'`);
        commandTranslate(interaction);
    }
    else if (commandName === "pokedex") {
        console.log(`with '${options.get("input")?.value?.toString()}' '${options
            .get("value")
            ?.value?.toString()}'`);
        commandPokedex(interaction);
    }
});
DISCORD_CLIENT.on("messageCreate", (message) => {
    if (message.channel.type === ChannelType.DM) {
        console.log(`${message.author.tag} in a Direct Message : ${message.content}`);
    }
    if (message.author.bot) {
        return;
    }
    else if (message.guildId === process.env.GUILD_ID_NOMEDIA && message.content !== "") {
        checkMessageContent(message);
    }
});
async function checkMessageContent(message) {
    try {
        const filePath = "assets/trigger.txt";
        const lines = await readAndStoreLines(filePath);
        const matchingIndex = lines.findIndex((line) => line === message.content);
        if (matchingIndex !== -1) {
            switch (matchingIndex) {
                case 0:
                    message.reply({
                        files: [process.env.NOMEDIA_FUNNY_CAT],
                    });
                    break;
                default:
                    break;
            }
        }
    }
    catch (error) {
        console.error("Error:", error.message);
    }
}
function readAndStoreLines(filePath) {
    return new Promise((resolve, reject) => {
        const lines = [];
        const readStream = readline.createInterface({
            input: fs.createReadStream(filePath),
            output: process.stdout,
            terminal: false,
        });
        readStream.on("line", (line) => {
            lines.push(line);
        });
        readStream.on("close", () => {
            resolve(lines);
        });
        readStream.on("error", (err) => {
            reject(err);
        });
    });
}
DISCORD_CLIENT.login(DISCORD_TOKEN);
