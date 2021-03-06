import { Interaction } from "discord.js";
import fetch, { Response } from "node-fetch";

export async function command_translate(interaction: Interaction): Promise<void> {
    if (!interaction.isCommand()) {
        return;
    }

    const { options } = interaction;

    let source_language: string = ""
    let target_language: string = options.get("target")?.value?.toString()!;

    // Handle some common misspellings
    if (target_language === "deutsch" || target_language === "allemand" || target_language === "german") {
        target_language = "de"
    }

    else if (target_language === "français" || target_language === "francais" || target_language === "french") {
        target_language = "fr"
    }

    else if (target_language === "english" || target_language === "anglais") {
        target_language = "en"
    }

    else if (target_language === "español" || target_language === "espanol" || target_language === "espagnol" || target_language === "spanish") {
        target_language = "es"
    }

    // Try to detect the input text language
    fetch("https://libretranslate.de/detect", {
        method: "POST",
        body: JSON.stringify({
            q: options.get("input")?.value?.toString()
        }),
        headers: { "Content-Type": "application/json" }
    })
    .then((res: Response) => res.json())
    .then((response: any) => {
        // Input language found
        source_language = response[0].language;

        // Send a translation request
        fetch("https://libretranslate.de/translate", {
            method: "POST",
            body: JSON.stringify({
                q: options.get("input")?.value?.toString(),
                source: source_language,
                target: target_language
            }),
            headers: { "Content-Type": "application/json" }
        })
        .then((res: Response) => res.json())
        .then((response: any) => {
            // Reply with the translated text
            interaction.reply(response.translatedText);
        });
    });
}