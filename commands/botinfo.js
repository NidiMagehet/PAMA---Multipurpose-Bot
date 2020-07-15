const DBL = require("dblapi.js");
exports.run = async (client, message, args) => {
  const dbl = new DBL('le secret', client);
  try {
    let pama = args[0];
    if (!pama) return message.reply("You must give me a bot ID.");
    if (args[1]) return message.reply("Only a bot ID, nothing else.");
    dbl.getBot(pama).then(bot => {
      let botembed = new client.discord.RichEmbed()
        .setDescription("Bot's Information")
        .setColor("#07a702")
        .addField("Bot's Name", `${bot.username}`, true)
        .addField("Bot's ID", `${bot.id}`, true)
        .addField("Bot's Discriminator", `${bot.discriminator}`, true)
        .addField("Bot's Library", `${bot.lib}`, true)
        .addField("Bot's Prefix", `${bot.prefix}`, true)
        .addField("Bot's Approval Date", `${bot.date}`, true)
        .addField("Bot's Owners' ID's", `${bot.owners.join(", ")}`, true)
        .addField("Bot's Website", `${bot.website.length? bot.website : "Unavailable"}`, true)
        .addField("Bot's Upvotes", `${bot.points}`, true)
        .addField("Monthly Upvotes", `${bot.monthlyPoints}`, true)
        .addField("Certified", `${bot.certifiedBot? "Yes" : "No"}`, true)
        .addField("Bot's Tags", `${bot.tags.join(", ")}`, true)
        .addField("Bot's Description", `${bot.shortdesc}`, true)
        .setThumbnail(`https://images.discordapp.net/avatars/${bot.id}/${bot.avatar}.png`);
      message.channel.send(botembed);
    }).catch(err => {
      message.reply(`I couldn't find any Bot on the Discord Bots List possessing this ID.`);
    });
  } catch (err) {
    message.channel.send('Their was an error!\n' + err + '').catch();
  };
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["boinfo"],
  permLevel: "Reporter"
};
exports.help = {
  name: 'botinfo',
  category: 'Informative',
  description: 'Shows bot info about a certain bot from the DBL(Discord Bots List) of your choice..',
  usage: 'botinfo [bot_id]'
};
