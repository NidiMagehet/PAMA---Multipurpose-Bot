const math = require('mathjs');
exports.run = async (client, message, args) => {
  try {
    if (!args[0]) return message.reply("You need to give me a problem.");
    const embed = new client.discord.RichEmbed()
      .setColor("#07a702")
      .setTitle(":abacus: Calc")
      .setDescription("The result is " + math.evaluate(args.join(" ")));
    message.channel.send(embed);
  } catch (err) {
    message.channel.send("Their was an error!\n" + err).catch();
  };
};
exports.conf = {
  enabled: true,
  aliases: ["math", "calculate"],
  guildOnly: false,
  permLevel: "User"
};
exports.help = {
  name: "calc",
  category: "Educational",
  description: "Performs some calculations just for you, how appeasing.",
  usage: "calc [equation]"
};
