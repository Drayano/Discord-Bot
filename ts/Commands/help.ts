import { Client, Interaction, MessageEmbed } from "discord.js";

export async function command_help(discord_client: Client, interaction: Interaction) {
    if (!interaction.isCommand()) {
        return;
    }

    const yugen_guild: string = process.env.GUILD_ID_YUGEN;
    const yugen_etudes: string = process.env.YUGEN_CHANNEL_ID_ETUDES;
    const yugen_resources: string = process.env.YUGEN_CHANNEL_ID_RESOURCES;
    const yugen_memes: string = process.env.YUGEN_CHANNEL_ID_MEMES;
    const yugen_xkcd: string = process.env.YUGEN_CHANNEL_ID_XKCD;

    if (interaction.guild?.id === yugen_guild) {
        // Create an Embed with a Title and Description
        const embed = new MessageEmbed()
            .setTitle(`${discord_client.user?.username} BOT Help`)
            .setDescription(`These are all the available commands for ${discord_client.user?.username} BOT on ${interaction.guild?.name} : \n
            /emplois_sid : Shows the schedule for SID. Channels : ${yugen_etudes} or ${yugen_resources} \n
            /emplois_ia : Shows the schedule for IA. Channels : ${yugen_etudes} or ${yugen_resources} \n
            /drive : Shows the Mega Drive link for SID. Channels : ${yugen_etudes} or ${yugen_resources} \n
            /code : Shows the link to the Bot source code \n
            /spongebob [input] : Transforms the input text into sPoNgE bOb cAsE \n
            /xkcd : Post a random XKCD Comic. Channel : ${yugen_xkcd} \n
            /memes [input] [first_line] [second_line] : Create a meme from the input using the lines as captions
            Eg : /memes input:drake first_line:nice second_line:meme
            To create a Drake no/yes meme with the captions "nice" and "meme"
            Channel : ${yugen_memes} \n
            /translate [target] [input] : Translate the input text into the targeted language. 
            Target needs to be in ISO 639-1 form (i.e : fr, en, es, de, ja etc...)`);

        // Reply with the Embed
        await interaction.reply({ embeds: [embed] });
    }

    else if (!interaction.inGuild()) {
        // Create an Embed with a Title and Description
        const embed = new MessageEmbed()
            .setTitle(`${discord_client.user?.username} BOT Help`)
            .setDescription(`These are all the available commands for ${discord_client.user?.username} BOT : \n
            /code : Shows the link to the Bot source code \n
            /spongebob [input] : Transforms the input text into sPoNgE bOb cAsE \n
            /xkcd : Post a random XKCD Comic.\n
            /memes [input] [first_line] [second_line] : Create a meme from the input using the lines as captions
            Eg : /memes input:drake first_line:nice second_line:meme
            To create a Drake no/yes meme with the captions "nice" and "meme" \n
            /translate [target] [input] : Translate the input text into the targeted language. 
            Target needs to be in ISO 639-1 form (i.e : fr, en, es, de, ja etc...)`);

        // Reply with the Embed
        await interaction.reply({ embeds: [embed] });
    }

    else {
        // Create an Embed with a Title and Description
        const embed = new MessageEmbed()
            .setTitle(`${discord_client.user?.username} BOT Help`)
            .setDescription(`These are all the available commands for ${discord_client.user?.username} BOT on ${interaction.guild?.name} : \n
            /emplois_sid : Shows the schedule for SID.\n
            /emplois_ia : Shows the schedule for IA.\n
            /drive : Shows the Mega Drive link for SID.\n
            /code : Shows the link to the Bot source code \n
            /spongebob [input] : Transforms the input text into sPoNgE bOb cAsE \n
            /xkcd : Post a random XKCD Comic.\n
            /memes [input] [first_line] [second_line] : Create a meme from the input using the lines as captions
            Eg : /memes input:drake first_line:nice second_line:meme
            To create a Drake no/yes meme with the captions "nice" and "meme" \n
            /translate [target] [input] : Translate the input text into the targeted language. 
            Target needs to be in ISO 639-1 form (i.e : fr, en, es, de, ja etc...)`);

        // Reply with the Embed
        await interaction.reply({ embeds: [embed] });
    }
}