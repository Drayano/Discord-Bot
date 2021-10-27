import { Interaction, Message } from "discord.js";

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

const discord_token = process.env.DISCORDJS_BOT_TOKEN;
const client_id = process.env.DISCORDJS_BOT_ID;
const guild_id = process.env.GUILD_ID_PLAYGROUND;
const emplois_sid_link = process.env.EMPLOIS_SID;
const emplois_ia_link = process.env.EMPLOIS_IA;
const mega_link = process.env.MEGA_DRIVE_SID;

const rest = new REST({ version: '9' }).setToken(discord_token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
            // This is for testing purposes
			// Routes.applicationGuildCommands(client_id, guild_id),
            Routes.applicationCommands(client_id),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	}
    
    catch (error) {
		console.error(error);
	}
})();

// When the client is ready, run this code (only once)
client.once("ready", () => {
	console.log(`${client.user.tag} has logged in`);
});

client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    const { commandName } = interaction;

    if (commandName === "emplois_sid") {
        const attachment = new MessageAttachment(emplois_sid_link, 'emplois_sid.png');
        const embed = new MessageEmbed()
            .setTitle("Emplois du temps SID")
            .setImage('attachment://emplois_sid.png');

        await interaction.reply({ embeds: [embed], files: [attachment] });
    }

    else if (commandName === "emplois_ia") {
        const attachment = new MessageAttachment(emplois_ia_link, 'emplois_ia.png');
        const embed = new MessageEmbed()
            .setTitle("Emplois du temps IA")
            .setImage('attachment://emplois_ia.png');

        await interaction.reply({ embeds: [embed], files: [attachment] });
    }

    else if (commandName === "drive") {
        const embed = new MessageEmbed()
            .setTitle("Mega Drive")
            .setDescription(`Lien du Mega Drive - SID : ${mega_link}`);

        await interaction.reply({ embeds: [embed] });
    }

    else if (commandName === "code") {
        const embed = new MessageEmbed()
            .setTitle("Bot Source Code")
            .setDescription(`The bot source code is available on Github at this address : https://github.com/Drayano/Discord-Bot`);

        await interaction.reply({ embeds: [embed] });
    }
});

client.on("messageCreate", (message: Message) => {
    console.log(`${message.author.tag} in ${message.channel} in ${message.guild} : ${message.content}`);

    // Don't reply to ourselves or other bots
    if (message.author.bot) {
        return;
    }
});

// Login to Discord with the token
client.login(discord_token);

