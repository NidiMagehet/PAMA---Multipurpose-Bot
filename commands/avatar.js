exports.run = async (client, message, args) => {
  const target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!target) {
    const embed = new client.discord.RichEmbed()
      .setColor("#07a702")
      .setTitle("Your Avatar :frame_photo:")
      .setImage(message.author.avatarURL);
    return message.channel.send(embed);
  };
  const embed = new client.discord.RichEmbed()
    .setColor("#07a702")
    .setTitle(`${target.user.username}'s Avatar :frame_photo:`)
    .setImage(target.user.avatarURL)
    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL);
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["pfp"],
  permLevel: "User"
};
exports.help = {
  name: "avatar",
  category: "Social",
  description: "Shows you a person's (or your own) avatar.",
  usage: "avatar {optional<user>}"
};
