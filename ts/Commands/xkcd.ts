import { Interaction, MessageAttachment, MessageEmbed } from "discord.js";
import fetch from "node-fetch";

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export async function command_xkcd(interaction: Interaction) {
    if (!interaction.isCommand()) {
        return;
    }

    const { commandName } = interaction;

    // Check if the interaction is happening in a discord server (to get channel.name)
    if (interaction.inGuild()) {
        console.log(`${interaction.user.tag} in ${interaction.channel?.name} in ${interaction.guild?.name} : used the ${commandName} command`);
    }

    // Interaction happening in a DM
    else {
        console.log(`${interaction.user.tag} in a Direct Message : used the ${commandName} command`);
    }

    // Fetch the latest XKCD Number
    fetch("https://xkcd.com/info.0.json")
        .then((res: any) => res.json())
        .then((result: any) => {
            // Get current latest XKCD Number and use it to generate a random number
            // 0 < comic_number < latest
            const latest = result.num;
            const comic_number = getRandomInt(latest) + 1; // Start at 1

            // Fetch a random XKCD
            fetch(`https://xkcd.com/${comic_number}/info.0.json`)
                .then((res: any) => res.json())
                .then((result: any) => {
                    // Attach the Image link then
                    // Create an Embed with a Title and Alt message as footer
                    const attachment = new MessageAttachment(result.img, `xkcd_${comic_number}.png`);
                    const embed = new MessageEmbed()
                        .setTitle(`XKCD #${comic_number}`)
                        .setImage(`attachment://xkcd_${comic_number}.png`)
                        .setFooter(result.alt);

                    // Reply with the Embed and the Attachement
                    interaction.reply({ embeds: [embed], files: [attachment] });
                });
        })
}