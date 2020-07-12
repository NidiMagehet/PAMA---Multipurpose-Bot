exports.run = async (client, message, args) => {
    if (!args[0]) return message.reply('You shall give the mighty 8ball a question.');
    const outcomes = [
        "It's certain",
        "It's decidedly so",
        "Without a doubt",
        "Yes definitely",
        "You may rely on it",
        "As I see it, yes",
        "Most likely",
        "Outlook good",
        "Yes",
        "Signs point to yes",
        "Reply hazy try again",
        "Ask again later",
        "Better not tell you now",
        "Cannot predict now",
        "Concentrate and ask again",
        "Don't count on it",
        "My reply is no",
        "My sources say no",
        "Outlook not so good",
        "Very doubtful"
    ];
    if (message.content.endsWith("?")) {
        const embed = new client.discord.RichEmbed()
            .setColor("#07a702")
            .setTitle('According to the 8Ball')
            .setDescription(`🎱 ${outcomes.random()}`)
            .setFooter(`Executed by ${message.author.username}`, message.author.displayAvatarURL);
        message.channel.send(embed);
    } else return message.reply("The mighty 8ball denies inadequate syntax.");
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["8bll", "8b", "8ball"],
    permLevel: "User"
};
exports.help = {
    name: "8ball",
    category: "Social",
    description: "Ask it anything! It won't bite.",
    usage: "8ball <question>"
};
