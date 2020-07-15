exports.run = async (client, message) => {
  try {
    const baka = await client.nekoslife.sfw.baka();
    const embed = new client.discord.RichEmbed()
      .setColor("#07a702")
      .setTitle("Baka :face_palm:")
      .setImage(baka.url);
    message.channel.send(embed);
  } catch (err) {
    message.channel.send("There was an error!\n" + err).catch();
  };
};
exports.conf = {
  enabled: true,
  aliases: ["animebaka"],
  guildOnly: false,
  permLevel: "User"
};
exports.help = {
  name: "baka",
  category: "Photographic",
  description: "Returns a stupidity-comprehension-tension anime baka.",
  usage: "baka"
};
