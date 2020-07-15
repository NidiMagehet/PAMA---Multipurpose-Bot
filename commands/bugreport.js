exports.run = async (client, message, args, level) => {
  try {
    const option = args[0];
    const bug = args.slice(1).join(" ");
    if (option === "add") {
      if (!bug) return message.reply("You must supply a valid bug report.");
      await client.bugs.set(message.author.id + message.id, {
        txt: bug,
        id: message.author.id + message.id,
        author: message.author.id
      });
      message.channel.send(`Thank you, ${message.author}, for submitting this bug report :battery:`);
    } else if (option === "clear") {
      if (level < 8) return message.reply("This option is only for 8+ Permission Levels.");
      await client.bugs.forEach((report) => {
        client.bugs.delete(report.id);
      });
      message.reply("All the bug reports were cleared :mag_right:");
    } else {
      const embed = new client.discord.RichEmbed()
        .setColor("#ccea56")
        .setTitle(":bug: Bug Reports")
        .setDescription(Array.from(client.bugs.values()).map(insect => insect.txt).join("\n\n"))
        .setFooter(`${Array.from(client.bugs.values()).map(arachnid => arachnid.txt).length} Bug Reports in total.`);
      message.channel.send(embed);
    };
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  };
};
exports.conf = {
  enabled: true,
  aliases: ["brp"],
  guildOnly: false,
  permLevel: 'User'
};
exports.help = {
  name: 'bugreport',
  category: 'Utility',
  description: 'Generates a bug report',
  usage: 'bugreport [add [text]/clear]'
};
