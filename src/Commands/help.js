"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command_help = void 0;
const discord_js_1 = require("discord.js");
async function command_help(discord_client, interaction) {
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
        .setTitle(`${discord_client.user?.username} BOT Help`)
        .setDescription(`These are all the available commands for ${discord_client.user?.username} BOT : \n
        /emplois_sid : Shows the schedule for SID \n
        /emplois_ia : Shows the schedule for IA \n
        /drive : Shows the Mega Drive link for SID \n
        /code : Shows the link to the Bot source code \n
        /spongebob [input] : Transforms the input text into sPoNgE bOb cAsE`);
    // return embed;
    await interaction.reply({ embeds: [embed] });
}
exports.command_help = command_help;
