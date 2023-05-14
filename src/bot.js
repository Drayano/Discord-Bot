import { Client, GatewayIntentBits, Partials, ChannelType } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import dotenv from "dotenv";
import * as https from 'https';
import { command_help } from "./Commands/help.js";
import { command_code } from "./Commands/code.js";
import { command_spongebob } from "./Commands/spongebob.js";
import { command_memes } from "./Commands/memes.js";
import { command_xkcd } from "./Commands/xkcd.js";
import { command_translate } from "./Commands/translate.js";
dotenv.config();
const discord_client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions
    ],
    partials: [
        Partials.Channel
    ]
});
const commands = [
    {
        name: "help",
        description: "Shows the list of commands available"
    },
    {
        name: "code",
        description: "Bot Source Code"
    },
    {
        name: "spongebob",
        description: "sPoNgE bOb cAsE",
        options: [
            {
                name: "input",
                description: "Text to transform",
                required: true,
                type: 3
            }
        ]
    },
    {
        name: "memes",
        description: "Make memes",
        options: [
            {
                name: "input",
                description: "Choose a meme template",
                required: true,
                type: 3
            },
            {
                name: "first_line",
                description: "First Meme Line",
                required: true,
                type: 3
            },
            {
                name: "second_line",
                description: "Second Meme Line",
                required: true,
                type: 3
            }
        ]
    },
    {
        name: "xkcd",
        description: "Post a random XKCD"
    },
    {
        name: "translate",
        description: "Translate the input text",
        options: [
            {
                name: "target",
                description: "Language to translate to",
                required: true,
                type: 3
            },
            {
                name: "input",
                description: "Text to translate",
                required: true,
                type: 3
            }
        ]
    }
];
const discord_token = process.env.DISCORDJS_TESTBOT_TOKEN;
const client_id = process.env.DISCORDJS_TESTBOT_ID;
const playground_guild_id = process.env.GUILD_ID_PLAYGROUND;
const yugen_guild = process.env.GUILD_ID_YUGEN;
const yugen_memes = process.env.YUGEN_CHANNEL_ID_MEMES;
const yugen_xkcd = process.env.YUGEN_CHANNEL_ID_XKCD;
const meme_channel_error = "Yugen Memes, Playground Server";
const xkcd_channel_error = "Yugen XKCD, Playground Server";
const rest = new REST({ version: '10' }).setToken(discord_token);
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(client_id, playground_guild_id), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
})();
discord_client.once("ready", () => {
    console.log(`${discord_client.user?.tag} has logged in`);
    discord_client.user?.setPresence({
        status: "online",
        activities: [{
                name: "DrayaBOT"
            }]
    });
    console.log(`${discord_client.user?.tag} status set to "DrayaBOT"`);
});
discord_client.on("interactionCreate", async (interaction) => {
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
        command_help(discord_client, interaction);
    }
    else if (commandName === "code") {
        command_code(interaction);
    }
    else if (commandName === "spongebob") {
        console.log(`with '${options.get("input")?.value?.toString()}'`);
        command_spongebob(interaction);
    }
    else if (commandName === "memes") {
        console.log(`with '${options.get("input")?.value?.toString()}' '${options.get("first_line")?.value?.toString()}' '${options.get("second_line")?.value?.toString()}'`);
        if (!interaction.inGuild() || interaction.guild?.id !== yugen_guild || interaction.channel?.id === yugen_memes) {
            command_memes(interaction);
        }
        else {
            console.log(`ERROR : Cannot use this command in that channel.\nAUTHORIZED CHANNELS : ${meme_channel_error}`);
            if (interaction.guild?.id === yugen_guild) {
                interaction.reply(`You can't use this command in this Channel, try posting it in ${interaction.guild?.channels.cache.get(yugen_memes)?.toString()}`);
            }
            else {
                interaction.reply(`You can't use this command here`);
            }
        }
    }
    else if (commandName === "xkcd") {
        if (!interaction.inGuild() || interaction.guild?.id !== yugen_guild || interaction.channel?.id === yugen_xkcd) {
            command_xkcd(interaction);
        }
        else {
            console.log(`ERROR : Cannot use this command in that channel.\nAUTHORIZED CHANNELS : ${xkcd_channel_error}`);
            if (interaction.guild?.id === yugen_guild) {
                interaction.reply(`You can't use this command in this Channel, try posting it in ${interaction.guild?.channels.cache.get(yugen_xkcd)?.toString()}`);
            }
            else {
                interaction.reply(`You can't use this command here`);
            }
        }
    }
    else if (commandName === "translate") {
        console.log(`with '${options.get("target")?.value?.toString()}' '${options.get("input")?.value?.toString()}'`);
        command_translate(interaction);
    }
});
discord_client.on("messageCreate", (message) => {
    if (message.channel.type === ChannelType.DM) {
        console.log(`${message.author.tag} in a Direct Message : ${message.content}`);
        let text = message.content;
        text = text.replace(/[^0-9\s]/g, "");
        const arr = text.split(" ");
        arr.forEach((id) => {
            if (discord_client.users.cache.find((user) => user.id === id) !== undefined) {
                console.log(`Tag : ${discord_client.users.cache.find((user) => user.id === id)?.tag}`);
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
        message.attachments.each((attachment_item) => console.log(`Attached file : ${attachment_item.attachment}`));
        if (message.embeds.length > 0) {
            message.embeds.forEach((embed) => console.log(`\nEmbed : ${JSON.stringify(embed.toJSON())}\n`));
        }
    }
    else {
        console.log(`${message.author.tag} in #${message.channel.name} in ${message.guild?.name} : ${message.content}`);
        let text = message.content;
        text = text.replace(/[^0-9\s]/g, "");
        const arr = text.split(" ");
        arr.forEach((id) => {
            if (discord_client.users.cache.find((user) => user.id === id) !== undefined) {
                console.log(`Tag : ${discord_client.users.cache.find((user) => user.id === id)?.tag}`);
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
        message.attachments.each((attachment_item) => console.log(`Attached file : ${attachment_item.attachment}`));
        if (message.embeds.length > 0) {
            message.embeds.forEach((embed) => console.log(`\nEmbed : ${JSON.stringify(embed.toJSON())}\n`));
        }
    }
    if (message.author.bot) {
        return;
    }
});
discord_client.login(discord_token);
