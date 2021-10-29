import fetch from "node-fetch";
export async function command_memes(interaction) {
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
    // Use a counter so we can stop looking after finding the first matching meme (return alone DOES NOT WORK)
    let i = 0;
    fetch("https://api.imgflip.com/get_memes")
        .then((res) => res.json())
        .then((data) => {
        let memes = data.data.memes;
        memes.forEach((meme) => {
            // If the input name matches the name of any meme returned by the API
            if (i === 0 && meme.name.toString().toLowerCase().includes(options.get("input")?.value?.toString().toLowerCase())) {
                interaction.reply(meme.url);
                i++;
                return;
            }
        });
    });
}
