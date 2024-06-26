const Discord = require("discord.js");
const config = require("/Users/thomaspennant/nodeBot/config.json");
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: "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" }); // Old API Key

/**
 * Represents a Discord client.
 * @constructor
 * @param {Object} options - The options for the client.
 * @param {string[]} options.intents - The intents to enable for the client.
 */
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const prefix = "!";
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

        /**
         * Asks a question to the OpenAI chatbot and sends the response to the Discord channel.
         * @async
         */
        async function ask() {
            try {
                const response = await openai.chat.completions.create({
                    messages: [{ role: "user", content: `${strArgs}. Respond in one scentence.` }],
                    model: "gpt-4",
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
