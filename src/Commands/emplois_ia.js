import { MessageAttachment, MessageEmbed } from "discord.js";
export async function command_emplois_ia(interaction, emplois_ia_link) {
    if (!interaction.isCommand()) {
        return;
    }
    const attachment = new MessageAttachment(emplois_ia_link, 'emplois_ia.png');
    const embed = new MessageEmbed()
        .setTitle("Emplois du temps IA")
        .setImage('attachment://emplois_ia.png');
    await interaction.reply({ embeds: [embed], files: [attachment] });
}
