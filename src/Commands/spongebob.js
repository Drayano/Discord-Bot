import { MessageAttachment } from "discord.js";
export async function command_spongebob(interaction, spongebob_gif) {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName, options } = interaction;
    if (interaction.inGuild() && interaction.channel?.isText() && interaction.channel.type === "GUILD_TEXT") {
        console.log(`${interaction.user.tag} in ${interaction.channel?.name} in ${interaction.guild?.name} : used the ${commandName} command with '${options.get("input")?.value?.toString()}'`);
    }
    else {
        console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command with '${options.get("input")?.value?.toString()}'`);
    }
    let text = "";
    let spongebob = "";
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
    else {
        console.log("Error on the spongebob command, no text provided !");
        spongebob = "No text provided";
    }
    const attachment = new MessageAttachment(spongebob_gif, 'spongebob.gif');
    await interaction.reply({ content: spongebob, files: [attachment] });
}
