import { EmbedBuilder } from "discord.js";
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
export async function commandXkcd(interaction) {
    if (!interaction.isCommand()) {
        return;
    }
    fetch("https://xkcd.com/info.0.json")
        .then((res) => res.json())
        .then((result) => {
        const latest = result.num;
        const comicNumber = getRandomInt(latest) + 1;
        fetch(`https://xkcd.com/${comicNumber}/info.0.json`)
            .then((res) => res.json())
            .then((result) => {
            const embed = new EmbedBuilder()
                .setTitle(`XKCD #${result.num}`)
                .setImage(result.img)
                .setFooter({ text: result.alt });
            interaction.reply({ embeds: [embed] });
        });
    });
}
