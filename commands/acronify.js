const acronym = require("acronym");
exports.run = async (client, message, args) => {
  const words = args[0];
  if (!words) return message.reply("Where's the acronym ?");
  if (args[1]) return message.reply("Technically an acronym is ***one*** word.");
  if (words.length > 8) return message.reply("This acronym is too long.");
  const embed = new client.discord.RichEmbed()
    .setColor("#07a702")
    .setTitle(words)
    .setDescription(acronym(words));
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["acrofy", "acronym"],
  permLevel: "User"
};
exports.help = {
  name: "acronify",
  category: "Text",
  description: "Acronifies your acronym.",
  usage: "acronify [acronym]"
};
