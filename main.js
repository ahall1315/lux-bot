// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");

// Used for hiding secrets
require("dotenv").config();

const commandHandler = require("./commands");

// Create a new client instance
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", commandHandler);

// Login to Discord with the client's token
client.login(process.env.DISCORD_TOKEN);