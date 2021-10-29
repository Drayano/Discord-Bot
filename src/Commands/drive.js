"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command_drive = void 0;
const discord_js_1 = require("discord.js");
async function command_drive(interaction, mega_link) {
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
    const embed = new discord_js_1.MessageEmbed()
        .setTitle("Mega Drive")
        .setDescription(`Lien du Mega Drive - SID : ${mega_link}`);
    await interaction.reply({ embeds: [embed] });
}
exports.command_drive = command_drive;
