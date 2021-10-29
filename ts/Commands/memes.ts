import { Interaction, MessageAttachment } from "discord.js";
import fetch from "node-fetch";

export async function command_memes(interaction: Interaction): Promise<void> {
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

    fetch("https://api.imgflip.com/get_memes")
        .then((res: any) => res.json())
        .then((data: any) => {
            let memes = data.data.memes;
            memes.forEach((meme: any) => {
                if (meme.name.toString().toLowerCase().includes(options.get("input")?.value?.toString().toLowerCase())) {
                    interaction.reply(meme.url);
                    return;
                }
            });
        });
}