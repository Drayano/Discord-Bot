import { MessageAttachment, MessageEmbed } from "discord.js";
export async function command_emplois_sid(interaction, emplois_sid_link) {
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
    // Attach the Image link then
    // Create an Embed with a Title and Description
    const attachment = new MessageAttachment(emplois_sid_link, 'emplois_sid.png');
    const embed = new MessageEmbed()
        .setTitle("Emplois du temps SID")
        .setImage('attachment://emplois_sid.png');
    // Reply with the Embed and the Attachement
    await interaction.reply({ embeds: [embed], files: [attachment] });
}
