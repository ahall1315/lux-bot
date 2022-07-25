const prefix = "!";

const xur = require("./commands/xur.js");

module.exports = async function (msg) {
    console.log(msg);
    if (msg.content.toLowerCase().includes("hello") && (msg.author.id != process.env.APP_ID)) {
        msg.channel.send(`Hello ${msg.author.username}!`);
    }

    const commands = { xur };

    let tokens = msg.content.split(" ");
    let command = tokens.shift();
    if (command.charAt(0) === prefix) {
        command = command.substring(1);

        if (commands[command]) {
            commands[command](msg, tokens);
         } else {
                msg.channel.send("Invalid Command");
         }

    }
};