import { MessageEmbed } from "discord.js";
export async function command_help(discord_client, interaction) {
    if (!interaction.isCommand()) {
        return;
    }
    const yugen_guild = process.env.GUILD_ID_YUGEN;
    const yugen_etudes = process.env.YUGEN_CHANNEL_ID_ETUDES;
    const yugen_resources = process.env.YUGEN_CHANNEL_ID_RESOURCES;
    const yugen_memes = process.env.YUGEN_CHANNEL_ID_MEMES;
    const yugen_xkcd = process.env.YUGEN_CHANNEL_ID_XKCD;
    if (interaction.guild?.id === yugen_guild) {
        const embed = new MessageEmbed()
            .setTitle(`${discord_client.user?.username} BOT Help`)
            .setDescription(`These are all the available commands for ${discord_client.user?.username} BOT on ${interaction.guild?.name} : \n
            /code : Shows the link to the Bot source code \n
            /spongebob [input] : Transforms the input text into sPoNgE bOb cAsE \n
            /xkcd : Post a random XKCD Comic. Channel : ${interaction.guild?.channels.cache.get(yugen_xkcd)} \n
            /memes [input] [first_line] [second_line] : Create a meme from the input using the lines as captions
            Eg : /memes input:drake first_line:nice second_line:meme
            To create a Drake no/yes meme with the captions "nice" and "meme"
            Channel : ${interaction.guild?.channels.cache.get(yugen_memes)} \n
            /translate [target] [input] : Translate the input text into the targeted language. 
            Target needs to be in ISO 639-1 form (i.e : fr, en, es, de, ja etc...)`);
        await interaction.reply({ embeds: [embed] });
    }
    else if (!interaction.inGuild()) {
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
        await interaction.reply({ embeds: [embed] });
    }
    else {
        const embed = new MessageEmbed()
            .setTitle(`${discord_client.user?.username} BOT Help`)
            .setDescription(`These are all the available commands for ${discord_client.user?.username} BOT on ${interaction.guild?.name} : \n
            /code : Shows the link to the Bot source code \n
            /spongebob [input] : Transforms the input text into sPoNgE bOb cAsE \n
            /xkcd : Post a random XKCD Comic.\n
            /memes [input] [first_line] [second_line] : Create a meme from the input using the lines as captions
            Eg : /memes input:drake first_line:nice second_line:meme
            To create a Drake no/yes meme with the captions "nice" and "meme" \n
            /translate [target] [input] : Translate the input text into the targeted language. 
            Target needs to be in ISO 639-1 form (i.e : fr, en, es, de, ja etc...)`);
        await interaction.reply({ embeds: [embed] });
    }
}
