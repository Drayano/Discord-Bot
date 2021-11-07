import { MessageAttachment, MessageEmbed } from "discord.js";
export async function command_emplois_sid(interaction, emplois_sid_link) {
    if (!interaction.isCommand()) {
        return;
    }
    const attachment = new MessageAttachment(emplois_sid_link, 'emplois_sid.png');
    const embed = new MessageEmbed()
        .setTitle("Emplois du temps SID")
        .setImage('attachment://emplois_sid.png');
    await interaction.reply({ embeds: [embed], files: [attachment] });
}
