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
        .then((res: Response) => res.json())
        .then((result: ImgflipAPI) => {
            // Loop through the result looking for a match
            const memes: Meme[] = result.data.memes;
            const meme: Meme | undefined = memes.find((meme: Meme) => {
                // If the input name matches the name of any meme returned by the API
                // Matches the first result
                const meme_lowercase: string = meme.name.toString().toLowerCase();
                const input_string: string = options.get("input")?.value?.toString().toLowerCase()!;

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
                const params: CallParams = {
                    template_id: meme.id,
                    text0: options.get("first_line")?.value?.toString(),
                    text1: options.get("second_line")?.value?.toString(),
                    username: username,
                    password: password
                }

                // Send an HTTP POST request with the necessary informations to make the meme
                fetch(`https://api.imgflip.com/caption_image?template_id=${params.template_id}&username=${params.username}&password=${params.password}&text0=${params.text0}&text1=${params.text1}`)
                    .then((res: Response) => res.json())
                    .then((result: ImgflipResult) => {
                        // Reply with the captioned meme
                        interaction.reply(result.data.url);
                    });
            }
        });
}

interface Meme {
    id: string,
    name: string,
    url: string,
    width: number,
    height: number,
    box_count: number,
    captions: number,
}

interface ImgflipAPI {
    success: boolean,
    data: {
        memes: Meme[],
    },
}

interface ImgflipResult {
    success: boolean,
    data: {
        url: "string",
        page_url: "string",
    },
}

interface CallParams {
    template_id: string,
    text0?: string | undefined,
    text1?: string | undefined,
    text2?: string | undefined,
    text3?: string | undefined,
    username: string,
    password: string,
}