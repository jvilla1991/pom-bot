const Discord = require("discord.js");
const config = require("../config.json");
const client = new Discord.Client();
const fs = require("fs");
const prefix = "!";

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }

  else if (command === "sum") {
    const numArgs = args.map(x => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => counter += x);
    message.reply(`The sum of all the arguments you provided is ${sum}!`);
  }

  else if (command === "start") {
    const timeMins = args;
    message.reply(`You have begun a Pom-session for ${timeMins} minute(s). Good luck!`);

    setTimeout(() => {
      message.reply(`Pom finished!`);

      let filter = m => m.author.id === message.author.id
      message.reply(`How did it go?`).then(() => {
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
          })
          .then(message => {
            message = message.first()
            message.reply(`You said, ${message.content}`);
          })
          .catch(collected => {
              message.channel.send('Timeout');
          });
      })
    }, args * 6000);
    

  }

  function pomComplete(message) {
    message.reply(`You have completed a Pom-session. Good luck!`);
  }
});



client.login(config.BOT_TOKEN);