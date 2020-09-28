const Discord = require("discord.js")
const client = new Discord.Client();

client.on("ready", () => {
    console.log("Logged in.")
})

client.on("message", message => {
    if (message.content == "ping") {
        message.reply("pong")
    }
})

client.on("message", message => {
    if (message.content == "ARCHIVE_COMMAND_PROTOTYPE") {
        message.reply(JSON.stringify(client.guilds))
    }
})

client.login(process.env.BOT_TOKEN)