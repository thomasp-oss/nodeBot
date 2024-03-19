const Discord = require("discord.js");
const OpenAI = require("openai");
const openai = new OpenAI({apiKey: "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"});

// Use openai.complete() or other methods to generate text

const config = require("C:/Users/penna/source/repos/nodeBot/config.json");

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
    }

    else if (command === "ask") {
        strArgs = args.join(' '); //
        async function ask() {
            try {
                const response = await openai.Completion.create({
                    engine: "text-davinci-002",
                    prompt: strArgs,
                    max_tokens: 60
                });

                const text = response.data.choices[0].text.trim();
                message.reply(`Bot: ${text}`);
            } catch (err) {
                console.error(err);
                message.reply(`Sorry, I couldn't generate a response.`);
            }
        }
        ask();
    }
});

client.login(config.BOT_TOKEN);