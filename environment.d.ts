declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DISCORDJS_BOT_TOKEN: string;
			DISCORDJS_TESTBOT_TOKEN: string;
			DISCORDJS_BOT_ID: string;
			DISCORDJS_TESTBOT_ID: string;
			GUILD_ID_PLAYGROUND: string;
			GUILD_ID_YUGEN: string;
			IMGFLIP_USERNAME: string;
			IMGFLIP_PASSWORD: string;
			MINECRAFT_SERVER_IP: string;
			MINECRAFT_SERVER_PORT: number;
			MINECRAFT_SERVER_LOGS_PATH: string;
			MINECRAFT_CHANNEL_PLAYGROUND: string;
		}
	}
}

export {};
