import { Client, Intents } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import dotenv from "dotenv";
import * as https from 'https';
import { command_help } from "./Commands/help.js";
import { command_emplois_sid } from "./Commands/emplois_sid.js";
import { command_emplois_ia } from "./Commands/emplois_ia.js";
import { command_drive } from "./Commands/drive.js";
import { command_code } from "./Commands/code.js";
import { command_spongebob } from "./Commands/spongebob.js";
import { command_memes } from "./Commands/memes.js";
import { command_xkcd } from "./Commands/xkcd.js";
import { command_translate } from "./Commands/translate.js";
dotenv.config();
const discord_client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
    ],
    partials: [
        "CHANNEL"
    ]
});
const commands = [
    {
        name: "help",
        description: "Shows the list of commands available"
    },
    {
        name: "emplois_sid",
        description: "Emplois du temps SID"
    },
    {
        name: "emplois_ia",
        description: "Emplois du temps IA"
    },
    {
        name: "drive",
        description: "Drive Links"
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
const discord_token = process.env.DISCORDJS_BOT_TOKEN;
const client_id = process.env.DISCORDJS_BOT_ID;
const playground_guild_id = process.env.GUILD_ID_PLAYGROUND;
const yugen_guild = process.env.GUILD_ID_YUGEN;
const yugen_etudes = process.env.YUGEN_CHANNEL_ID_ETUDES;
const yugen_resources = process.env.YUGEN_CHANNEL_ID_RESOURCES;
const yugen_memes = process.env.YUGEN_CHANNEL_ID_MEMES;
const yugen_xkcd = process.env.YUGEN_CHANNEL_ID_XKCD;
const emplois_sid_link = process.env.EMPLOIS_SID;
const emplois_ia_link = process.env.EMPLOIS_IA;
const mega_link = process.env.MEGA_DRIVE_SID;
const study_channel_error = "Yugen Etudes, Yugen Resources, Playground Server";
const meme_channel_error = "Yugen Memes, Playground Server";
const xkcd_channel_error = "Yugen XKCD, Playground Server";
const rest = new REST({ version: '9' }).setToken(discord_token);
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(client_id), { body: commands });
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
                type: "WATCHING",
                name: "GERMANY"
            }]
    });
    console.log(`${discord_client.user?.tag} status set to "WATCHING GERMANY"`);
});
discord_client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName, options } = interaction;
    if (interaction.inGuild() && interaction.channel?.isText() && interaction.channel.type === "GUILD_TEXT") {
        console.log(`${interaction.user.tag} in ${interaction.channel?.name} in ${interaction.guild?.name} : used the ${commandName} command`);
    }
    else {
        console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command`);
    }
    if (commandName === "help") {
        command_help(discord_client, interaction);
    }
    else if (commandName === "emplois_sid") {
        if (interaction.channel?.id === yugen_etudes || interaction.channel?.id === yugen_resources || interaction.guild?.id === playground_guild_id) {
            command_emplois_sid(interaction, emplois_sid_link);
        }
        else {
            console.log(`ERROR : Cannot use this command in that channel.\nAUTHORIZED CHANNELS : ${study_channel_error}`);
            if (interaction.guild?.id === yugen_guild) {
                interaction.reply(`You can't use this command in this Channel, try posting it in ${interaction.guild?.channels.cache.get(yugen_etudes)?.toString()} or ${interaction.guild?.channels.cache.get(yugen_resources)?.toString()}`);
            }
            else {
                interaction.reply(`You can't use this command here`);
            }
        }
    }
    else if (commandName === "emplois_ia") {
        if (interaction.channel?.id === yugen_etudes || interaction.channel?.id === yugen_resources || interaction.guild?.id === playground_guild_id) {
            command_emplois_ia(interaction, emplois_ia_link);
        }
        else {
            console.log(`ERROR : Cannot use this command in that channel.\nAUTHORIZED CHANNELS : ${study_channel_error}`);
            if (interaction.guild?.id === yugen_guild) {
                interaction.reply(`You can't use this command in this Channel, try posting it in ${interaction.guild?.channels.cache.get(yugen_etudes)?.toString()} or ${interaction.guild?.channels.cache.get(yugen_resources)?.toString()}`);
            }
            else {
                interaction.reply(`You can't use this command here`);
            }
        }
    }
    else if (commandName === "drive") {
        if (interaction.channel?.id === yugen_etudes || interaction.channel?.id === yugen_resources || interaction.guild?.id === playground_guild_id) {
            command_drive(interaction, mega_link);
        }
        else {
            console.log(`ERROR : Cannot use this command in that channel.\nAUTHORIZED CHANNELS : ${study_channel_error}`);
            if (interaction.guild?.id === yugen_guild) {
                interaction.reply(`You can't use this command in this Channel, try posting it in ${interaction.guild?.channels.cache.get(yugen_etudes)?.toString()} or ${interaction.guild?.channels.cache.get(yugen_resources)?.toString()}`);
            }
            else {
                interaction.reply(`You can't use this command here`);
            }
        }
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
        command_translate(interaction);
    }
});
discord_client.on("messageCreate", (message) => {
    if (message.channel.type === "DM") {
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
