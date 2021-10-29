"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command_emplois_sid = void 0;
const discord_js_1 = require("discord.js");
async function command_emplois_sid(interaction, emplois_sid_link) {
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
    const attachment = new discord_js_1.MessageAttachment(emplois_sid_link, 'emplois_sid.png');
    const embed = new discord_js_1.MessageEmbed()
        .setTitle("Emplois du temps SID")
        .setImage('attachment://emplois_sid.png');
    await interaction.reply({ embeds: [embed], files: [attachment] });
}
exports.command_emplois_sid = command_emplois_sid;
