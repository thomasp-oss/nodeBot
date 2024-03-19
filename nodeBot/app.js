const Discord = require("discord.js");
const config = require("C:/Users/penna/source/repos/nodeBot/config.json");
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: "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" });

/**
 * Represents a Discord client.
 * @constructor
 * @param {Object} options - The options for the client.
 * @param {string[]} options.intents - The intents to enable for the client.
 */
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const prefix = "$";
client.on("messageCreate", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "test") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`This message test had a latency of ${timeTaken}ms.`);
    } else if (command === "ask") {
        const strArgs = args.join(' ');
        // add async
        async function ask() {
            try {
                // TODO: Use the OpenAI API to generate a response to the user's input.
                const response = await openai.chat.completions.create({
                    messages: [{ role: "user", content: `${strArgs}` }],
                    model: "gpt-3.5-turbo",
                    response_format: { "type": "text" },
                    max_tokens: 60,
                });
                message.reply(`Bot: ${response.choices[0].message.content}`);
            } catch (err) {
                message.reply(`Error: ${err}`);
            }
        }
        ask();
    }
});

/**
 * Logs the client in using the provided bot token.
 * @param {string} token - The bot token to use for authentication.
 */
client.login(config.BOT_TOKEN);