import { Tail } from "tail";
const serverLogFile = process.env.MINECRAFT_SERVER_LOGS_PATH;
const discordChannelId = process.env.MINECRAFT_CHANNEL_PLAYGROUND;
export function startMinecraftLogListener(discordClient) {
    const tail = new Tail(serverLogFile);
    tail.on("line", (line) => {
        const parsedLine = parseLogLine(line);
        if (parsedLine) {
            const content = `<${parsedLine.position}> ${parsedLine.username}: ${parsedLine.message}`;
            sendToDiscord(content, discordClient);
        }
    });
    tail.on("error", (error) => {
        console.error("Error occurred while tailing Minecraft server log file:", error);
    });
    function parseLogLine(line) {
        const chatRegex = /<(\w+)> (\w+): (.+)/;
        const match = line.match(chatRegex);
        if (match) {
            const position = match[1];
            const username = match[2];
            const message = match[3];
            return { position, username, message };
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
