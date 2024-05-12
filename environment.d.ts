declare global {
	namespace NodeJS {
		interface ProcessEnv {
			// Bots Info
			DISCORDJS_BOT_TOKEN: string;
			DISCORDJS_TESTBOT_TOKEN: string;
			DISCORDJS_BOT_ID: string;
			DISCORDJS_TESTBOT_ID: string;

			// Guild IDs
			GUILD_ID_PLAYGROUND: string;
			GUILD_ID_YUGEN: string;

			// Imgflip logins
			IMGFLIP_USERNAME: string;
			IMGFLIP_PASSWORD: string;

			// NOMEDIA
			GUILD_ID_NOMEDIA: string;
			NOMEDIA_TRIGGERS: string;
			NOMEDIA_FUNNY_CAT: string;
			NOMEDIA_HOMER_GIF: string;
			NOMEDIA_RISITAS_GIF: string;
			NOMEDIA_FRIDAY_GIF: string;
			NOMEDIA_CAT_GIF: string;
		}
	}
}

export {};
