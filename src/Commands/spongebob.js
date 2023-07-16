export async function commandSpongebob(interaction) {
    if (!interaction.isCommand()) {
        return;
    }
    const { options } = interaction;
    let text = "";
    let spongebob = "";
    const argumentLength = options.get("input")?.value?.toString().length;
    if (argumentLength !== undefined) {
        for (let i = 0; i < argumentLength; i++) {
            text = options.get("input")?.value?.toString() ?? "";
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
