import { Client, Intents, Interaction, Message, MessageAttachment, MessageEmbed, User } from "discord.js";
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
    },
    {
        name: "memes",
        description: "Make memes",
        options: [
            {
                name: "input",
                description: "Choose a meme template",
                required: true,
                type: 3 // String
            },
            {
                name: "first_line",
                description: "First Meme Line",
                required: true,
                type: 3 // String
            },
            {
                name: "second_line",
                description: "Second Meme Line",
                required: true,
                type: 3 // String
            }
        ]
    },
    {
        name: "xkcd",
        description: "Post a random XKCD"
    }
];

const discord_token: string = process.env.DISCORDJS_BOT_TOKEN;
const client_id: string = process.env.DISCORDJS_BOT_ID;
const playground_guild_id: string = process.env.GUILD_ID_PLAYGROUND;
const yugen_etudes: string = process.env.YUGEN_CHANNEL_ID_ETUDES;
const yugen_resources: string = process.env.YUGEN_CHANNEL_ID_RESOURCES;
const yugen_memes: string = process.env.YUGEN_CHANNEL_ID_MEMES;
const yugen_xkcd: string = process.env.YUGEN_CHANNEL_ID_XKCD;
const emplois_sid_link: string = process.env.EMPLOIS_SID;
const emplois_ia_link: string = process.env.EMPLOIS_IA;
const mega_link: string = process.env.MEGA_DRIVE_SID;

const rest: REST = new REST({ version: '9' }).setToken(discord_token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
            // This is for testing purposes
			// Routes.applicationGuildCommands(client_id, playground_guild_id),
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

    // Check if the interaction is happening in a discord server,
    // If the Channel is a Text Channel (i.e : not a voice, thread or news channel) (to get channel.name)
    if (interaction.inGuild() && interaction.channel?.isText() && interaction.channel.type === "GUILD_TEXT") {
        console.log(`${interaction.user.tag} in ${interaction.channel?.name} in ${interaction.guild?.name} : used the ${commandName} command`);
    }

    // Interaction happening in a DM
    else {
        console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command`);
    }

    // help command
    if (commandName === "help") {
        command_help(discord_client, interaction);
    }

    // emplois_sid command
    else if (commandName === "emplois_sid") {
        if (interaction.channel?.id === yugen_etudes || interaction.channel?.id === yugen_resources || interaction.guild?.id === playground_guild_id) {
            command_emplois_sid(interaction, emplois_sid_link);
        }

        else {
            console.log(`ERROR : Cannot use this command in that channel.\nAUTHORIZED CHANNELS : Yugen Etudes, Yugen Resources, Playground Server`);
            interaction.reply(`You can't use this command in this Channel, try posting it in ${interaction.guild?.channels.cache.get(yugen_etudes)?.toString()} or ${interaction.guild?.channels.cache.get(yugen_resources)?.toString()}`);
        }
    }

    // emplois_ia command
    else if (commandName === "emplois_ia") {
        if (interaction.channel?.id === yugen_etudes || interaction.channel?.id === yugen_resources || interaction.guild?.id === playground_guild_id) {
            command_emplois_ia(interaction, emplois_ia_link);
        }

        else {
            console.log(`ERROR : Cannot use this command in that channel.\nAUTHORIZED CHANNELS : Yugen Etudes, Yugen Resources, Playground Server`);
            interaction.reply(`You can't use this command in this Channel, try posting it in ${interaction.guild?.channels.cache.get(yugen_etudes)?.toString()} or ${interaction.guild?.channels.cache.get(yugen_resources)?.toString()}`);
        }
    }

    // drive command
    else if (commandName === "drive") {
        if (interaction.channel?.id === yugen_etudes || interaction.channel?.id === yugen_resources || interaction.guild?.id === playground_guild_id) {
            command_drive(interaction, mega_link);
        }

        else {
            console.log(`ERROR : Cannot use this command in that channel.\nAUTHORIZED CHANNELS : Yugen Etudes, Yugen Resources, Playground Server`);
            interaction.reply(`You can't use this command in this Channel, try posting it in ${interaction.guild?.channels.cache.get(yugen_etudes)?.toString()} or ${interaction.guild?.channels.cache.get(yugen_resources)?.toString()}`);
        }
    }

    // code command
    else if (commandName === "code") {
        command_code(interaction);
    }

    // spongebob command
    else if (commandName === "spongebob") {
        console.log(`with '${options.get("input")?.value?.toString()}'`);
        command_spongebob(interaction);
    }

    // memes command
    else if (commandName === "memes") {
        console.log(`with '${options.get("input")?.value?.toString()}' '${options.get("first_line")?.value?.toString()}' '${options.get("second_line")?.value?.toString()}'`);
        if (!interaction.inGuild() || interaction.channel?.id === yugen_memes || interaction.guild?.id === playground_guild_id) {
            command_memes(interaction);
        }

        else {
            console.log(`ERROR : Cannot use this command in that channel.\nAUTHORIZED CHANNELS : Yugen Memes, Playground Server`);
            interaction.reply(`You can't use this command in this Channel, try posting it in ${interaction.guild?.channels.cache.get(yugen_memes)?.toString()}`);
        }
    }

    // xkcd command
    else if (commandName === "xkcd") {
        if (!interaction.inGuild() || interaction.channel?.id === yugen_xkcd || interaction.guild?.id === playground_guild_id) {
            command_xkcd(interaction);
        }

        else {
            console.log(`ERROR : Cannot use this command in that channel.\nAUTHORIZED CHANNELS : Yugen XKCD, Playground Server`);
            interaction.reply(`You can't use this command in this Channel, try posting it in ${interaction.guild?.channels.cache.get(yugen_xkcd)?.toString()}`);
        }
    }
});

// Messages handling
discord_client.on("messageCreate", (message: Message) => {
    // Check if the message is sent in a discord DM
    if (message.channel.type === "DM") {
        console.log(`${message.author.tag} in a Direct Message : ${message.content}`);
        
        // Get the mentions IDs and use them to find out the named of who's being mentioned
        let text: string = message.content;
        text = text.replace(/[^0-9\s]/g, "");
        const arr: string[] = text.split(" ");
        arr.forEach((id: string) => {
            if (discord_client.users.cache.find((user: User) => user.id === id) !== undefined) {
                console.log(`Tag : ${discord_client.users.cache.find((user: User) => user.id === id)?.tag}`);
            }
        });

        // Get the emotes IDs and use them to find out the emote URL
        let emoji: string = message.content;
        emoji = emoji.replace(/[^0-9\s]/g, "");
        
        const arr1: string[] = emoji.split(" ");

        arr1.forEach((id: string) => {
            https.get(`https://cdn.discordapp.com/emojis/${id}.png`, (res) => {
                const { statusCode } = res;
                if (statusCode === 200) { // HTTP 200 = OK
                    console.log(`Emote : https://cdn.discordapp.com/emojis/${id}.png`);
                } 
            })   
        });
        
        // Get Attachement files if there are any
        message.attachments.each((attachment_item: any) => console.log(`Attached file : ${attachment_item.attachment}`));

        // Print embeds if there are any
        if (message.embeds.length > 0) {
            message.embeds.forEach((embed: any) => console.log(`\nEmbed : ${JSON.stringify(embed.toJSON())}\n`));
        }
    }

    // The message is being sent in a discord server so we can get (channel.name)
    else {
        console.log(`${message.author.tag} in #${message.channel.name} in ${message.guild?.name} : ${message.content}`);

        // Get the mentions IDs and use them to find out the named of who's being mentioned
        let text: string = message.content;
        text = text.replace(/[^0-9\s]/g, "");
        const arr: string[] = text.split(" ");
        arr.forEach((id: string) => {
            if (discord_client.users.cache.find((user: User) => user.id === id) !== undefined) {
                console.log(`Tag : ${discord_client.users.cache.find((user: User) => user.id === id)?.tag}`);
            }
        });

        // Get the emotes IDs and use them to find out the emote URL
        let emoji: string = message.content;
        emoji = emoji.replace(/[^0-9\s]/g, "");
        
        const arr1: string[] = emoji.split(" ");

        arr1.forEach((id: string) => {
            https.get(`https://cdn.discordapp.com/emojis/${id}.png`, (res) => {
                const { statusCode } = res;
                if (statusCode === 200) { // HTTP 200 = OK
                    console.log(`Emote : https://cdn.discordapp.com/emojis/${id}.png`);
                } 
            })   
        });
        
        // Get Attachement files if there are any
        message.attachments.each((attachment_item: any) => console.log(`Attached file : ${attachment_item.attachment}`));

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

// TODO : Add catch around promises