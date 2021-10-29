import { Client, Interaction, MessageEmbed } from "discord.js";

export async function command_help(discord_client: Client, interaction: Interaction) {
    if (!interaction.isCommand()) {
        return;
    }

    const { commandName } = interaction;
    
    // Check if the interaction is happening in a discord server (to get channel.name)
    if (interaction.inGuild()) {
        console.log(`${interaction.user.tag} in ${interaction.channel?.name} in ${interaction.guild?.name} : used the ${commandName} command`);
    }

    // Interaction happening in a DM
    else {
        console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command`);
    }

    // Create an Embed with a Title and Description
    const embed = new MessageEmbed()
        .setTitle(`${discord_client.user?.username} BOT Help`)
        .setDescription(`These are all the available commands for ${discord_client.user?.username} BOT : \n
        /emplois_sid : Shows the schedule for SID \n
        /emplois_ia : Shows the schedule for IA \n
        /drive : Shows the Mega Drive link for SID \n
        /code : Shows the link to the Bot source code \n
        /spongebob [input] : Transforms the input text into sPoNgE bOb cAsE \n
        /memes [input] [first_line] [second_line] : Create a meme from the input using the lines as captions
        Eg : /memes input:drake first_line:nice second_line:meme
        To create a Drake no/yes meme with the captions "nice" and "meme"`);

    // Reply with the Embed
    await interaction.reply({ embeds: [embed] });
}