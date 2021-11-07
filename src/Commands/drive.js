import { MessageEmbed } from "discord.js";
export async function command_drive(interaction, mega_link) {
    if (!interaction.isCommand()) {
        return;
    }
    const embed = new MessageEmbed()
        .setTitle("Mega Drive")
        .setDescription(`Lien du Mega Drive - SID : ${mega_link}`);
    await interaction.reply({ embeds: [embed] });
}
