import { translate } from "@vitalets/google-translate-api";
export async function commandTranslate(interaction) {
    if (!interaction.isCommand()) {
        return;
    }
    const { options } = interaction;
    let targetLanguage = options.get("target")?.value?.toString() ?? "";
    const providedText = options.get("input")?.value?.toString() ?? "";
    if (targetLanguage === "deutsch" ||
        targetLanguage === "allemand" ||
        targetLanguage === "german") {
        targetLanguage = "de";
    }
    else if (targetLanguage === "français" ||
        targetLanguage === "francais" ||
        targetLanguage === "french") {
        targetLanguage = "fr";
    }
    else if (targetLanguage === "english" || targetLanguage === "anglais") {
        targetLanguage = "en";
    }
    else if (targetLanguage === "español" ||
        targetLanguage === "espanol" ||
        targetLanguage === "espagnol" ||
        targetLanguage === "spanish") {
        targetLanguage = "es";
    }
    else if (targetLanguage === "japanese" ||
        targetLanguage === "japonais" ||
        targetLanguage === "jp") {
        targetLanguage = "ja";
    }
    else if (targetLanguage === "chinese" ||
        targetLanguage === "chinois" ||
        targetLanguage === "mandarin" ||
        targetLanguage === "cn" ||
        targetLanguage === "zn" ||
        targetLanguage === "ch") {
        targetLanguage = "zh";
    }
    else if (targetLanguage === "arabic" ||
        targetLanguage === "arabe" ||
        targetLanguage === "ara") {
        targetLanguage = "ar";
    }
    const { text } = await translate(providedText, { to: `${targetLanguage}` });
    interaction.reply(text);
}
