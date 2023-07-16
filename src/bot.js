import { ChannelType, Client, GatewayIntentBits, Partials, } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import dotenv from "dotenv";
import * as https from "https";
import { commandHelp } from "./Commands/help.js";
import { command_code } from "./Commands/code.js";
import { command_spongebob } from "./Commands/spongebob.js";
import { command_memes } from "./Commands/memes.js";
import { command_xkcd } from "./Commands/xkcd.js";
import { command_translate } from "./Commands/translate.js";
import { command_pokedex } from "./Commands/pokedex.js";
import { commandMinecraft } from "./Commands/minecraft.js";
dotenv.config();
const DISCORD_CLIENT = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
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
    {
        name: "minecraft",
        description: "Check the status of the Minecraft Server",
    },
];
const DISCORD_TOKEN = process.env.DISCORDJS_TESTBOT_TOKEN;
const CLIENT_ID = process.env.DISCORDJS_TESTBOT_ID;
const PLAYGROUND_GUILD_ID = process.env.GUILD_ID_PLAYGROUND;
const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
(async () => {
    try {
        console.log("Started refreshing application (/) commands.");
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, PLAYGROUND_GUILD_ID), { body: commands });
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
        command_code(interaction);
    }
    else if (commandName === "spongebob") {
        console.log(`with '${options.get("input")?.value?.toString()}'`);
        command_spongebob(interaction);
    }
    else if (commandName === "memes") {
        console.log(`with '${options.get("input")?.value?.toString()}' '${options
            .get("first_line")
            ?.value?.toString()}' '${options.get("second_line")?.value?.toString()}'`);
        command_memes(interaction);
    }
    else if (commandName === "xkcd") {
        command_xkcd(interaction);
    }
    else if (commandName === "translate") {
        console.log(`with '${options.get("target")?.value?.toString()}' '${options
            .get("input")
            ?.value?.toString()}'`);
        command_translate(interaction);
    }
    else if (commandName === "pokedex") {
        console.log(`with '${options.get("input")?.value?.toString()}' '${options
            .get("value")
            ?.value?.toString()}'`);
        command_pokedex(interaction);
    }
    else if (commandName === "minecraft") {
        commandMinecraft(DISCORD_CLIENT, interaction);
    }
});
DISCORD_CLIENT.on("messageCreate", (message) => {
    if (message.channel.type === ChannelType.DM) {
        console.log(`${message.author.tag} in a Direct Message : ${message.content}`);
        printAdditionalMessageContent(message);
    }
    else {
        if (message.content !== "") {
            console.log(`${message.author.tag} in #${message.channel.name} in ${message.guild?.name} : ${message.content}`);
            printAdditionalMessageContent(message);
        }
    }
    if (message.author.bot) {
        return;
    }
});
function printAdditionalMessageContent(message) {
    let text = message.content;
    text = text.replace(/[^0-9\s]/g, "");
    const arr = text.split(" ");
    arr.forEach((id) => {
        if (DISCORD_CLIENT.users.cache.find((user) => user.id === id) !== undefined) {
            console.log(`Tag : ${DISCORD_CLIENT.users.cache.find((user) => user.id === id)?.tag}`);
        }
    });
    let emoji = message.content;
    emoji = emoji.replace(/[^0-9\s]/g, "");
    const arr1 = emoji.split(" ");
    arr1.forEach((id) => {
        https.get(`https://cdn.discordapp.com/emojis/${id}.png`, (res) => {
            const { statusCode } = res;
            if (statusCode === 200) {
                console.log(`Emote : https://cdn.discordapp.com/emojis/${id}.png`);
            }
        });
    });
    message.attachments.each((attachmentItem) => console.log(`Attached file : ${attachmentItem.attachment}`));
    if (message.embeds.length > 0) {
        message.embeds.forEach((embed) => console.log(`\nEmbed : ${JSON.stringify(embed.toJSON())}\n`));
    }
}
DISCORD_CLIENT.login(DISCORD_TOKEN);
