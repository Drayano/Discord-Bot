import { Interaction, MessageAttachment, MessageEmbed } from "discord.js";

export async function command_emplois_sid(interaction: Interaction, emplois_sid_link: string) {
    if (!interaction.isCommand()) {
        return;
    }

    // Attach the Image link then
    // Create an Embed with a Title and Description
    const attachment = new MessageAttachment(emplois_sid_link, 'emplois_sid.png');
    const embed = new MessageEmbed()
        .setTitle("Emplois du temps SID")
        .setImage('attachment://emplois_sid.png');

    // Reply with the Embed and the Attachement
    await interaction.reply({ embeds: [embed], files: [attachment] });
}