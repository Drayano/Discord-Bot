import { MessageAttachment, MessageEmbed } from "discord.js";
export async function command_emplois_sid(interaction, emplois_sid_link) {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName } = interaction;
    if (interaction.inGuild() && interaction.channel?.isText() && interaction.channel.type === "GUILD_TEXT") {
        console.log(`${interaction.user.tag} in ${interaction.channel?.name} in ${interaction.guild?.name} : used the ${commandName} command`);
    }
    else {
        console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command`);
    }
    const attachment = new MessageAttachment(emplois_sid_link, 'emplois_sid.png');
    const embed = new MessageEmbed()
        .setTitle("Emplois du temps SID")
        .setImage('attachment://emplois_sid.png');
    await interaction.reply({ embeds: [embed], files: [attachment] });
}
