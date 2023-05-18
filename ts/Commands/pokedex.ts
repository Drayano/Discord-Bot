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
        .then((res: Response) => res.json())
        .then((result: Pokemon) => {
            let types: string = "Type(s) : ";

            if (result.types[1] !== undefined) {
                types += `${capitalizeFirstLetter(result.types[0].type.name.toString())} / ${capitalizeFirstLetter(result.types[1].type.name.toString())}`
            }

            else {
                types += `${capitalizeFirstLetter(result.types[0].type.name.toString())}`
            }

            // Create an Embed with a Title, the Image and the Alt message as footer
            const embed: EmbedBuilder = new EmbedBuilder()
                .setTitle(`Pokemon #${result.id} - ${capitalizeFirstLetter(result.name.toString())}`)
                .setImage(result.sprites.other["official-artwork"].front_default)
                .setFooter({ text: `${types}` });

            // Reply with the Embed
            interaction.reply({ embeds: [embed] });
        });
    }
}

interface Ability {
    name: string,
    url: string,
}

interface AbilityInfo {
    ability: Ability,
    is_hidden: boolean,
    slot: number,
}

interface Version {
    name: string,
    url: string,
}

interface GameIndex {
    game_index: number,
    version: Version,
}

interface Move {
    name: string,
    url: string,
}

interface VersionGroupDetail {
    level_learned_at: number,
    move_learn_method: {
        name: string,
        url: string,
    },
    version_group: Version,
}

interface MoveInfo {
    move: Move,
    version_group_details: VersionGroupDetail[],
}

interface Form {
    name: string,
    url: string,
}

interface Species {
    name: string,
    url: string,
}

interface Sprites {
    back_default: string | null,
    back_female: string | null,
    back_shiny: string | null,
    back_shiny_female: string | null,
    front_default: string | null,
    front_female: string | null,
    front_shiny: string | null,
    front_shiny_female: string | null,
    other: {
      dream_world: {
        front_default: string | null,
        front_female: string | null,
      },
      home: {
        front_default: string | null,
        front_female: string | null,
        front_shiny: string | null,
        front_shiny_female: string | null,
      },
      "official-artwork": {
        front_default: string | null,
        front_shiny: string | null,
      },
    },
    versions: {
      "generation-i": {
        "red-blue": {
          back_default: string | null,
          back_gray: string | null,
          back_transparent: string | null,
          front_default: string | null,
          front_gray: string | null,
          front_transparent: string | null,
        },
        yellow: {
          back_default: string | null,
          back_gray: string | null,
          back_transparent: string | null,
          front_default: string | null,
          front_gray: string | null,
          front_transparent: string | null,
        },
      },
      "generation-ii": {
        crystal: {
          back_default: string | null,
          back_shiny: string | null,
          back_shiny_transparent: string | null,
          back_transparent: string | null,
          front_default: string | null,
          front_shiny: string | null,
          front_shiny_transparent: string | null,
          front_transparent: string | null,
        },
        gold: {
          back_default: string | null,
          back_shiny: string | null,
          front_default: string | null,
          front_shiny: string | null,
          front_transparent: string | null,
        },
        silver: {
          back_default: string | null,
          back_shiny: string | null,
          front_default: string | null,
          front_shiny: string | null,
          front_transparent: string | null,
        },
      },
      "generation-iii": {
        emerald: {
          front_default: string | null,
          front_shiny: string | null,
        },
        "firered-leafgreen": {
          back_default: string | null,
          back_shiny: string | null,
          front_default: string | null,
          front_shiny: string | null,
        },
        "ruby-sapphire": {
          back_default: string | null,
          back_shiny: string | null,
          front_default: string | null,
          front_shiny: string | null,
        },
      },
      "generation-iv": {
        "diamond-pearl": {
          back_default: string | null,
          back_female: string | null,
          back_shiny: string | null,
          back_shiny_female: string | null,
          front_default: string | null,
          front_female: string | null,
          front_shiny: string | null,
          front_shiny_female: string | null,
        },
        "heartgold-soulsilver": {
          back_default: string | null,
          back_female: string | null,
          back_shiny: string | null,
          back_shiny_female: string | null,
          front_default: string | null,
          front_female: string | null,
          front_shiny: string | null,
          front_shiny_female: string | null,
        },
        platinum: {
          back_default: string | null,
          back_female: string | null,
          back_shiny: string | null,
          back_shiny_female: string | null,
          front_default: string | null,
          front_female: string | null,
          front_shiny: string | null,
          front_shiny_female: string | null,
        },
      },
      "generation-v": {
        "black-white": {
          animated: {
            back_default: string | null,
            back_female: string | null,
            back_shiny: string | null,
            back_shiny_female: string | null,
            front_default: string | null,
            front_female: string | null,
            front_shiny: string | null,
            front_shiny_female: string | null,
          },
          back_default: string | null,
          back_female: string | null,
          back_shiny: string | null,
          back_shiny_female: string | null,
          front_default: string | null,
          front_female: string | null,
          front_shiny: string | null,
          front_shiny_female: string | null,
        },
      },
      "generation-vi": {
        "omegaruby-alphasapphire": {
          front_default: string | null,
          front_female: string | null,
          front_shiny: string | null,
          front_shiny_female: string | null,
        },
        "x-y": {
          front_default: string | null,
          front_female: string | null,
          front_shiny: string | null,
          front_shiny_female: string | null,
        },
      },
      "generation-vii": {
        icons: {
          front_default: string | null,
          front_female: string | null,
        },
        "ultra-sun-ultra-moon": {
          front_default: string | null,
          front_female: string | null,
          front_shiny: string | null,
          front_shiny_female: string | null,
        },
      },
      "generation-viii": {
        icons: {
          front_default: string | null,
          front_female: string | null,
        },
      },
    },
}

interface Stat {
    base_stat: number,
    effort: number,
    stat: {
      name: string,
      url: string,
    },
}
  
  interface Type {
    slot: number,
    type: {
      name: string,
      url: string,
    },
}

interface Pokemon {
    abilities: AbilityInfo[],
    base_experience: number,
    forms: Form[],
    game_indices: GameIndex[],
    height: number,
    held_items: any[],
    id: number,
    is_default: boolean,
    location_area_encounters: string,
    moves: MoveInfo[],
    name: string,
    order: number,
    past_types: any[],
    species: Species,
    sprites : Sprites,
    stats: Stat[],
    types: Type[],
}  