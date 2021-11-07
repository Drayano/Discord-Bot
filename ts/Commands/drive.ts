import { Interaction, MessageEmbed } from "discord.js";

export async function command_drive(interaction: Interaction, mega_link: string) {
    if (!interaction.isCommand()) {
        return;
    }

    // Create an Embed with a Title and Description
    const embed = new MessageEmbed()
        .setTitle("Mega Drive")
        .setDescription(`Lien du Mega Drive - SID : ${mega_link}`);

    // Reply with the Embed
    await interaction.reply({ embeds: [embed] });
}