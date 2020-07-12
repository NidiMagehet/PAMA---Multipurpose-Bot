const activeChannels = [];
const methods = require("../methods/getRandomChar.js");
const acronify = require("acronym");
exports.run = async (client, message) => {
  if (activeChannels.includes(message.channel.id)) {
    return message.reply("A game is already starting, help make an acronym out of the sentence first.");
  };
  const acroLen = Number.random(3, 6);
  const acronym = [];
  for (let i = 0; i < acroLen; i++) {
    acronym.push(methods(true));
  };
  const question = new client.discord.RichEmbed()
    .setColor("#07a702")
    .setTitle("Acronism")
    .setDescription(`Game started by ${message.author}, make this sentence an acronym before others can:

${acronify(acronym).join(" ")}`)
    .setFooter("You have 2 minutes to make it an acronym.");
  message.channel.send(question);
  activeChannels.push(message.channel.id);
  const wordsCollector = message.channel.createMessageCollector(
    msg => !msg.author.bot && msg.content.trim().toLowerCase() === acronym.join(""), {
      maxMatches: 1,
      time: 2 * 60 * 1000
    }
  );
  wordsCollector.on("end", (answers, reason) => {
    if (reason === "time") {
      const embed = new discord.RichEmbed()
        .setColor("#07a702")
        .setTitle("Acronism")
        .setDescription("The game was ended as no one was able to answer within the given 2 minutes.")
        .setFooter(`The answer was: ${acronym.join("").toUpperCase()}.`);
      message.channel.send(embed);
    } else if (reason === "matchesLimit") {
      const answer = answers.first();
      const rembed = new discord.RichEmbed()
        .setColor("#07a702")
        .setTitle("Acronism")
        .setDescription(`Congratulations ${answer.author}! You made it an acronym.`)
        .setFooter(`The answer was: ${acronym.join("").toUpperCase()}.`);
      message.channel.send(rembed);
    };
    activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["acroni", "acros"],
  permLevel: "User"
};
exports.help = {
  name: "acronism",
  category: "Playful",
  description: "Starts an Acronism game where you'll be given a sentence, and you must finds it correspondent acronym.",
  usage: "acronism"
};
