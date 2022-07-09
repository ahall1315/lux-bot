const fetch = require("node-fetch");

module.exports = async function (msg, args) {
    let url = "https://paracausal.science/xur/current.json"; // endpoint I found from https://github.com/alchemydc/destiny2-xur-discord/blob/main/xur.py (credit to @nev_rtheless)
    let response = await fetch(url);
    let json = await response.json();
    let output = null;

    if (json == null) {
        output = `Xûr is away.`;
    } else {
        output = `Xûr is located at ${json.bubbleName} on ${json.placeName}.`;
    }

    msg.channel.send(output);
};