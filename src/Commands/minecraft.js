export async function commandMinecraft(interaction) {
    if (!interaction.isCommand()) {
        return;
    }
    await interaction.reply("Minecraft");
}
