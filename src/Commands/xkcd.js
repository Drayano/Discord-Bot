import { EmbedBuilder } from "discord.js";
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
export async function command_xkcd(interaction) {
    if (!interaction.isCommand()) {
        return;
    }
    fetch("https://xkcd.com/info.0.json")
        .then((res) => res.json())
        .then((result) => {
        const latest = result.num;
        const comic_number = getRandomInt(latest) + 1;
        fetch(`https://xkcd.com/${comic_number}/info.0.json`)
            .then((res) => res.json())
            .then((result) => {
            const embed = new EmbedBuilder()
                .setTitle(`XKCD #${comic_number}`)
                .setImage(result.img)
                .setFooter({ text: result.alt });
            interaction.reply({ embeds: [embed] });
        });
    });
}
