import { Interaction, MessageAttachment, MessageEmbed } from "discord.js";
import fetch, { Response } from "node-fetch";

// Generate a random number
function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

export async function command_xkcd(interaction: Interaction) {
    if (!interaction.isCommand()) {
        return;
    }

    // Fetch the latest XKCD Number
    fetch("https://xkcd.com/info.0.json")
        .then((res: Response) => res.json())
        .then((result: any) => {
            // Get current latest XKCD Number and use it to generate a random number
            // 0 < comic_number < latest
            const latest: number = result.num;
            const comic_number: number = getRandomInt(latest) + 1; // Start at 1

            // Fetch a random XKCD
            fetch(`https://xkcd.com/${comic_number}/info.0.json`)
                .then((res: Response) => res.json())
                .then((result: any) => {
                    // Attach the Image link then
                    // Create an Embed with a Title and Alt message as footer
                    const attachment: MessageAttachment = new MessageAttachment(result.img, `xkcd_${comic_number}.png`);
                    const embed: MessageEmbed = new MessageEmbed()
                        .setTitle(`XKCD #${comic_number}`)
                        .setImage(`attachment://xkcd_${comic_number}.png`)
                        .setFooter(result.alt);

                    // Reply with the Embed and the Attachement
                    interaction.reply({ embeds: [embed], files: [attachment] });
                });
        })
}