import { EmbedBuilder } from "discord.js";
export async function commandCode(interaction) {
    if (!interaction.isCommand()) {
        return;
    }
    const embed = new EmbedBuilder()
        .setTitle("Bot Source Code")
        .setDescription(`The bot source code is available on Github at this address : https://github.com/Drayano/Discord-Bot`);
    await interaction.reply({ embeds: [embed] });
}
