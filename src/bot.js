"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const dotenv_1 = __importDefault(require("dotenv"));
const https = __importStar(require("https"));
const help_1 = require("./Commands/help");
const emplois_sid_1 = require("./Commands/emplois_sid");
const emplois_ia_1 = require("./Commands/emplois_ia");
const drive_1 = require("./Commands/drive");
const code_1 = require("./Commands/code");
const spongebob_1 = require("./Commands/spongebob");
dotenv_1.default.config();
const discord_client = new discord_js_1.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        discord_js_1.Intents.FLAGS.DIRECT_MESSAGES,
        discord_js_1.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
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
                type: 3 // String
            }
        ]
    }
];
const discord_token = process.env.DISCORDJS_BOT_TOKEN;
const client_id = process.env.DISCORDJS_BOT_ID;
const guild_id = process.env.GUILD_ID_PLAYGROUND;
const emplois_sid_link = process.env.EMPLOIS_SID;
const emplois_ia_link = process.env.EMPLOIS_IA;
const mega_link = process.env.MEGA_DRIVE_SID;
const spongebob_gif = process.env.SPONGEBOB_GIF;
const rest = new rest_1.REST({ version: '9' }).setToken(discord_token);
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
        // This is for testing purposes
        // Routes.applicationGuildCommands(client_id, guild_id),
        // This is for production
        v9_1.Routes.applicationCommands(client_id), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
})();
// When the client is ready, run this code (only once)
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
// Slash (/) commands handling
discord_client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName } = interaction;
    // help command
    if (commandName === "help") {
        (0, help_1.command_help)(discord_client, interaction);
    }
    // emplois_sid command
    else if (commandName === "emplois_sid") {
        (0, emplois_sid_1.command_emplois_sid)(interaction, emplois_sid_link);
    }
    // emplois_ia command
    else if (commandName === "emplois_ia") {
        (0, emplois_ia_1.command_emplois_ia)(interaction, emplois_ia_link);
    }
    else if (commandName === "drive") {
        (0, drive_1.command_drive)(interaction, mega_link);
    }
    else if (commandName === "code") {
        (0, code_1.command_code)(interaction);
    }
    // spongebob command
    else if (commandName === "spongebob") {
        (0, spongebob_1.command_spongebob)(interaction, spongebob_gif);
    }
});
// Messages handling
discord_client.on("messageCreate", (message) => {
    // Check if the message is sent in a discord DM
    if (message.channel.type === "DM") {
        console.log(`${message.author.tag} in a Direct Message : ${message.content}`);
        message.attachments.each(attachment_item => console.log(`Attached file : ${attachment_item.attachment}`));
        // Print embeds if there are any
        if (message.embeds.length > 0) {
            message.embeds.forEach(embed => console.log(`\nEmbed : ${JSON.stringify(embed.toJSON())}\n`));
        }
    }
    // The message is being sent in a discord server so we can get (channel.name)
    else {
        console.log(`${message.author.tag} in #${message.channel.name} in ${message.guild?.name} : ${message.content}`);
        // Get the mentions IDs and use them to find out the named of who's being mentioned
        let text = message.content;
        text = text.replace(/[^0-9\s]/g, "");
        let arr = text.split(" ");
        arr.forEach(id => {
            if (discord_client.users.cache.find(user => user.id === id) !== undefined) {
                console.log(`Tag : ${discord_client.users.cache.find(user => user.id === id)?.tag}`);
            }
        });
        // Get the emotes IDs and use them to find out the emote URL
        let emoji = message.content;
        emoji = emoji.replace(/[^0-9\s]/g, "");
        let arr1 = emoji.split(" ");
        arr1.forEach(id => {
            https.get(`https://cdn.discordapp.com/emojis/${id}.png`, (res) => {
                const { statusCode } = res;
                if (statusCode === 200) { // HTTP 200 = OK
                    console.log(`Emote : https://cdn.discordapp.com/emojis/${id}.png`);
                }
            });
        });
        // Get Attachement files if there are any
        message.attachments.each(attachment_item => console.log(`Attached file : ${attachment_item.attachment}`));
        // Print embeds if there are any
        if (message.embeds.length > 0) {
            message.embeds.forEach((embed) => console.log(`\nEmbed : ${JSON.stringify(embed.toJSON())}\n`));
        }
    }
    // Don't reply to ourselves or other bots
    if (message.author.bot) {
        return;
    }
});
// Login to Discord with the token
discord_client.login(discord_token);
// TODO : Add more commands
// TODO : Restrict some commands to relevant channels in Yugen
// TODO : No restriction in Playground
