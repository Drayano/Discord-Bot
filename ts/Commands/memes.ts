import { Interaction } from "discord.js";
import fetch, { Response } from "node-fetch";

export async function command_memes(interaction: Interaction): Promise<void> {
    if (!interaction.isCommand()) {
        return;
    }

    const { commandName, options } = interaction;
    
    // Check if the interaction is happening in a discord server,
    // If the Channel is a Text Channel (i.e : not a voice, thread or news channel) (to get channel.name)
    if (interaction.inGuild() && interaction.channel?.isText() && interaction.channel.type === "GUILD_TEXT") {
        console.log(`${interaction.user.tag} in ${interaction.channel?.name} in ${interaction.guild?.name} : used the ${commandName} command with '${options.get("input")?.value?.toString()}' '${options.get("first_line")?.value?.toString()}' '${options.get("second_line")?.value?.toString()}'`);
    }

    // Interaction happening in a DM
    else {
        console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command with '${options.get("input")?.value?.toString()}' '${options.get("first_line")?.value?.toString()}' '${options.get("second_line")?.value?.toString()}'`);
    }

    // Setup the login variables
    const username: string = process.env.IMGFLIP_USERNAME;
    const password: string = process.env.IMGFLIP_PASSWORD;

    // Fetch the memes list
    fetch("https://api.imgflip.com/get_memes")
        .then((res: Response) => res.json())
        .then((result: any) => {
            // Loop through the result looking for a match
            const memes: string[] = result.data.memes;
            const meme: any = memes.find((meme: any) => {
                // If the input name matches the name of any meme returned by the API
                // Matches the first result
                const meme_lowercase: string = meme.name.toString().toLowerCase();
                const input_string: any = options.get("input")?.value?.toString().toLowerCase();

                return meme_lowercase.includes(input_string);
            })

            // If the meme isn't found return an error message
            if (!meme) {
                interaction.reply("Is that a meme from the future or something ?");
            }
            
            // If the meme is found handle the captioning
            else {
                // API Call parameters -
                // template_id = the ID for the template to use
                // text0/text1 = the first/second caption
                // username/password = imgflip login details
                const params = {
                    template_id: meme.id,
                    text0: options.get("first_line")?.value?.toString(),
                    text1: options.get("second_line")?.value?.toString(),
                    username: username,
                    password: password
                }

                // Send an HTTP POST request with the necessary informations to make the meme
                fetch(`https://api.imgflip.com/caption_image?template_id=${params.template_id}&username=${params.username}&password=${params.password}&text0=${params.text0}&text1=${params.text1}`)
                    .then((res: Response) => res.json())
                    .then((result: any) => {
                        // Reply with the captioned meme
                        interaction.reply(result.data.url);
                    });
            }
        });
}