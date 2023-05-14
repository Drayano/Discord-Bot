import { Interaction } from "discord.js";

export async function command_memes(interaction: Interaction): Promise<void> {
    if (!interaction.isCommand()) {
        return;
    }

    const { options } = interaction;

    // Setup the login variables
    const username: string = process.env.IMGFLIP_USERNAME;
    const password: string = process.env.IMGFLIP_PASSWORD;

    // Fetch the memes list
    fetch("https://api.imgflip.com/get_memes")
        .then((res: any) => res.json())
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
                    .then((res: any) => res.json())
                    .then((result: any) => {
                        // Reply with the captioned meme
                        interaction.reply(result.data.url);
                    });
            }
        });
}