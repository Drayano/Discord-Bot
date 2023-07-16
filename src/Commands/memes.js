export async function commandMemes(interaction) {
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
            const memeLowercase = meme.name.toString().toLowerCase();
            const inputString = options.get("input")?.value?.toString().toLowerCase() ?? "";
            return memeLowercase.includes(inputString);
        });
        if (!meme) {
            interaction.reply("Is that a meme from the future or something ?");
        }
        else {
            const params = {
                templateId: meme.id,
                text0: options.get("first_line")?.value?.toString(),
                text1: options.get("second_line")?.value?.toString(),
                username: username,
                password: password,
            };
            fetch(`https://api.imgflip.com/caption_image?templateId=${params.templateId}&username=${params.username}&password=${params.password}&text0=${params.text0}&text1=${params.text1}`)
                .then((res) => res.json())
                .then((result) => {
                interaction.reply(result.data.url);
            });
        }
    });
}
