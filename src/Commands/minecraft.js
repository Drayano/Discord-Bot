import dotenv from "dotenv";
import mcProtocol from "minecraft-protocol";
export async function commandMinecraft(interaction) {
    if (!interaction.isCommand()) {
        return;
    }
    const serverStatus = await checkServerStatus();
    await interaction.reply(serverStatus);
}
async function checkServerStatus() {
    dotenv.config();
    const serverHost = process.env.MINECRAFT_SERVER_IP;
    const serverPort = process.env.MINECRAFT_SERVER_PORT;
    const client = mcProtocol.createClient({
        host: serverHost,
        port: serverPort,
        username: "DrayaBOT",
    });
    return new Promise((resolve) => {
        client.on("connect", () => {
            client.end();
            resolve("The Minecraft server is online.");
        });
        client.on("error", () => {
            resolve("The Minecraft server is offline.");
        });
    });
}
