import { Tail } from "tail";
import dotenv from "dotenv";
dotenv.config();
const serverLogFile = process.env.MINECRAFT_SERVER_LOGS_PATH;
const discordChannelId = process.env.MINECRAFT_CHANNEL_PLAYGROUND;
const minecraftRoleId = process.env.MINECRAFT_ROLE_ID;
export function startMinecraftLogListener(discordClient) {
    const tail = new Tail(serverLogFile);
    tail.on("line", (line) => {
        const parsedLine = parseLogLine(line);
        if (parsedLine) {
            sendToDiscord(parsedLine, discordClient);
        }
    });
    tail.on("error", (error) => {
        console.error("Error occurred while tailing Minecraft server log file : ", error);
    });
    function parseLogLine(line) {
        const serverRegex = /\[\d+\w+\d+ (\d+:\d+:\d+)\.\d+\] .+ (Stopping server|Starting minecraft server)/;
        const matchServer = line.match(serverRegex);
        if (matchServer) {
            const timestamp = matchServer[1];
            const message = matchServer[2];
            if (message === "Stopping server") {
                return `<@&${minecraftRoleId}> : The server is OFFLINE !`;
            }
            else if (message === "Starting minecraft server") {
                return `<@&${minecraftRoleId}> : The server is ONLINE !`;
            }
            else {
                return `[${timestamp}] ${message}`;
            }
        }
        const chatRegex = /\[\d+\w+\d+ (\d+:\d+:\d+)\.\d+\] .+ <(\w+)> (.+)/;
        const match = line.match(chatRegex);
        if (match) {
            const timestamp = match[1];
            const username = match[2];
            const message = match[3];
            if (checkUsername(username)) {
                return `[${timestamp}] <${username}> : ${message}`;
            }
            return null;
        }
        const eventRegex = /\[\d+\w+\d+ (\d+:\d+:\d+)\.\d+\] .+ (\w+)\s+(joined the game|left the game|has made the advancement.+|has completed the challenge.+|issued server command.+)/;
        const matchEvent = line.match(eventRegex);
        if (matchEvent) {
            const timestamp = matchEvent[1];
            const username = matchEvent[2];
            const message = matchEvent[3];
            if (checkUsername(username)) {
                return `[${timestamp}] ${username} ${message}`;
            }
            return null;
        }
        const deathRegex = /\[\d+\w+\d+ (\d+:\d+:\d+)\.\d+\] .+ (\w+)\s+(blew.+|burned.+|discovered.+|didn't want to live in the same world.+|died.+|drown.+|experienced kinetic.+|fell.+|froze.+|hit the ground too.+|left the confines.+|starved.+|suffocated.+|tried.+|walked.+|was.+|went.+|withered.+)/;
        const matchDeath = line.match(deathRegex);
        if (matchDeath) {
            const timestamp = matchDeath[1];
            const username = matchDeath[2];
            const message = matchDeath[3];
            if (checkUsername(username)) {
                return `[${timestamp}] ${username} ${message}`;
            }
            return null;
        }
        return null;
    }
    function checkUsername(username) {
        if (username === "AbadAl" ||
            username === "Abed_Dz" ||
            username === "aymen2" ||
            username === "DrayanoX" ||
            username === "gweinblade" ||
            username === "Nebel11" ||
            username === "nebel117" ||
            username === "Raijhin" ||
            username === "Tahtouha") {
            return true;
        }
        return false;
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
