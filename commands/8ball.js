const possibleAnswers = [
  "wut",
  "yes",
  "no",
  "..no u",
  "idk",
  "No",
  "Yes",
  "uhh",
  "i dont think so m8",
  "tHe AnSwEr LiEs WiThIn",
  "wait wot",
  "Why don't you ask magic8ball instead"
];
exports.run = async (client, message, args) => {
  // eslint-disable-line no-unused-vars
  try {
    if (args[0]) {
      if (message.content.endsWith("?")) {
        message.channel.send(possibleAnswers.random());
      } else return message.reply("A question ends with a question mark.");
    } else return message.reply("You must provide a question!");
  } catch (err) {
    message.channel.send("There was an error!\n" + err).catch();
  };
};
exports.conf = {
  enabled: true,
  aliases: ["8b"],
  guildOnly: false,
  permLevel: "User"
};
exports.help = {
  name: "8ball",
  category: "Social",
  description: "Returns the answer to your question",
  usage: "8ball <question>"
};
