import { MessageEmbed } from "discord.js";
export async function command_help(discord_client, interaction) {
    if (!interaction.isCommand()) {
        return;
    }
    const yugen_etudes = process.env.YUGEN_CHANNEL_ID_ETUDES;
    const yugen_resources = process.env.YUGEN_CHANNEL_ID_RESOURCES;
    const yugen_memes = process.env.YUGEN_CHANNEL_ID_MEMES;
    const yugen_xkcd = process.env.YUGEN_CHANNEL_ID_XKCD;
    const embed = new MessageEmbed()
        .setTitle(`${discord_client.user?.username} BOT Help`)
        .setDescription(`These are all the available commands for ${discord_client.user?.username} BOT on ${interaction.guild?.name} : \n
        /emplois_sid : Shows the schedule for SID. Channels : ${interaction.guild?.channels.cache.get(yugen_etudes)?.toString()} or ${interaction.guild?.channels.cache.get(yugen_resources)?.toString()} \n
        /emplois_ia : Shows the schedule for IA. Channels : ${interaction.guild?.channels.cache.get(yugen_etudes)?.toString()} or ${interaction.guild?.channels.cache.get(yugen_resources)?.toString()} \n
        /drive : Shows the Mega Drive link for SID. Channels : ${interaction.guild?.channels.cache.get(yugen_etudes)?.toString()} or ${interaction.guild?.channels.cache.get(yugen_resources)?.toString()} \n
        /code : Shows the link to the Bot source code \n
        /spongebob [input] : Transforms the input text into sPoNgE bOb cAsE \n
        /xkcd : Post a random XKCD Comic. Channel : ${interaction.guild?.channels.cache.get(yugen_xkcd)?.toString()} \n
        /memes [input] [first_line] [second_line] : Create a meme from the input using the lines as captions
        Eg : /memes input:drake first_line:nice second_line:meme
        To create a Drake no/yes meme with the captions "nice" and "meme"
        Channel : ${interaction.guild?.channels.cache.get(yugen_memes)?.toString()}`);
    await interaction.reply({ embeds: [embed] });
}
