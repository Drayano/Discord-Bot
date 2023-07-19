import { Tail } from "tail";
import dotenv from "dotenv";
dotenv.config();
const serverLogFile = process.env.MINECRAFT_SERVER_LOGS_PATH;
const discordChannelId = process.env.MINECRAFT_CHANNEL_PLAYGROUND;
export function startMinecraftLogListener(discordClient) {
    const tail = new Tail(serverLogFile);
    tail.on("line", (line) => {
        const parsedLine = parseLogLine(line);
        if (parsedLine) {
            const content = `<${parsedLine.username}> : ${parsedLine.message}`;
            sendToDiscord(content, discordClient);
        }
    });
    tail.on("error", (error) => {
        console.error("Error occurred while tailing Minecraft server log file:", error);
    });
    function parseLogLine(line) {
        const chatRegex = /<(\w+)> (.+)/;
        const match = line.match(chatRegex);
        if (match) {
            const username = match[1];
            const message = match[2];
            return { username, message };
        }
        return null;
    }
    function sendToDiscord(content, discordClient) {
        const channel = discordClient.channels.cache.get(discordChannelId);
        if (channel) {
            channel.send(content);
        }
        else {
            console.error("Invalid Discord channel ID");
        }
    }
}
