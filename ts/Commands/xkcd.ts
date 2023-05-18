import { Interaction, EmbedBuilder } from "discord.js";

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
        .then((result: XkcdAPI) => {
            // Get current latest XKCD Number and use it to generate a random number
            // 0 < comic_number < latest
            const latest: number = result.num;
            const comic_number: number = getRandomInt(latest) + 1; // Start at 1

            // Fetch a random XKCD
            fetch(`https://xkcd.com/${comic_number}/info.0.json`)
                .then((res: Response) => res.json())
                .then((result: XkcdAPI) => {
                    // Create an Embed with a Title, the Image and the Alt message as footer
                    const embed: EmbedBuilder = new EmbedBuilder()
                        .setTitle(`XKCD #${result.num}`)
                        .setImage(result.img)
                        .setFooter({ text: result.alt });

                    // Reply with the Embed
                    interaction.reply({ embeds: [embed] });
                });
        })
}

// API Interface
interface XkcdAPI {
    month: string,
    num: number,
    link: string,
    year: string,
    news: string,
    safe_title: string,
    transcript: string,
    alt: string,
    img: string,
    title: string,
    day: string,
}