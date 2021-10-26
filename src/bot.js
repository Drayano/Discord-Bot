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
const client_id = process.env.DISCORDJS_BOT_ID;
const guild_id = process.env.GUILD_ID_PLAYGROUND;
const rest = new REST({ version: '9' }).setToken(process.env.DISCORDJS_BOT_TOKEN);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Started refreshing application (/) commands.');
        yield rest.put(
        // This is for testing purposes
        // Routes.applicationGuildCommands(client_id, guild_id),
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
client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName } = interaction;
    if (commandName === "emplois_sid") {
        const attachment = new MessageAttachment(process.env.EMPLOIS_SID, 'emplois_sid.png');
        const embed = new MessageEmbed()
            .setTitle("Emplois du temps SID")
            .setImage('attachment://emplois_sid.png');
        yield interaction.reply({ embeds: [embed], files: [attachment] });
    }
    else if (commandName === "emplois_ia") {
        const attachment = new MessageAttachment(process.env.EMPLOIS_IA, 'emplois_ia.png');
        const embed = new MessageEmbed()
            .setTitle("Emplois du temps IA")
            .setImage('attachment://emplois_ia.png');
        yield interaction.reply({ embeds: [embed], files: [attachment] });
    }
    else if (commandName === "drive") {
        const embed = new MessageEmbed()
            .setTitle("Mega Drive")
            .setDescription(`Lien du Mega Drive - SID : ${process.env.MEGA_DRIVE_SID}`);
        yield interaction.reply({ embeds: [embed] });
    }
    else if (commandName === "code") {
        const embed = new MessageEmbed()
            .setTitle("Bot Source Code")
            .setDescription(`The bot source code is available on Github at this address : https://github.com/Drayano/Discord-Bot`);
        yield interaction.reply({ embeds: [embed] });
    }
}));
client.on("messageCreate", (message) => {
    // Don't reply to ourselves or other bots
    if (message.author.bot) {
        return;
    }
    console.log(`${message.author.tag} in ${message.channel} : ${message.content}`);
});
// Login to Discord with the token
client.login(process.env.DISCORDJS_BOT_TOKEN);
