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
const discord_token = process.env.DISCORDJS_TESTBOT_TOKEN;
const client_id = process.env.DISCORDJS_TESTBOT_ID;
const guild_id = process.env.GUILD_ID_PLAYGROUND;
const emplois_sid_link = process.env.EMPLOIS_SID;
const emplois_ia_link = process.env.EMPLOIS_IA;
const mega_link = process.env.MEGA_DRIVE_SID;
const rest = new rest_1.REST({ version: '9' }).setToken(discord_token);
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
        // This is for testing purposes
        v9_1.Routes.applicationGuildCommands(client_id, guild_id), 
        // This is for production
        // Routes.applicationCommands(client_id),
        { body: commands });
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
    const { commandName, options } = interaction;
    // emplois_sid command
    if (commandName === "emplois_sid") {
        // Check if the interaction is happening in a discord server (to get channel.name)
        if (interaction.inGuild()) {
            console.log(`${interaction.user.tag} in ${interaction.channel?.name} in ${interaction.guild?.name} : used the ${commandName} command`);
        }
        // Interaction happening in a DM
        else {
            console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command`);
        }
        const attachment = new discord_js_1.MessageAttachment(emplois_sid_link, 'emplois_sid.png');
        const embed = new discord_js_1.MessageEmbed()
            .setTitle("Emplois du temps SID")
            .setImage('attachment://emplois_sid.png');
        await interaction.reply({ embeds: [embed], files: [attachment] });
    }
    // emplois_ia command
    else if (commandName === "emplois_ia") {
        // Check if the interaction is happening in a discord server (to get channel.name)
        if (interaction.inGuild()) {
            console.log(`${interaction.user.tag} in ${interaction.channel?.name} in ${interaction.guild?.name} : used the ${commandName} command`);
        }
        // Interaction happening in a DM
        else {
            console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command`);
        }
        const attachment = new discord_js_1.MessageAttachment(emplois_ia_link, 'emplois_ia.png');
        const embed = new discord_js_1.MessageEmbed()
            .setTitle("Emplois du temps IA")
            .setImage('attachment://emplois_ia.png');
        await interaction.reply({ embeds: [embed], files: [attachment] });
    }
    else if (commandName === "drive") {
        // Check if the interaction is happening in a discord server (to get channel.name)
        if (interaction.inGuild()) {
            console.log(`${interaction.user.tag} in ${interaction.channel?.name} in ${interaction.guild?.name} : used the ${commandName} command`);
        }
        // Interaction happening in a DM
        else {
            console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command`);
        }
        const embed = new discord_js_1.MessageEmbed()
            .setTitle("Mega Drive")
            .setDescription(`Lien du Mega Drive - SID : ${mega_link}`);
        await interaction.reply({ embeds: [embed] });
    }
    else if (commandName === "code") {
        // Check if the interaction is happening in a discord server (to get channel.name)
        if (interaction.inGuild()) {
            console.log(`${interaction.user.tag} in ${interaction.channel?.name} in ${interaction.guild?.name} : used the ${commandName} command`);
        }
        // Interaction happening in a DM
        else {
            console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command`);
        }
        const embed = new discord_js_1.MessageEmbed()
            .setTitle("Bot Source Code")
            .setDescription(`The bot source code is available on Github at this address : https://github.com/Drayano/Discord-Bot`);
        await interaction.reply({ embeds: [embed] });
    }
    // spongebob command
    else if (commandName === "spongebob") {
        // Check if the interaction is happening in a discord server (to get channel.name)
        if (interaction.inGuild()) {
            console.log(`${interaction.user.tag} in ${interaction.channel?.name} in ${interaction.guild?.name} : used the ${commandName} command with '${options.get("input")?.value?.toString()}'`);
        }
        // Interaction happening in a DM
        else {
            console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command with '${options.get("input")?.value?.toString()}'`);
        }
        let text = "";
        let spongebob = "";
        if (options.get("input")?.value?.toString().length !== undefined) {
            for (let i = 0; i < options.get("input")?.value?.toString().length; i++) {
                text = options.get("input")?.value?.toString();
                if (i % 2 === 0) {
                    spongebob += text.charAt(i).toLowerCase();
                }
                else if (i % 2 === 1) {
                    spongebob += text.charAt(i).toUpperCase();
                }
            }
        }
        else {
            console.log("Error on the spongebob command, no text provided !");
            spongebob = "No text provided";
        }
        await interaction.reply(spongebob);
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
