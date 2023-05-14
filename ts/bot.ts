import { Client, GatewayIntentBits, Partials, Interaction, Message, AttachmentBuilder, EmbedBuilder, User, Embed, ChannelType } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import dotenv from "dotenv";

import * as https from 'https'; 

import { command_help } from "./Commands/help.js";
import { command_code } from "./Commands/code.js";
import { command_spongebob } from "./Commands/spongebob.js";
import { command_memes } from "./Commands/memes.js";
import { command_xkcd } from "./Commands/xkcd.js";
import { command_translate } from "./Commands/translate.js";

dotenv.config();

const discord_client: Client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions
    ],
    
    partials: [
        Partials.Channel
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
    },
    {
        name: "translate",
        description: "Translate the input text",
        options: [
            {
                name: "target",
                description: "Language to translate to",
                required: true,
                type: 3 // String
            },
            {
                name: "input",
                description: "Text to translate",
                required: true,
                type: 3 // String
            }
        ]
    }
];

const discord_token: string = process.env.DISCORDJS_BOT_TOKEN;
const client_id: string = process.env.DISCORDJS_BOT_ID;
const playground_guild_id: string = process.env.GUILD_ID_PLAYGROUND;
const yugen_guild: string = process.env.GUILD_ID_YUGEN;
const yugen_memes: string = process.env.YUGEN_CHANNEL_ID_MEMES;
const yugen_xkcd: string = process.env.YUGEN_CHANNEL_ID_XKCD;

const meme_channel_error: string = "Yugen Memes, Playground Server";
const xkcd_channel_error: string = "Yugen XKCD, Playground Server";

const rest: REST = new REST({ version: '10' }).setToken(discord_token);

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
            name: "DrayaBOT"
        }]
    });

    console.log(`${discord_client.user?.tag} status set to "DrayaBOT"`);
});

// Slash (/) commands handling
discord_client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    const { commandName, options } = interaction;

    // Check if the interaction is happening in a discord server,
    // If the Channel is a Text Channel (i.e : not a voice, thread or news channel) (to get channel.name)
    if (interaction.inGuild() && interaction.channel?.type === ChannelType.GuildText) {
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
        if (!interaction.inGuild() || interaction.guild?.id !== yugen_guild || interaction.channel?.id === yugen_memes) {
            command_memes(interaction);
        }

        else {
            console.log(`ERROR : Cannot use this command in that channel.\nAUTHORIZED CHANNELS : ${meme_channel_error}`);

            if (interaction.guild?.id === yugen_guild) {
                interaction.reply(`You can't use this command in this Channel, try posting it in ${interaction.guild?.channels.cache.get(yugen_memes)?.toString()}`);
            }

            else {
                interaction.reply(`You can't use this command here`);
            }
        }
    }

    // xkcd command
    else if (commandName === "xkcd") {
        if (!interaction.inGuild() || interaction.guild?.id !== yugen_guild || interaction.channel?.id === yugen_xkcd) {
            command_xkcd(interaction);
        }

        else {
            console.log(`ERROR : Cannot use this command in that channel.\nAUTHORIZED CHANNELS : ${xkcd_channel_error}`);
            
            if (interaction.guild?.id === yugen_guild) {
                interaction.reply(`You can't use this command in this Channel, try posting it in ${interaction.guild?.channels.cache.get(yugen_xkcd)?.toString()}`);
            }

            else {
                interaction.reply(`You can't use this command here`);
            }
        }
    }

    // translate command
    else if (commandName === "translate") {
        console.log(`with '${options.get("target")?.value?.toString()}' '${options.get("input")?.value?.toString()}'`);
        command_translate(interaction);
    }
});

// Messages handling
discord_client.on("messageCreate", (message: Message) => {
    // Check if the message is sent in a discord DM
    if (message.channel.type === ChannelType.DM) {
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
            message.embeds.forEach((embed: Embed) => console.log(`\nEmbed : ${JSON.stringify(embed.toJSON())}\n`));
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