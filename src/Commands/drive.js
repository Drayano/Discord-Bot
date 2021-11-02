import { MessageEmbed } from "discord.js";
export async function command_drive(interaction, mega_link) {
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
    const embed = new MessageEmbed()
        .setTitle("Mega Drive")
        .setDescription(`Lien du Mega Drive - SID : ${mega_link}`);
    await interaction.reply({ embeds: [embed] });
}
