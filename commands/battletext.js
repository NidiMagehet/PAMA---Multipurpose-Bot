const activeChannels = [];
const methods = require("../methods/getRandomChar.js");
const isWord = require("is-word");
const englishWords = isWord("american-english");
let following = "";
let haha = "";
let hoho = "";
let hihi = "";
let hehe = "";
const discord = require("discord.js");
exports.run = async (client, message) => {
  const letter = await methods(true);
  if (activeChannels.includes(message.channel.id)) {
    return message.reply("A game is already starting, help follow the track first.");
  };
  activeChannels.push(message.channel.id);
  let question = new discord.RichEmbed()
    .setColor("#07a702")
    .setTitle("Battle Text")
    .setDescription(`Game started by ${message.author}, Make a word starting with \`${letter.toUpperCase()}\`.`)
    .setFooter("You have 1 minute to make a word.");
  message.channel.send(question);
  const wordsCollector = message.channel.createMessageCollector(
    msg => !msg.author.bot && msg.content.trim().toLowerCase() === letter.toLowerCase() + message.channel.lastMessage.content.replace(/\s/g, "").slice(1).toLowerCase(), {
      maxMatches: 1,
      time: 1 * 60 * 1000
    }
  );
  wordsCollector.on("end", (answers, reason) => {
    if (reason === "time") {
      let embed = new discord.RichEmbed()
        .setColor("#07a702")
        .setTitle("Battle Text")
        .setDescription("The game was ended as no one was able to answer within the given minute.")
        .setFooter("Score: 0");
      return message.channel.send(embed);
    } else if (reason === "matchesLimit") {
      let answer = answers.first();
      if (!validate(answers.first().toString())) {
        activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
        return message.channel.send("Sadly, alphanumeric characters/numbers are unallowed, you broke the game :green_heart:");
      };
      if (answers.first().toString().length < 3) {
        activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
        return message.channel.send("Words should be 3+ characters long, you broke the game :green_heart:");
      };
      if (englishWords.check(answers.first().toString().toLowerCase()) === false) {
        activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
        return message.channel.send(`\`${answers.first().toString().toProperCase()}\` isn't a real English word, you broke the game :green_heart:`);
      };
      let rembed = new discord.RichEmbed()
        .setColor("#07a702")
        .setTitle("Battle Text")
        .setDescription(`${answer.author} made \`${answers.first().toString().toProperCase()}\`\nThe next word should start with \`${answers.first().toString().slice(-1).toUpperCase()}\`.`)
        .setFooter("1/5 rounds completed.");
      message.channel.send(rembed);
      following = answers.first().toString().slice(-1);
      haha = answer.author.id;
      const mamaCollector = message.channel.createMessageCollector(
        msg => !msg.author.bot && msg.content.trim().toLowerCase() === following.toLowerCase() + answer.channel.lastMessage.content.replace(/\s/g, "").slice(1).toLowerCase(), {
          maxMatches: 1,
          time: 1 * 60 * 1000
        }
      );
      mamaCollector.on("end", (answers, reason) => {
        if (reason === "time") {
          let embed = new discord.RichEmbed()
            .setColor("#07a702")
            .setTitle("Battle Text")
            .setDescription("The game was ended as no one was able to answer within the given minute.")
            .setFooter("Score: 1");
          return message.channel.send(embed);
        } else if (reason === "matchesLimit") {
          let answer = answers.first();
          if (!validate(answers.first().toString())) {
            activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
            return message.channel.send("Sadly, alphanumeric characters/numbers are unallowed, you broke the game :green_heart:");
          };
          if (haha === answer.author.id) {
            activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
            return message.channel.send("You can't combo two words in a row, you broke the game :green_heart:");
          };
          if (answers.first().toString().length < 3) {
            activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
            return message.channel.send("Words should be 3+ characters long, you broke the game :green_heart:");
          };
          if (englishWords.check(answers.first().toString().toLowerCase()) === false) {
            activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
            return message.channel.send(`\`${answers.first().toString().toProperCase()}\` isn't a real English word, you broke the game :green_heart:`);
          };
          let rembed = new discord.RichEmbed()
            .setColor("#07a702")
            .setTitle("Battle Text")
            .setDescription(`${answer.author} made \`${answers.first().toString().toProperCase()}\`\nThe next word should start with \`${answers.first().toString().slice(-1).toUpperCase()}\`.`)
            .setFooter("2/5 rounds completed.");
          message.channel.send(rembed);
          following = answers.first().toString().slice(-1);
          hoho = answer.author.id;
          const babaCollector = message.channel.createMessageCollector(
            msg => !msg.author.bot && msg.content.trim().toLowerCase() === following.toLowerCase() + answer.channel.lastMessage.content.replace(/\s/g, "").slice(1).toLowerCase(), {
              maxMatches: 1,
              time: 1 * 60 * 1000
            }
          );
          babaCollector.on("end", (answers, reason) => {
            if (reason === "time") {
              let embed = new discord.RichEmbed()
                .setColor("#07a702")
                .setTitle("Battle Text")
                .setDescription("The game was ended as no one was able to answer within the given minute.")
                .setFooter("Score: 2");
              return message.channel.send(embed);
            } else if (reason === "matchesLimit") {
              let answer = answers.first();
              if (!validate(answers.first().toString())) {
                activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
                return message.channel.send("Sadly, alphanumeric characters/numbers are unallowed, you broke the game :green_heart:");
              };
              if (hoho === answer.author.id) {
                activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
                return message.channel.send("You can't combo two words in a row, you broke the game :green_heart:");
              };
              if (answers.first().toString().length < 3) {
                activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
                return message.channel.send("Words should be 3+ characters long, you broke the game :green_heart:");
              };
              if (englishWords.check(answers.first().toString().toLowerCase()) === false) {
                activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
                return message.channel.send(`\`${answers.first().toString().toProperCase()}\` isn't a real English word, you broke the game :green_heart:`);
              };
              let rembed = new discord.RichEmbed()
                .setColor("#07a702")
                .setTitle("Battle Text")
                .setDescription(`${answer.author} made \`${answers.first().toString().toProperCase()}\`\nThe next word should start with \`${answers.first().toString().slice(-1).toUpperCase()}\`.`)
                .setFooter("3/5 rounds completed.");
              message.channel.send(rembed);
              following = answers.first().toString().slice(-1);
              hihi = answer.author.id;
            };
            const papaCollector = message.channel.createMessageCollector(
              msg => !msg.author.bot && msg.content.trim().toLowerCase() === following.toLowerCase() + answer.channel.lastMessage.content.replace(/\s/g, "").slice(1).toLowerCase(), {
                maxMatches: 1,
                time: 1 * 60 * 1000
              }
            );
            papaCollector.on("end", (answers, reason) => {
              if (reason === "time") {
                let embed = new discord.RichEmbed()
                  .setColor("#07a702")
                  .setTitle("Battle Text")
                  .setDescription("The game was ended as no one was able to answer within the given minute.")
                  .setFooter("Score: 3");
                return message.channel.send(embed);
              } else if (reason === "matchesLimit") {
                let answer = answers.first();
                if (!validate(answers.first().toString())) {
                  activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
                  return message.channel.send("Sadly, alphanumeric characters/numbers are unallowed, you broke the game :green_heart:");
                };
                if (hihi === answer.author.id) {
                  activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
                  return message.channel.send("You can't combo two words in a row, you broke the game :green_heart:");
                };
                if (answers.first().toString().length < 3) {
                  activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
                  return message.channel.send("Words should be 3+ characters long, you broke the game :green_heart:");
                };
                if (englishWords.check(answers.first().toString().toLowerCase()) === false) {
                  activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
                  return message.channel.send(`\`${answers.first().toString().toProperCase()}\` isn't a real English word, you broke the game :green_heart:`);
                };
                let rembed = new discord.RichEmbed()
                  .setColor("#07a702")
                  .setTitle("Battle Text")
                  .setDescription(`${answer.author} made \`${answers.first().toString().toProperCase()}\`\nThe next word should start with \`${answers.first().toString().slice(-1).toUpperCase()}\`.`)
                  .setFooter("4/5 rounds completed.");
                message.channel.send(rembed);
                following = answers.first().toString().slice(-1);
                hehe = answer.author.id;
                const papaCollector = message.channel.createMessageCollector(
                  msg => !msg.author.bot && msg.content.trim().toLowerCase() === following.toLowerCase() + answer.channel.lastMessage.content.replace(/\s/g, "").slice(1).toLowerCase(), {
                    maxMatches: 1,
                    time: 1 * 60 * 1000
                  }
                );
                papaCollector.on("end", (answers, reason) => {
                  if (reason === "time") {
                    let embed = new discord.RichEmbed()
                      .setColor("#07a702")
                      .setTitle("Battle Text")
                      .setDescription("The game was ended as no one was able to answer within the given minute.")
                      .setFooter("Score: 4");
                    return message.channel.send(embed);
                  } else if (reason === "matchesLimit") {
                    let answer = answers.first();
                    if (!validate(answers.first().toString())) {
                      activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
                      return message.channel.send("Sadly, alphanumeric characters/numbers are unallowed, you broke the game :green_heart:");
                    };
                    if (hehe === answer.author.id) {
                      activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
                      return message.channel.send("You can't combo two words in a row, you broke the game :green_heart:");
                    };
                    if (answers.first().toString().length < 3) {
                      activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
                      return message.channel.send("Words should be 3+ characters long, you broke the game :green_heart:");
                    };
                    if (englishWords.check(answers.first().toString().toLowerCase()) === false) {
                      activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
                      return message.channel.send(`\`${answers.first().toString().toProperCase()}\` isn't a real English word, you broke the game :green_heart:`);
                    };
                    let rembed = new discord.RichEmbed()
                      .setColor("#07a702")
                      .setTitle("Battle Text")
                      .setDescription("Congratulations :tada:\nYou have successfully finished the 5 rounds and beaten the game :trophy:")
                      .setFooter("5/5 rounds completed.");
                    message.channel.send(rembed);
                  };
                });
              };
            });
          });
        };
      });
    };
    activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
  });
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["btltxt", "battletxt", "btxt", "battlet"],
  permLevel: "User"
};
exports.help = {
  name: "battletext",
  category: "Playful",
  description: "Starts a BattleText game, where you'll have to give a word starting with the given letter.",
  usage: "battletext"
};
/**
 * Checks if the string only contains Alphabets, return true if no, returns false if yes.
 */
function validate(toValidate) {
  //Regex for Valid Characters i.e. Alphabets.
  var regex = /^[A-Za-z]+$/;
  //Validate TextBox value against the Regex.
  var isValid = regex.test(toValidate);
  if (!isValid) {
    return false;
  };
  return true;
};
