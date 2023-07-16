import { Interaction, EmbedBuilder } from "discord.js";

function capitalizeFirstLetter(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function commandPokedex(interaction: Interaction): Promise<void> {
	if (!interaction.isCommand()) {
		return;
	}

	const { options } = interaction;

	const input: string = options.get("input")?.value?.toString() ?? "";
	const value: string = options.get("value")?.value?.toString() ?? "";

	if (input.toLowerCase() === "pokemon" || input.toLowerCase() === "pokémon") {
		// Fetch a pokemon
		fetch(`https://pokeapi.co/api/v2/pokemon/${value}`)
			.then((res: Response) => res.json())
			.then((result: Pokemon) => {
				let types: string = "Type(s) : ";

				if (result.types[1] !== undefined) {
					types += `${capitalizeFirstLetter(
						result.types[0].type.name.toString(),
					)} / ${capitalizeFirstLetter(result.types[1].type.name.toString())}`;
				} else {
					types += `${capitalizeFirstLetter(result.types[0].type.name.toString())}`;
				}

				// Create an Embed with a Title, the Image and the Alt message as footer
				const embed: EmbedBuilder = new EmbedBuilder()
					.setTitle(
						`Pokemon #${result.id} - ${capitalizeFirstLetter(result.name.toString())}`,
					)
					.setImage(result.sprites.other.officialArtwork.frontDefault)
					.setFooter({ text: `${types}` });

				// Reply with the Embed
				interaction.reply({ embeds: [embed] });
			});
	}
}

interface Ability {
	name: string;
	url: string;
}

interface AbilityInfo {
	ability: Ability;
	isHidden: boolean;
	slot: number;
}

interface Version {
	name: string;
	url: string;
}

interface GameIndex {
	gameIndex: number;
	version: Version;
}

interface Move {
	name: string;
	url: string;
}

interface VersionGroupDetail {
	levelLearnedAt: number;
	moveLearnMethod: {
		name: string;
		url: string;
	};
	versionGroup: Version;
}

interface MoveInfo {
	move: Move;
	versionGroupDetails: VersionGroupDetail[];
}

interface Form {
	name: string;
	url: string;
}

interface Species {
	name: string;
	url: string;
}

interface Sprites {
	backDefault: string | null;
	backFemale: string | null;
	backShiny: string | null;
	backShinyFemale: string | null;
	frontDefault: string | null;
	frontFemale: string | null;
	frontShiny: string | null;
	frontShinyFemale: string | null;
	other: {
		dreamWorld: {
			frontDefault: string | null;
			frontFemale: string | null;
		};
		home: {
			frontDefault: string | null;
			frontFemale: string | null;
			frontShiny: string | null;
			frontShinyFemale: string | null;
		};
		officialArtwork: {
			frontDefault: string | null;
			frontShiny: string | null;
		};
	};
	versions: {
		generationI: {
			redBlue: {
				backDefault: string | null;
				backGray: string | null;
				backTransparent: string | null;
				frontDefault: string | null;
				frontGray: string | null;
				frontTransparent: string | null;
			};
			yellow: {
				backDefault: string | null;
				backGray: string | null;
				backTransparent: string | null;
				frontDefault: string | null;
				frontGray: string | null;
				frontTransparent: string | null;
			};
		};
		generationII: {
			crystal: {
				backDefault: string | null;
				backShiny: string | null;
				backShinyTransparent: string | null;
				backTransparent: string | null;
				frontDefault: string | null;
				frontShiny: string | null;
				frontShinyTransparent: string | null;
				frontTransparent: string | null;
			};
			gold: {
				backDefault: string | null;
				backShiny: string | null;
				frontDefault: string | null;
				frontShiny: string | null;
				frontTransparent: string | null;
			};
			silver: {
				backDefault: string | null;
				backShiny: string | null;
				frontDefault: string | null;
				frontShiny: string | null;
				frontTransparent: string | null;
			};
		};
		generationIII: {
			emerald: {
				frontDefault: string | null;
				frontShiny: string | null;
			};
			fireredLeafgreen: {
				backDefault: string | null;
				backShiny: string | null;
				frontDefault: string | null;
				frontShiny: string | null;
			};
			rubySapphire: {
				backDefault: string | null;
				backShiny: string | null;
				frontDefault: string | null;
				frontShiny: string | null;
			};
		};
		generationIV: {
			diamondPearl: {
				backDefault: string | null;
				backFemale: string | null;
				backShiny: string | null;
				backShinyFemale: string | null;
				frontDefault: string | null;
				frontFemale: string | null;
				frontShiny: string | null;
				frontShinyFemale: string | null;
			};
			heartgoldSoulsilver: {
				backDefault: string | null;
				backFemale: string | null;
				backShiny: string | null;
				backShinyFemale: string | null;
				frontDefault: string | null;
				frontFemale: string | null;
				frontShiny: string | null;
				frontShinyFemale: string | null;
			};
			platinum: {
				backDefault: string | null;
				backFemale: string | null;
				backShiny: string | null;
				backShinyFemale: string | null;
				frontDefault: string | null;
				frontFemale: string | null;
				frontShiny: string | null;
				frontShinyFemale: string | null;
			};
		};
		generationV: {
			blackWhite: {
				animated: {
					backDefault: string | null;
					backFemale: string | null;
					backShiny: string | null;
					backShinyFemale: string | null;
					frontDefault: string | null;
					frontFemale: string | null;
					frontShiny: string | null;
					frontShinyFemale: string | null;
				};
				backDefault: string | null;
				backFemale: string | null;
				backShiny: string | null;
				backShinyFemale: string | null;
				frontDefault: string | null;
				frontFemale: string | null;
				frontShiny: string | null;
				frontShinyFemale: string | null;
			};
		};
		generationVI: {
			omegarubyAlphasapphire: {
				frontDefault: string | null;
				frontFemale: string | null;
				frontShiny: string | null;
				frontShinyFemale: string | null;
			};
			xy: {
				frontDefault: string | null;
				frontFemale: string | null;
				frontShiny: string | null;
				frontShinyFemale: string | null;
			};
		};
		generationVII: {
			icons: {
				frontDefault: string | null;
				frontFemale: string | null;
			};
			ultraSunUltraMoon: {
				frontDefault: string | null;
				frontFemale: string | null;
				frontShiny: string | null;
				frontShinyFemale: string | null;
			};
		};
		generationVIII: {
			icons: {
				frontDefault: string | null;
				frontFemale: string | null;
			};
		};
	};
}

interface Stat {
	baseStat: number;
	effort: number;
	stat: {
		name: string;
		url: string;
	};
}

interface Type {
	slot: number;
	type: {
		name: string;
		url: string;
	};
}

interface Pokemon {
	abilities: AbilityInfo[];
	baseExperience: number;
	forms: Form[];
	gameIndices: GameIndex[];
	height: number;
	heldItems: any[];
	id: number;
	isDefault: boolean;
	locationAreaEncounters: string;
	moves: MoveInfo[];
	name: string;
	order: number;
	pastTypes: any[];
	species: Species;
	sprites: Sprites;
	stats: Stat[];
	types: Type[];
}
