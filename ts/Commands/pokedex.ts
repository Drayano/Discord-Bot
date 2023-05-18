import { Interaction, EmbedBuilder } from "discord.js";

function capitalizeFirstLetter(string: string) : string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function command_pokedex(interaction: Interaction): Promise<void> {
    if (!interaction.isCommand()) {
        return;
    }

    const { options } = interaction;

    let input: string = options.get("input")?.value?.toString()!;
    let value: string = options.get("value")?.value?.toString()!;

    if (input.toLowerCase() === "pokemon" || input.toLowerCase() === "pokémon") {
        // Fetch a pokemon
        fetch(`https://pokeapi.co/api/v2/pokemon/${value}`)
        .then((res: any) => res.json())
        .then((result: any) => {
            let types: string = "Type(s) : ";

            if (result["types"]["1"] !== undefined) {
                types += `${capitalizeFirstLetter(result["types"]["0"]["type"]["name"].toString())} / ${capitalizeFirstLetter(result["types"]["1"]["type"]["name"].toString())}`
            }

            else {
                types += `${capitalizeFirstLetter(result["types"]["0"]["type"]["name"].toString())}`
            }

            // Create an Embed with a Title, the Image and the Alt message as footer
            const embed: EmbedBuilder = new EmbedBuilder()
                .setTitle(`Pokemon #${result.id} - ${capitalizeFirstLetter(result["forms"]["0"]["name"].toString())}`)
                .setImage(result.sprites.front_default)
                .setFooter({ text: `${types}` });

            // Reply with the Embed
            interaction.reply({ embeds: [embed] });
        });
    }
}