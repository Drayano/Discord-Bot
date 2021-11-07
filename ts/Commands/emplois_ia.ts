import { Interaction, MessageAttachment, MessageEmbed } from "discord.js";

export async function command_emplois_ia(interaction: Interaction, emplois_ia_link: string) {
    if (!interaction.isCommand()) {
        return;
    }

    // Attach the Image link then
    // Create an Embed with a Title and Description
    const attachment = new MessageAttachment(emplois_ia_link, 'emplois_ia.png');
    const embed = new MessageEmbed()
        .setTitle("Emplois du temps IA")
        .setImage('attachment://emplois_ia.png');

    // Reply with the Embed and the Attachement
    await interaction.reply({ embeds: [embed], files: [attachment] });
}