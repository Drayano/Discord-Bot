export async function command_memes(interaction) {
    if (!interaction.isCommand()) {
        return;
    }
    const { options } = interaction;
    const username = process.env.IMGFLIP_USERNAME;
    const password = process.env.IMGFLIP_PASSWORD;
    fetch("https://api.imgflip.com/get_memes")
        .then((res) => res.json())
        .then((result) => {
        const memes = result.data.memes;
        const meme = memes.find((meme) => {
            const meme_lowercase = meme.name.toString().toLowerCase();
            const input_string = options.get("input")?.value?.toString().toLowerCase();
            return meme_lowercase.includes(input_string);
        });
        if (!meme) {
            interaction.reply("Is that a meme from the future or something ?");
        }
        else {
            const params = {
                template_id: meme.id,
                text0: options.get("first_line")?.value?.toString(),
                text1: options.get("second_line")?.value?.toString(),
                username: username,
                password: password,
            };
            fetch(`https://api.imgflip.com/caption_image?template_id=${params.template_id}&username=${params.username}&password=${params.password}&text0=${params.text0}&text1=${params.text1}`)
                .then((res) => res.json())
                .then((result) => {
                interaction.reply(result.data.url);
            });
        }
    });
}
