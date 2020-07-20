const superagent = require("superagent");
exports.run = async (client, message) => {
  //https://catfact.ninja/fact
  let {
    body
  } = await superagent
    .get(`http://aws.random.cat/meow`);
  const embed = new client.discord.RichEmbed()
    .setColor("#07a702")
    .setTitle("One of PAMA's Kitties :cat:")
    .setImage(body.file);
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};
exports.help = {
  name: "cat",
  category: "Photographic",
  description: "PAMA has many kitties, and she's proud to show you some of them.",
  usage: "cat"
};
