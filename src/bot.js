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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const dotenv_1 = __importDefault(require("dotenv"));
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
const discord_token = process.env.DISCORDJS_BOT_TOKEN;
const client_id = process.env.DISCORDJS_BOT_ID;
const guild_id = process.env.GUILD_ID_PLAYGROUND;
const emplois_sid_link = process.env.EMPLOIS_SID;
const emplois_ia_link = process.env.EMPLOIS_IA;
const mega_link = process.env.MEGA_DRIVE_SID;
const rest = new rest_1.REST({ version: '9' }).setToken(discord_token);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Started refreshing application (/) commands.');
        yield rest.put(
        // This is for testing purposes
        // Routes.applicationGuildCommands(client_id, guild_id),
        // This is for production
        v9_1.Routes.applicationCommands(client_id), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
}))();
// When the client is ready, run this code (only once)
discord_client.once("ready", () => {
    var _a;
    console.log(`${(_a = discord_client.user) === null || _a === void 0 ? void 0 : _a.tag} has logged in`);
});
// Slash (/) commands handling
discord_client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName, options } = interaction;
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
        const attachment = new discord_js_1.MessageAttachment(emplois_sid_link, 'emplois_sid.png');
        const embed = new discord_js_1.MessageEmbed()
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
        const attachment = new discord_js_1.MessageAttachment(emplois_ia_link, 'emplois_ia.png');
        const embed = new discord_js_1.MessageEmbed()
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
        const embed = new discord_js_1.MessageEmbed()
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
        const embed = new discord_js_1.MessageEmbed()
            .setTitle("Bot Source Code")
            .setDescription(`The bot source code is available on Github at this address : https://github.com/Drayano/Discord-Bot`);
        yield interaction.reply({ embeds: [embed] });
    }
    // spongebob command
    else if (commandName === "spongebob") {
        // Check if the interaction is happening in a discord server (to get channel.name)
        if (interaction.inGuild()) {
            console.log(`${interaction.user.tag} in ${(_j = interaction.channel) === null || _j === void 0 ? void 0 : _j.name} in ${(_k = interaction.guild) === null || _k === void 0 ? void 0 : _k.name} : used the ${commandName} command with '${(_m = (_l = options.get("input")) === null || _l === void 0 ? void 0 : _l.value) === null || _m === void 0 ? void 0 : _m.toString()}'`);
        }
        // Interaction happening in a DM
        else {
            console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command with '${(_p = (_o = options.get("input")) === null || _o === void 0 ? void 0 : _o.value) === null || _p === void 0 ? void 0 : _p.toString()}'`);
        }
        let text = "";
        let spongebob = "";
        if (((_r = (_q = options.get("input")) === null || _q === void 0 ? void 0 : _q.value) === null || _r === void 0 ? void 0 : _r.toString().length) !== undefined) {
            for (let i = 0; i < ((_t = (_s = options.get("input")) === null || _s === void 0 ? void 0 : _s.value) === null || _t === void 0 ? void 0 : _t.toString().length); i++) {
                text = (_v = (_u = options.get("input")) === null || _u === void 0 ? void 0 : _u.value) === null || _v === void 0 ? void 0 : _v.toString();
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
        yield interaction.reply(spongebob);
    }
}));
// Messages handling
discord_client.on("messageCreate", (message) => {
    var _a;
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
        console.log(`${message.author.tag} in #${message.channel.name} in ${(_a = message.guild) === null || _a === void 0 ? void 0 : _a.name} : ${message.content}`);
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
// TODO : Add Spongebob case through a command
// TODO : Add more commands
// TODO : Restrict some commands to relevant channels in Yugen
// TODO : No restriction in Playground
