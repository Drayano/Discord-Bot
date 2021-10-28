import { Client, Intents, Interaction, Message, MessageAttachment, MessageEmbed } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9"

require("dotenv").config();

const discord_client: Client = new Client({ 
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

// List of commands
interface CommandInterface {
    name: string,
    description: string
}

const commands: CommandInterface[] = [
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

const discord_token: string = process.env.DISCORDJS_BOT_TOKEN;
const client_id: string = process.env.DISCORDJS_BOT_ID;
const guild_id: string = process.env.GUILD_ID_PLAYGROUND;
const emplois_sid_link: string = process.env.EMPLOIS_SID;
const emplois_ia_link: string = process.env.EMPLOIS_IA;
const mega_link: string = process.env.MEGA_DRIVE_SID;

const rest: REST = new REST({ version: '9' }).setToken(discord_token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
            // This is for testing purposes
			// Routes.applicationGuildCommands(client_id, guild_id),
            // This is for production
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
discord_client.once("ready", () => {
	console.log(`${discord_client.user?.tag} has logged in`);
});

// Slash (/) commands handling
discord_client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    const { commandName } = interaction;

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

        const attachment = new MessageAttachment(emplois_sid_link, 'emplois_sid.png');
        const embed = new MessageEmbed()
            .setTitle("Emplois du temps SID")
            .setImage('attachment://emplois_sid.png');

        await interaction.reply({ embeds: [embed], files: [attachment] });
    }

    else if (commandName === "emplois_ia") {
        // Check if the interaction is happening in a discord server (to get channel.name)
        if (interaction.inGuild()) {
            console.log(`${interaction.user.tag} in ${interaction.channel?.name} in ${interaction.guild?.name} : used the ${commandName} command`);
        }

        // Interaction happening in a DM
        else {
            console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command`);
        }

        const attachment = new MessageAttachment(emplois_ia_link, 'emplois_ia.png');
        const embed = new MessageEmbed()
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

        const embed = new MessageEmbed()
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

        const embed = new MessageEmbed()
            .setTitle("Bot Source Code")
            .setDescription(`The bot source code is available on Github at this address : https://github.com/Drayano/Discord-Bot`);

        await interaction.reply({ embeds: [embed] });
    }
});

// Messages handling
discord_client.on("messageCreate", (message: Message) => {
    // Check if the message is sent in a discord DM
    if (message.channel.type === "DM") {
        console.log(`${message.author.tag} in a Direct Message : ${message.content}`);
        message.attachments.each(attachment_item => console.log(`Attached file : ${attachment_item.attachment}`));

        // Print embeds if there are any
        if (message.embeds.length > 0) {
            message.embeds.forEach(embed => console.log(`\nEmbed : ${embed.toJSON()}\n`));
        }
    }

    // The message is being sent in a discord server so we can get (channel.name)
    else {
        console.log(`${message.author.tag} in #${message.channel.name} in ${message.guild?.name} : ${message.content}`);
        message.attachments.each(attachment_item => console.log(`Attached file : ${attachment_item.attachment}`));

        // Print embeds if there are any
        if (message.embeds.length > 0) {
            message.embeds.forEach(embed => console.log(`\nEmbed : ${embed.toJSON()}\n`));
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