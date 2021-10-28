"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents, MessageAttachment, MessageEmbed } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
// List of commands
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
    }
];
const discord_token = process.env.DISCORDJS_BOT_TOKEN;
const client_id = process.env.DISCORDJS_BOT_ID;
const guild_id = process.env.GUILD_ID_PLAYGROUND;
const emplois_sid_link = process.env.EMPLOIS_SID;
const emplois_ia_link = process.env.EMPLOIS_IA;
const mega_link = process.env.MEGA_DRIVE_SID;
const rest = new REST({ version: '9' }).setToken(discord_token);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Started refreshing application (/) commands.');
        yield rest.put(
        // This is for testing purposes
        // Routes.applicationGuildCommands(client_id, guild_id),
        // This is for production
        Routes.applicationCommands(client_id), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
}))();
// When the client is ready, run this code (only once)
client.once("ready", () => {
    console.log(`${client.user.tag} has logged in`);
});
// Slash (/) commands handling
client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName } = interaction;
    // emplois_sid command
    if (commandName === "emplois_sid") {
        // Check if the interaction is happening in a discord server (to get channel.name)
        if (interaction.inGuild()) {
            console.log(`${interaction.user.tag} in ${(_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.name} in ${(_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.name} : used the ${commandName} command`);
        }
        // Interaction happening in a DM
        else {
            console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command`);
        }
        const attachment = new MessageAttachment(emplois_sid_link, 'emplois_sid.png');
        const embed = new MessageEmbed()
            .setTitle("Emplois du temps SID")
            .setImage('attachment://emplois_sid.png');
        yield interaction.reply({ embeds: [embed], files: [attachment] });
    }
    else if (commandName === "emplois_ia") {
        // Check if the interaction is happening in a discord server (to get channel.name)
        if (interaction.inGuild()) {
            console.log(`${interaction.user.tag} in ${(_c = interaction.channel) === null || _c === void 0 ? void 0 : _c.name} in ${(_d = interaction.guild) === null || _d === void 0 ? void 0 : _d.name} : used the ${commandName} command`);
        }
        // Interaction happening in a DM
        else {
            console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command`);
        }
        const attachment = new MessageAttachment(emplois_ia_link, 'emplois_ia.png');
        const embed = new MessageEmbed()
            .setTitle("Emplois du temps IA")
            .setImage('attachment://emplois_ia.png');
        yield interaction.reply({ embeds: [embed], files: [attachment] });
    }
    else if (commandName === "drive") {
        // Check if the interaction is happening in a discord server (to get channel.name)
        if (interaction.inGuild()) {
            console.log(`${interaction.user.tag} in ${(_e = interaction.channel) === null || _e === void 0 ? void 0 : _e.name} in ${(_f = interaction.guild) === null || _f === void 0 ? void 0 : _f.name} : used the ${commandName} command`);
        }
        // Interaction happening in a DM
        else {
            console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command`);
        }
        const embed = new MessageEmbed()
            .setTitle("Mega Drive")
            .setDescription(`Lien du Mega Drive - SID : ${mega_link}`);
        yield interaction.reply({ embeds: [embed] });
    }
    else if (commandName === "code") {
        // Check if the interaction is happening in a discord server (to get channel.name)
        if (interaction.inGuild()) {
            console.log(`${interaction.user.tag} in ${(_g = interaction.channel) === null || _g === void 0 ? void 0 : _g.name} in ${(_h = interaction.guild) === null || _h === void 0 ? void 0 : _h.name} : used the ${commandName} command`);
        }
        // Interaction happening in a DM
        else {
            console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command`);
        }
        const embed = new MessageEmbed()
            .setTitle("Bot Source Code")
            .setDescription(`The bot source code is available on Github at this address : https://github.com/Drayano/Discord-Bot`);
        yield interaction.reply({ embeds: [embed] });
    }
}));
client.on("messageCreate", (message) => {
    var _a;
    // Check if the message is sent in a discord DM
    if (message.channel.type === "DM") {
        console.log(`${message.author.tag} in a Direct Message : ${message.content}`);
    }
    // The message is being sent in a discord server so we can get (channel.name)
    else {
        console.log(`${message.author.tag} in #${message.channel.name} in ${(_a = message.guild) === null || _a === void 0 ? void 0 : _a.name} : ${message.content}`);
    }
    // Don't reply to ourselves or other bots
    if (message.author.bot) {
        return;
    }
});
// Login to Discord with the token
client.login(discord_token);
// TODO : Fix test bot so I can use both of them at the same time (commands conflict)
// TODO : Add Spongebob case through a command
// TODO : Add more commands
// TODO : Restrict some commands to relevant channels in Yugen
// TODO : No restriction in Playground
