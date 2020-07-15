const {
  base64encode,
  base64decode
} = require('nodejs-base64');
exports.run = async (client, message, args) => {
  const pama = args.slice(1).join(" ");
  try {
    message.delete().catch();
    switch (args[0]) {
      case "encode":
        if (!pama) return message.reply("You need to provide something to encode.");
        let embed = new client.discord.RichEmbed()
          .setColor("#07a702")
          .setTitle("Encoded Base64 Text")
          .setDescription(base64encode(pama))
          .setFooter(`Encoded by ${message.author.username}.`, message.author.displayAvatarURL);
        message.channel.send(embed);
        break;
      case "decode":
        if (!pama) return message.reply("You need to provide something to decode.");
        let yembed = new client.discord.RichEmbed()
          .setColor("#07a702")
          .setTitle("Decoded Base64 Text")
          .setDescription(base64decode(pama))
          .setFooter(`Decoded by ${message.author.username}.`, message.author.displayAvatarURL);
        message.channel.send(yembed);
        break;
      default:
        return message.reply("You need to choose to Encode or Decode the string!");
    };
  } catch (err) {
    message.channel.send("Their was an error!\n" + err).catch();
  };
};
exports.conf = {
  enabled: true,
  aliases: ['64', 'base'],
  guildOnly: false,
  permLevel: 'User'
};
exports.help = {
  name: "base64",
  category: "Miscellaneous",
  description: "Encodes or Decodes a Base64 string",
  usage: "base64 <encode/decode> <text>"
};
