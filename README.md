# uh-oh-bot
uh-oh-bot is a custom written bot for managing the uh-oh server, a Discord server that some friends and I are a part of. The bot is bespokely written to handle administration and tasks on the server.

## Main Tasks
The bot has some main tasks that it executes, and can be triggered to execute. These include:

 - Extracting all un-documenting messages and pushing them to a database.*
 - Moving messages that need moving, i.e links to the #links channel and tweets to the #tweets channel.

## Messages
The bot has an ongoing task of downloading and serialising all of the messages on the server. There is a plan projected for how these messages are to be stored. 

In the short-term, this is just going to be some daily text files.

In the long-term, the messages will be pushed to a DynamoDB being served through AWS.