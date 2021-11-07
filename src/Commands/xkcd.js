import { MessageAttachment, MessageEmbed } from "discord.js";
import fetch from "node-fetch";
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
            const attachment = new MessageAttachment(result.img, `xkcd_${comic_number}.png`);
            const embed = new MessageEmbed()
                .setTitle(`XKCD #${comic_number}`)
                .setImage(`attachment://xkcd_${comic_number}.png`)
                .setFooter(result.alt);
            interaction.reply({ embeds: [embed], files: [attachment] });
        });
    });
}
