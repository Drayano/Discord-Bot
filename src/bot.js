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
    }
];
const discord_token = process.env.DISCORDJS_BOT_TOKEN;
const client_id = process.env.DISCORDJS_BOT_ID;
const guild_id = process.env.GUILD_ID_PLAYGROUND;
const emplois_sid_link = process.env.EMPLOIS_SID;
const emplois_ia_link = process.env.EMPLOIS_IA;
const mega_link = process.env.MEGA_DRIVE_SID;
const spongebob_gif = process.env.SPONGEBOB_GIF;
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
                name: "USTO"
            }]
    });
    console.log(`${discord_client.user?.tag} status set to "WATCHING USTO"`);
});
discord_client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName } = interaction;
    if (commandName === "help") {
        command_help(discord_client, interaction);
    }
    else if (commandName === "emplois_sid") {
        command_emplois_sid(interaction, emplois_sid_link);
    }
    else if (commandName === "emplois_ia") {
        command_emplois_ia(interaction, emplois_ia_link);
    }
    else if (commandName === "drive") {
        command_drive(interaction, mega_link);
    }
    else if (commandName === "code") {
        command_code(interaction);
    }
    else if (commandName === "spongebob") {
        command_spongebob(interaction, spongebob_gif);
    }
    else if (commandName === "memes") {
        command_memes(interaction);
    }
    else if (commandName === "xkcd") {
        command_xkcd(interaction);
    }
});
discord_client.on("messageCreate", (message) => {
    if (message.channel.type === "DM") {
        console.log(`${message.author.tag} in a Direct Message : ${message.content}`);
        let text = message.content;
        text = text.replace(/[^0-9\s]/g, "");
        let arr = text.split(" ");
        arr.forEach((id) => {
            if (discord_client.users.cache.find((user) => user.id === id) !== undefined) {
                console.log(`Tag : ${discord_client.users.cache.find((user) => user.id === id)?.tag}`);
            }
        });
        let emoji = message.content;
        emoji = emoji.replace(/[^0-9\s]/g, "");
        let arr1 = emoji.split(" ");
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
        let arr = text.split(" ");
        arr.forEach((id) => {
            if (discord_client.users.cache.find((user) => user.id === id) !== undefined) {
                console.log(`Tag : ${discord_client.users.cache.find((user) => user.id === id)?.tag}`);
            }
        });
        let emoji = message.content;
        emoji = emoji.replace(/[^0-9\s]/g, "");
        let arr1 = emoji.split(" ");
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
