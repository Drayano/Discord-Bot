import { Interaction, MessageAttachment } from "discord.js";

export async function command_spongebob(interaction: Interaction, spongebob_gif: string) {
    if (!interaction.isCommand()) {
        return;
    }

    const { options } = interaction;

    let text: string = "";
    let spongebob: string = "";

    // Check if the input text isn't an empty string
    if (options.get("input")?.value?.toString().length !== undefined) {
        for (let i = 0; i < options.get("input")?.value?.toString().length!; i++) {
            text = options.get("input")?.value?.toString()!;
            
            if (i % 2 === 0) {
                spongebob += text.charAt(i).toLowerCase();
            }

            else if (i % 2 === 1) {
                spongebob += text.charAt(i).toUpperCase();
            }
        }
    }

    // If the user provides an empty string show an error
    else {
        console.log("Error on the spongebob command, no text provided !");
        spongebob = "No text provided";
    }

    // Attach the Image link
    const attachment = new MessageAttachment(spongebob_gif, 'spongebob.gif');

    // Replty with the spongebobified text and a gif of spongebob
    await interaction.reply({ content: spongebob, files: [attachment] });
}