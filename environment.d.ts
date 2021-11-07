declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DISCORDJS_BOT_TOKEN: string,
        DISCORDJS_TESTBOT_TOKEN: string,
        DISCORDJS_BOT_ID: string,
        DISCORDJS_TESTBOT_ID: string,
        GUILD_ID_PLAYGROUND: string,
        GUILD_ID_YUGEN: string,
        YUGEN_CHANNEL_ID_ETUDES: string,
        YUGEN_CHANNEL_ID_RESOURCES: string,
        YUGEN_CHANNEL_ID_MEMES: string,
        YUGEN_CHANNEL_ID_XKCD: string,
        MEGA_DRIVE_SID: string,
        EMPLOIS_SID: string,
        EMPLOIS_IA: string,
        SPONGEBOB_GIF: string,
        IMGFLIP_USERNAME: string,
        IMGFLIP_PASSWORD: string
      }
    }
  }
  
export { };