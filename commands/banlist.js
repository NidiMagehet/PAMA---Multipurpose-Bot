exports.run = async (client, message) => {
  try {
    let i = 0;
    const confirm = await client.awaitReply(message, "The ban list will arrive in your DM's, respond with `y` or `yes` to proceed..");
    if (!["y", "yes"].includes(confirm)) message.reply("The ban list was revoked.");
    else {
      message.guild.fetchBans().then(async (bans) => {
        message.channel.send("The bans have successfully been sent in your DM's.");
        bans.forEach(async (ban) => {
          i++;
          await message.author.send(i + ". **Name: " + ban.tag + "** | **ID: " + ban.id + "**");
        });
      }).catch(err => message.channel.send("I couldn't download the ban list."));
    };
  } catch (err) {
    message.channel.send("There was an error!\n" + err).catch();
  };
};
exports.conf = {
  enabled: true,
  aliases: ["bans", "listbans"],
  guildOnly: true,
  permLevel: "Moderator"
};
exports.help = {
  name: "banlist",
  category: "Administrative",
  description: "Returns the server's bans, from useless to useful.",
  usage: "banlist"
};
