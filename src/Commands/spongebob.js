export async function command_spongebob(interaction) {
    if (!interaction.isCommand()) {
        return;
    }
    const { options } = interaction;
    let text = "";
    let spongebob = "";
    if (options.get("input")?.value?.toString().length !== undefined) {
        for (let i = 0; i < options.get("input")?.value?.toString().length; i++) {
            text = options.get("input")?.value?.toString();
            if (i % 2 === 0) {
                spongebob += text.charAt(i).toLowerCase();
            }
            else if (i % 2 === 1) {
                spongebob += text.charAt(i).toUpperCase();
            }
        }
    }
    else {
        console.log("ERROR : on the spongebob command, no text provided !");
        spongebob = "ERROR : No text provided";
    }
    await interaction.reply({ content: spongebob });
}
