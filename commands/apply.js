exports.run = async (client, message, args) => {
  const PAMAngry = client.emojis.get("545266671250833436");
  message.delete().catch();
  const em1 = "✅";
  const em2 = "❌";
  const em3 = "⚠";
  const user = message.author;
  const rolename = args.join(" ").split("/")[0];
  if (!rolename) return message.reply("Specify a role first.");
  const gRole = message.guild.roles.find(`name`, rolename);
  if (!gRole) return message.reply("Sadly, the role you're desiring is unavailable.");
  if (message.guild.member(user).roles.has(gRole.id)) return message.reply("You already have that role.");
  //let staffRole = message.guild.roles.find(`name`, 'Manager');
  const reason = args.join(" ").split("/")[1];
  if (!reason) return message.reply("You must provide a reason for your application\nIt is well-recommended to provide serious and rational context.");
  const appchannel = message.guild.channels.find(ch => ch.name === "pama-applications");
  if (!appchannel) return message.channel.send("Make a channel called \"pama-applications\"\nAnd please, Please... Make it a private channel for adequate application management.");
  const rembed = new client.discord.RichEmbed()
    .setColor("07a702")
    .addField("Applier's Name", `${message.author}`)
    .addField("Desired Role", rolename)
    .addField("Reason", reason);
  var ms = await appchannel.send(rembed);
  await ms.react(em1);
  await ms.react(em2);
  await ms.react(em3);
  //const collector = ms.createReactionCollector((reaction, user) => user !== bot.user,{max:1})
  const collector = ms.createReactionCollector((reaction, user) => user !== client.user, {
    max: 1
  });
  collector.on("collect", async (messageReaction) => {
    //if(message.guild.member.roles.some(r=>["Staff Manager", "Admininstrator", "Server Staff", "Admin"].includes(r.name)) ) {
    if (messageReaction.emoji.name == em1) {
      //if (!message.guild.member(user).roles.has(staffRole.id)) return;
      const bembed = new client.discord.RichEmbed()
        .setColor("#07a702")
        .setDescription(`Your application got accepted :tada:
The role you desired was ${rolename} :battery:
You applied in ${message.guild.name} ${PAMAngry}`);
      user.send(bembed);
      const embed = new client.discord.RichEmbed()
        .setDescription("The user has been accepted :tada:")
        .setColor("#07a702");
      message.guild.member(user).addRole(gRole).catch(err => message.channel.send("I couldn't add the role, perhaps because of lack of permissions or my role position."));
      appchannel.send(embed);
    } else if (messageReaction.emoji.name == em2) {
      const yembed = new client.discord.RichEmbed()
        .setColor("#07a702")
        .setDescription(`Your application got rejected :boom:
The role you desired was ${rolename} :battery:
You applied in ${message.guild.name} ${PAMAngry}`);
      user.send(yembed);
      const embed = new client.discord.RichEmbed()
        .setDescription("The user has been rejected :boom:")
        .setColor("#07a702");
      appchannel.send(embed);
    } else /*(collected.first().emoji.name == `${em1}`)*/ {
      const dmsEmbed = new client.discord.RichEmbed()
        .setColor("#07a702")
        .setDescription(`You have been warned for potential application rule breaking :skull:
The role you desired was ${rolename} :battery:
You applied in ${message.guild.name} ${PAMAngry}`);
      user.send(dmsEmbed);
      const embed = new client.discord.RichEmbed()
        .setDescription("The user has been warned and rejected :skull:")
        .setColor("#07a702");
      appchannel.send(embed);
    };
  });
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};
exports.help = {
  name: "apply",
  category: "Informative",
  description: "If you want to apply for a specific role, you can do it freely with the apply command.",
  usage: "apply [role]/[reason] (split them with /)"
};
