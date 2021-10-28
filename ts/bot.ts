import { Client, Intents, Interaction, Message, MessageAttachment, MessageEmbed } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import dotenv from "dotenv";

import * as http from 'http';
import * as https from 'https'; 

dotenv.config();

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
    description: string,
    options?: { name: string, description: string, type: number, required?: boolean }[]
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

const discord_token: string = process.env.DISCORDJS_TESTBOT_TOKEN;
const client_id: string = process.env.DISCORDJS_TESTBOT_ID;
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
			Routes.applicationGuildCommands(client_id, guild_id),
            // This is for production
            // Routes.applicationCommands(client_id),
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

    discord_client.user?.setPresence({
        status: "online",  // You can show online, idle....
        activities: [{
            type: "WATCHING",
            name: "USTO"
        }]
    });

    console.log(`${discord_client.user?.tag} status set to "WATCHING USTO"`);
});

// Slash (/) commands handling
discord_client.on("interactionCreate", async (interaction: Interaction) => {
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

        const attachment = new MessageAttachment(emplois_sid_link, 'emplois_sid.png');
        const embed = new MessageEmbed()
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

        let text: string = "";
        let spongebob: string = "";

        if (options.get("input")?.value?.toString().length !== undefined) {
            for (let i = 0; i < options.get("input")?.value?.toString().length!; i++) {
                text = options.get("input")?.value?.toString()!;
                
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
discord_client.on("messageCreate", (message: Message) => {
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
            })   
        });
        
        
        // Get Attachement files if there are any
        message.attachments.each(attachment_item => console.log(`Attached file : ${attachment_item.attachment}`));

        // Print embeds if there are any
        if (message.embeds.length > 0) {
            message.embeds.forEach((embed: MessageEmbed) => console.log(`\nEmbed : ${JSON.stringify(embed.toJSON())}\n`));
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