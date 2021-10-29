import { Interaction, MessageAttachment, MessageEmbed } from "discord.js";

export async function command_emplois_ia(interaction: Interaction, emplois_ia_link: string) {
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

    const attachment = new MessageAttachment(emplois_ia_link, 'emplois_ia.png');
    const embed = new MessageEmbed()
        .setTitle("Emplois du temps IA")
        .setImage('attachment://emplois_ia.png');

    await interaction.reply({ embeds: [embed], files: [attachment] });
}