import { Interaction, MessageEmbed } from "discord.js";

export async function command_drive(interaction: Interaction, mega_link: string) {
    if (!interaction.isCommand()) {
        return;
    }

    const { commandName } = interaction;
    
    // Check if the interaction is happening in a discord server,
    // If the Channel is a Text Channel (i.e : not a voice, thread or news channel) (to get channel.name)
    if (interaction.inGuild() && interaction.channel?.isText() && interaction.channel.type === "GUILD_TEXT") {
        console.log(`${interaction.user.tag} in ${interaction.channel?.name} in ${interaction.guild?.name} : used the ${commandName} command`);
    }

    // Interaction happening in a DM
    else {
        console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command`);
    }

    // Create an Embed with a Title and Description
    const embed = new MessageEmbed()
        .setTitle("Mega Drive")
        .setDescription(`Lien du Mega Drive - SID : ${mega_link}`);

    // Reply with the Embed
    await interaction.reply({ embeds: [embed] });
}