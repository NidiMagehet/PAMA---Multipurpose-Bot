exports.run = (client, message, args) => {
  const settings = message.settings;
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You don't have the Ban Members permission.");
  const reason = args.slice(1).join(" ");
  const toban = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!toban) return message.reply("Specify the person to ban first.");
  if (toban.hasPermission("BAN_MEMBERS")) return message.reply("The person you are trying to ban has the 'Ban Members' permission.");
  if (reason.length < 1) return message.reply("You must provide a reason for the ban first.");
  if (!message.guild.member(toban).bannable) return message.reply("Unfortunately, I can't ban that member.");
  message.guild.ban(toban, 2).catch(err => message.channel.send("Unfortunately, I couldn't ban that member."));
  //0x00AE86
  /*.setColor("#07a702")
    .setTimestamp()
    .setDescription(`**Action:** Ban\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);
*/
  message.reply("I have successfully banned the user.");
  const modLogChannel = settings.modLogChannel;
  if (modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) {
    const embed = new client.discord.RichEmbed()
      .setDescription(`Ban executed by ${message.author}`)
      .setColor("#07a702")
      .addField("Banned User", toban.user.tag)
      .addField("Banned in", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", reason)
      .setTimestamp();
    message.guild.channels.find(c => c.name === settings.modLogChannel).send(embed);
  };
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Administrator"
};
exports.help = {
  name: "ban",
  category: "Administrative",
  description: "Bans the mentioned user.",
  usage: "ban [mention] [reason]"
};
