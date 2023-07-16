import { EmbedBuilder } from "discord.js";
export async function commandMinecraft(discordClient, interaction) {
    if (!interaction.isCommand()) {
        return;
    }
    const embed = new EmbedBuilder().setTitle(`${discordClient.user?.username} BOT Help`)
        .setDescription(`These are all the available commands for ${discordClient.user?.username} BOT : \n
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
    await interaction.reply({ embeds: [embed] });
}
