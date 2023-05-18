import { Client, Interaction, EmbedBuilder } from "discord.js";

export async function command_help(discord_client: Client, interaction: Interaction) {
    if (!interaction.isCommand()) {
        return;
    }

    // Create an Embed with a Title and Description
    const embed = new EmbedBuilder()
        .setTitle(`${discord_client.user?.username} BOT Help`)
        .setDescription(`These are all the available commands for ${discord_client.user?.username} BOT : \n
        /code : Shows the link to the Bot source code \n
        /spongebob [input] : Transforms the input text into sPoNgE bOb cAsE \n
        /xkcd : Post a random XKCD Comic.\n
        /pokedex [input] [value] : Search for a Pokemon, Move or Item to print (Only Pokemons are supported for now)
        Eg : /pokedex pokemon dragonite : Print the Dragonite pokemon
        /memes [input] [first_line] [second_line] : Create a meme from the input using the lines as captions
        Eg : /memes input:drake first_line:nice second_line:meme
        To create a Drake no/yes meme with the captions "nice" and "meme" \n
        /translate [target] [input] : Translate the input text into the targeted language. 
        Target needs to be in ISO 639-1 form (i.e : fr, en, es, de, ja etc...)`);

    // Reply with the Embed
    await interaction.reply({ embeds: [embed] });
}