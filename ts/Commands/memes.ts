import { Interaction, MessageAttachment } from "discord.js";
import { Http2ServerRequest } from "http2";
import fetch from "node-fetch";
import { title } from "process";
import * as http from "http";

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

    // Setup the variables
    const username = process.env.IMGFLIP_USERNAME;
    const password = process.env.IMGFLIP_PASSWORD;

    // Use a counter so we can stop looking after finding the first matching meme (return alone DOES NOT WORK)
    let i = 0;

    fetch("https://api.imgflip.com/get_memes")
        .then((res: any) => res.json())
        .then((result: any) => {
            const memes = result.data.memes;
            const meme = memes.find((meme: any) => {
                // If the input name matches the name of any meme returned by the API
                // Matches the first result
                const meme_lowercase = meme.name.toString().toLowerCase();
                const input_string = options.get("input")?.value?.toString().toLowerCase();
                return meme_lowercase.includes(input_string);
            })

            if (!meme) {
                interaction.reply("Is that a meme from the future or something ?");
            }
            
            else {
                const params = {
                    template_id: meme.id,
                    text0: options.get("first_line")?.value?.toString(),
                    text1: options.get("second_line")?.value?.toString(),
                    username: username,
                    password: password
                }

                fetch(`https://api.imgflip.com/caption_image?template_id=${params.template_id}&username=${params.username}&password=${params.password}&text0=${params.text0}&text1=${params.text1}`)
                    .then((res: any) => res.json())
                    .then((result: any) => {
                        interaction.reply(result.data.url);
                    });
            }
        });
}