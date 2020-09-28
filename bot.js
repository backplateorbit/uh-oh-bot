const Discord = require("discord.js")
const client = new Discord.Client();

client.on("ready", () => {
    console.log("Logged in.")
})

client.on("message", async (message) => {
    if (message.content == "ARCHIVE_COMMAND_PROTOTYPE") {
        const server = await message.guild.fetch();
        const serverMessages = await serverMessageExtractor(server)        
        const formedMessages = serverMessages.map(
            message => {
                return {
                    "username": message.author.username,
                    "userId": message.author.id,
                    "deleted": message.deleted,
                    "timestamp": message.createdTimestamp,
                    "id": message.id,
                    "content": message.content,
                    "channelId": message.channel.id,
                    "channelName": message.channel.name,
                    "embeds": message.embeds.map(
                        embed => {
                            return {
                                "embedTitle": embed.title,
                                "embedDesc": embed.description,
                                "embedUrl": embed.url
                            }
                        }
                    ),
                    "attachments": message.attachments.map(
                        attachment => {
                            return {
                                "attachmentId": attachment.id,
                                "attachmentName": attachment.name,
                                "size": attachment.size,
                                "url": attachment.url,
                            }
                        }
                    )
                }
            }
        )
         // Test change for Discord webhook.
        message.reply(`There are ${formedMessages.length} messages on the server.`)
    }
})

const messageExtractor = async (channelObject) => {
    let channelMessages = [];
    let scrollId;

    while (true) {
        const options = {
            limit: 100
        }

        if (scrollId) {
            options["before"] = scrollId;
        }

        const scrollMessages = await channelObject.messages.fetch(options);
        channelMessages.push(...scrollMessages.array());
        scrollId = scrollMessages.last().id;

        if (scrollMessages.size < 100) {
            break
        }
    }

    return channelMessages;
}

const serverMessageExtractor = async (serverObject) => {
    const serverMessages = [];

    const textChannels = serverObject.channels.cache.filter(
        channel => channel.type === "text"
    )

    for (channel of textChannels) {
        const channelObject = await channel[1].fetch();
        const channelMessages = await messageExtractor(channelObject);
        serverMessages.push(...channelMessages);
    }

    return serverMessages;
}

client.login(process.env.BOT_TOKEN)