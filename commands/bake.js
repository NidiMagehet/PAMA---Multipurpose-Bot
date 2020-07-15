const tastes = ["It tasted good :thumbsup:", "It tasted bad :weary:", "It tasted majestic :stuck_out_tongue:", "It tasted ok :ok_hand:", "It made them sick :nauseated_face:", "It tasted like nothing :confused:", "It tasted extremely delicious :yum:"];
const pluralTastes = ["They tasted good :thumbsup:", "They tasted bad :weary:", "They tasted majestic :stuck_out_tongue:", "They tasted ok :ok_hand:", "They made them sick :nauseated_face:", "They tasted like nothing :confused:", "They tasted extremely delicious :yum:"];
let color = "";
let title = "";
let failedTitle = "";
let failedDesc = "";
exports.run = async (client, message, [food]) => { // eslint-disable-line no-unused-vars
    let desc = await tastes.random();
  if (!food) return message.reply("You need to bake something.");
  if (food.toLowerCase() === "bread") {
        color = "693307";
        title = "baked a loaf of bread :bread:";
        failedTitle = "tried making a loaf of bread";
        failedDesc = "But it got burnt :fire:";
  } else if (food.toLowerCase() === "hamburger") {
    color = "ae6800";
    title = "made a hamburger :hamburger:";
    failedTitle = "tried making a hamburger";
    failedDesc = "But the patty got burnt :fire:";
  } else if (food.toLowerCase() === "fries") {
    color = "e4b400";
    title = "fried some fries :fries:";
    desc = await pluralTastes.random();
    failedTitle = "tried making some fries";
    failedDesc = "But they were too fried :hot_face:";
  } else if (food.toLowerCase() === "hotdog") {
      color = "831f18";
      title = "made a hotdog :hotdog:";
      failedTitle = "tried making a hotdog";
      failedDesc = "But it wasn't edible enough :sweat:";
  } else if (food.toLowerCase() === "pizza") {
    color = "cfb958";
    title = "made a pizza :pizza:";
    failedTitle = "tried making a pizza";
    failedDesc = "But the cheese was rotten :cheese:";
  } else if (food.toLowerCase() === "spaghetti") {
    color = "e69f59";
    title = "made some spaghetti :spaghetti:";
    failedTitle = "tried making some spaghetti";
    failedDesc = "But they used spoiled meatballs :falafel:";
  } else if (food.toLowerCase() === "taco") {
    color = "e45a0d";
    title = "made a taco :taco:";
    failedTitle = "tried making a taco";
    failedDesc = "But it wasn't edible enough :sweat:";
  } else if (food.toLowerCase() === "burrito") {
    color = "D3F143";
    title = "made a burrito :burrito:";
    failedTitle = "tried making a burrito";
    failedDesc = "But it wasn't edible enough :sweat:";
  } else if (food.toLowerCase() === "stew") {
    color = "e69f59";
    title = "made some stew :stew:";
    failedTitle = "tried making some stew";
    failedDesc = "But it wasn't edible enough :sweat:";
  } else if (food.toLowerCase() === "sushi") {
    color = "ff91a4";
    title = "made a sushi :sushi:";
    failedTitle = "tried making a sushi";
    failedDesc = "But they used rotten fish :fish:";
  } else if (food.toLowerCase() === "icecream") {
    color = "d0fbf4";
    title = "made some ice cream :ice_cream:";
    failedTitle = "tried making some ice cream";
    failedDesc = "But it melted straight away :high_brightness:";
  } else if (food.toLowerCase() === "cake") {
    color = "00edff";
    title = "made a cake :cake:";
    failedTitle = "tried making a cake";
    failedDesc = "But they didn't put enough eggs :egg:";
  } else if (food.toLowerCase() === "chocolate") {
    color = "734d12";
    title = "made some chocolate :chocolate_bar:";
    failedTitle = "tried making some chocolate";
    failedDesc = "But it wasn't edible enough :sweat:";
  } else if (food.toLowerCase() === "cookie") {
    color = "693307";
    title = "made some cookies :cookie:";
    failedTitle = "tried making some cookies";
    failedDesc = "But they weren't crunchy enough :unamused:";
  } else if (food.toLowerCase() === "tea") {
    color = "31442c";
    title = "made a cup of tea :tea:";
    failedTitle = "tried making a cup of tea";
    failedDesc = "But they didn't add enough sugar :white_large_square:";
  } else if (food.toLowerCase() === "coffee") {
    color = "a84300";
    title = "made some coffee :coffee:";
    failedTitle = "tried making some coffee";
    failedDesc = "But it didn't have enough flavor :face_with_hand_over_mouth:";
  } else if (food.toLowerCase() === "salad") {
    color = "3a5739";
    title = "made a salad :salad:";
    failedTitle = "tried making a salad";
    failedDesc = "But the ingredients were rotten :broccoli:";
  } else if (food.toLowerCase() === "pancakes") {
      color = "923200";
      title = "made some pancakes :pancakes:";
      desc = await pluralTastes.random()
      failedTitle = "tried making some pancakes";
      failedDesc = "But they didn't bring any maple syrup :maple_leaf:";
  } else if (food.toLowerCase() === "food") {
      const embed = new client.discord.RichEmbed()
      .setColor(client.config.emotions.wisdom)
      .setDescription(":red_envelope: On today's menu we have:\nBread - Hamburger\nFries - Hotdog - Pizza\nSpaghetti - Taco\nBurrito - Stew\nSushi - IceCream\nCake - Chocolate\nCookie - Tea\nCoffee - Salad\nPancakes")
        .setFooter(`Asked by ${message.author.username}`, message.author.displayAvatarURL);
    return message.channel.send(embed);
  } else return message.channel.send("That's not something you can make,\npama!bake food could help.");
    if (Math.random() < 0.75) {
      const embed = new client.discord.RichEmbed()
        .setColor(color)
        .addField(`${message.author.username} ` + title, desc);
      message.channel.send(embed);
    } else {
      const embed = new client.discord.RichEmbed()
        .setColor(color)
        .addField(`${message.author.username} ` + failedTitle, failedDesc);
      message.channel.send(embed);
  };
};
exports.conf = {
  enabled: true,
  aliases: ["cook"],
  guildOnly: false,
  permLevel: "User"
};
exports.help = {
  name: "bake",
  category: "Playful",
  description: "Train yourself to bake sweet and delicious food.",
  usage: "bake [food]"
};
