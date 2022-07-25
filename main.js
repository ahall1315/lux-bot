// Require the necessary discord.js classes
import DiscordJS, { Intents, Interaction } from "discord.js";
// Used for hiding secrets
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

// Create a new client instance
const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    let commands;

    if (guild) {
        commands = guild.commands;
    } else {
        commands = client.application.commands;
    }

    commands.create({
        name: 'ping',
        description: 'Replies with pong',
    })

    commands.create({
        name: "add",
        description: "Adds two numbers.",
        options: [
            {
                name: "number1",
                description: "The first number.",
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name: "number2",
                description: "The second number.",
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            }
        ]
    })

    commands.create({
        name: "xur",
        description: "Displays Xûr's location."
    })
});

client.on("messageCreate", (msg) => {
    console.log(msg);

    // Used for testing
    var words = msg.content.split(" ");
    for (let i = 0; i < words.length; i++) {
        var word = words[i];
        if (word === "hi") {
            msg.channel.send(`Hello ${msg.author.username}!`);
        }
        
    }
});

// Response to commands
client.on("interactionCreate", async (interaction) => {
    if(!interaction.isCommand()) {
        return
    }

    const {commandName, options} = interaction;

    if (commandName === "ping") {
        interaction.reply({
            content: "pong",
            ephemeral: false
        })
    } else if (commandName === "add") {
        const num1 = options.getNumber("number1");
        const num2 = options.getNumber("number2");
        
        interaction.reply({
            content: `The sum of ${num1} and ${num2} is ${num1 + num2}.`,
            ephemeral: false
        })
    } else if (commandName === "xur") {
        let url = "https://paracausal.science/xur/current.json"; // endpoint I found from https://github.com/alchemydc/destiny2-xur-discord/blob/main/xur.py (credit to @nev_rtheless)
        let response = await fetch(url);
        let json = await response.json();
        let output = null;

        if (json == null) {
            output = `Xûr is away.`;
        } else {
            output = `Xûr is located at ${json.bubbleName} on ${json.placeName}.`;
        }

        interaction.reply(output);
        }
})

// Login to Discord with the client's token
client.login(process.env.DISCORD_TOKEN);