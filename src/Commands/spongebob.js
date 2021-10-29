"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command_spongebob = void 0;
const discord_js_1 = require("discord.js");
async function command_spongebob(interaction, spongebob_gif) {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName, options } = interaction;
    // Check if the interaction is happening in a discord server (to get channel.name)
    if (interaction.inGuild()) {
        console.log(`${interaction.user.tag} in ${interaction.channel?.name} in ${interaction.guild?.name} : used the ${commandName} command with '${options.get("input")?.value?.toString()}'`);
    }
    // Interaction happening in a DM
    else {
        console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command with '${options.get("input")?.value?.toString()}'`);
    }
    let text = "";
    let spongebob = "";
    // Check if the input text isn't an empty string
    if (options.get("input")?.value?.toString().length !== undefined) {
        for (let i = 0; i < options.get("input")?.value?.toString().length; i++) {
            text = options.get("input")?.value?.toString();
            if (i % 2 === 0) {
                spongebob += text.charAt(i).toLowerCase();
            }
            else if (i % 2 === 1) {
                spongebob += text.charAt(i).toUpperCase();
            }
        }
    }
    // If the user provides an empty string show an error
    else {
        console.log("Error on the spongebob command, no text provided !");
        spongebob = "No text provided";
    }
    const attachment = new discord_js_1.MessageAttachment(spongebob_gif, 'spongebob.gif');
    await interaction.reply({ content: spongebob, files: [attachment] });
}
exports.command_spongebob = command_spongebob;
