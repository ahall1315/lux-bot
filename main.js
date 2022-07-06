// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');

// Used for hiding the client's token
require("dotenv").config();

// Create a new client instance
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (msg) => {
    console.log(msg);
    if (msg.content.toLowerCase().includes("hello") && (msg.author.id != 993668012970360884)) {
        msg.channel.send(`Hello ${msg.author.username}!`);
    }
});

// Login to Discord with the client's token
client.login(process.env.TOKEN);