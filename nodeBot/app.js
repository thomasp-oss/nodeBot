const Discord = require("discord.js");
const OpenAI = require('openai');
const openai = new OpenAI('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');

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
        const question = prompt("What would you like to ask?");
        (async () => {
            const maxTokens = 60;
            const response = await openai.complete({
                engine: "text-davinci-002",
                prompt: question,
                max_tokens: maxTokens
            });
            message.reply(`Bot: ${response}`);
        })();
    }
});

client.login(config.BOT_TOKEN);