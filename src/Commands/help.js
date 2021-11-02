import { MessageEmbed } from "discord.js";
export async function command_help(discord_client, interaction) {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName } = interaction;
    if (interaction.inGuild() && interaction.channel?.isText() && interaction.channel.type === "GUILD_TEXT") {
        console.log(`${interaction.user.tag} in ${interaction.channel?.name} in ${interaction.guild?.name} : used the ${commandName} command`);
    }
    else {
        console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command`);
    }
    const embed = new MessageEmbed()
        .setTitle(`${discord_client.user?.username} BOT Help`)
        .setDescription(`These are all the available commands for ${discord_client.user?.username} BOT : \n
        /emplois_sid : Shows the schedule for SID \n
        /emplois_ia : Shows the schedule for IA \n
        /drive : Shows the Mega Drive link for SID \n
        /code : Shows the link to the Bot source code \n
        /spongebob [input] : Transforms the input text into sPoNgE bOb cAsE \n
        /xkcd : Post a random XKCD Comic \n
        /memes [input] [first_line] [second_line] : Create a meme from the input using the lines as captions
        Eg : /memes input:drake first_line:nice second_line:meme
        To create a Drake no/yes meme with the captions "nice" and "meme"`);
    await interaction.reply({ embeds: [embed] });
}
