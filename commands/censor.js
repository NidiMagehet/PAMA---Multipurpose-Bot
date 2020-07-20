const fck = require('f-ck');
exports.run = async (client, message, args) => {
  const censored = args.join(" ");
  if (!censored) return message.reply("You must give me a word to censor.");
  if (censored.length > 15) return message.reply("Limit is 15 characters.");
  const embed = new client.discord.RichEmbed()
    .setColor("#07a702")
    .setTitle("Censored Text 🤬")
    .setDescription(fck.grawlix(censored));
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};
exports.help = {
  name: 'censor',
  category: "Text",
  description: "Censors your text in an appropriate way.",
  usage: "censor [text]"
};
