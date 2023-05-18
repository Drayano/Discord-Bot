import { EmbedBuilder } from "discord.js";
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export async function command_pokedex(interaction) {
    if (!interaction.isCommand()) {
        return;
    }
    const { options } = interaction;
    let input = options.get("input")?.value?.toString();
    let value = options.get("value")?.value?.toString();
    if (input.toLowerCase() === "pokemon" || input.toLowerCase() === "pokémon") {
        fetch(`https://pokeapi.co/api/v2/pokemon/${value}`)
            .then((res) => res.json())
            .then((result) => {
            let types = "Type(s) : ";
            if (result.types[1] !== undefined) {
                types += `${capitalizeFirstLetter(result.types[0].type.name.toString())} / ${capitalizeFirstLetter(result.types[1].type.name.toString())}`;
            }
            else {
                types += `${capitalizeFirstLetter(result.types[0].type.name.toString())}`;
            }
            const embed = new EmbedBuilder()
                .setTitle(`Pokemon #${result.id} - ${capitalizeFirstLetter(result.name.toString())}`)
                .setImage(result.sprites.other["official-artwork"].front_default)
                .setFooter({ text: `${types}` });
            interaction.reply({ embeds: [embed] });
        });
    }
}
