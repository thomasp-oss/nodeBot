const Discord = require("discord.js");
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
    if (command === "hello") {
        message.reply("Hello, World!");
    }
});

client.login(config.BOT_TOKEN);
