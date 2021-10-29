import { MessageEmbed } from "discord.js";
export async function command_code(interaction) {
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
    const embed = new MessageEmbed()
        .setTitle("Bot Source Code")
        .setDescription(`The bot source code is available on Github at this address : https://github.com/Drayano/Discord-Bot`);
    await interaction.reply({ embeds: [embed] });
}
