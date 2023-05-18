import { Interaction } from "discord.js";
import { translate } from '@vitalets/google-translate-api';

export async function command_translate(interaction: Interaction): Promise<void> {
    if (!interaction.isCommand()) {
        return;
    }

    const { options } = interaction;

    let target_language: string = options.get("target")?.value?.toString()!;
    let provided_text: string = options.get("input")?.value?.toString()!;

    // Handle some common misspellings
    if (target_language === "deutsch" || target_language === "allemand" || target_language === "german") {
        target_language = "de";
    }

    else if (target_language === "français" || target_language === "francais" || target_language === "french") {
        target_language = "fr";
    }

    else if (target_language === "english" || target_language === "anglais") {
        target_language = "en";
    }

    else if (target_language === "español" || target_language === "espanol" || target_language === "espagnol" || target_language === "spanish") {
        target_language = "es";
    }

    else if (target_language === "japanese" || target_language === "japonais" || target_language === "jp") {
        target_language = "ja";
    }

    else if (target_language === "chinese" || target_language === "chinois" || target_language === "mandarin" || target_language === "cn" || target_language === "zn" || target_language === "ch") {
        target_language = "zh";
    }

    else if (target_language === "arabic" || target_language === "arabe" || target_language === "ara") {
        target_language = "ar";
    }

    const { text } = await translate(provided_text, { to: `${target_language}` });
    interaction.reply(text);
}