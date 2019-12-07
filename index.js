if (Number(process.version.slice(1).split(".")[0]) < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");
// Load up the discord.js library
const Discord = require("discord.js");
// We also load the rest of the things we need in this file:
const DBL = require("dblapi.js"); // We need this to power client.dbl
const {
  promisify
} = require("util"); // A built-in Node module
const readdir = promisify(require("fs").readdir); // For reading files
const Enmap = require("enmap"); // Enmap stands for "Enhanced Maps", a revamp of JavaScript's Map() function, but it's more dynamic, speedy, economic and "enhanced"
const ytdl = require("ytdl-core"); // For our music
const YouTube = require('simple-youtube-api'); // Also for our music
const {
  YouTubeAPIKey
} = require('./credentials.json'); // Do I have to repeat it gain ?
const NekosLifeAPI = require('nekos.life'); // Require the NekosLife API for RP Commands
const LolisLifeAPI = require('lolis.life'); // Require the LolisLife API for extraordinary commands
// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `useless`. Either way, when you see `client.something`,
// or `bot.something`, this is what we're refering to. Your client.
const client = new Discord.Client(); // Our client
//client.webhook = new Discord.WebhookClient("webhook id", "webhook token");
// Here we load the config file that contains our token and our prefix values.
client.config = require("./config.js"); // Our valuable config.js file
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix
// Require our logger
client.logger = require("./modules/Logger"); // Log the bot
// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.
require("./modules/functions.js")(client, ytdl); // Fetch the functions
client.starttime = new Date().getTime(); // To get info about PAMA's log time
// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Enmap(); // Commands
client.discord = Discord; // Discord itself
client.aliases = new Enmap(); // Command Aliases
client.youtube = new YouTube(YouTubeAPIKey); // YouTube Client
client.queue = new Map(); // Music Queue
client.afk = new Map(); // For sleeping members
client.votes = new Map(); // Vote Skip
client.bugs = new Enmap({
  name: 'bugreports'
}); // For submitted bugs
client.lolislife = new LolisLifeAPI(); // For the Loli API
//client.dbl = new DBL("your DBL token", client);
client.deardiaries = new Enmap({
  name: 'deardiaries'
}); // For the deardiary command
client.liusers = new Discord.Collection(); // A map containing the users of the bot
client.logins = new Enmap({
  name: 'logins'
}); // For the profile command, makes sure you're actually logged in
client.profiles = new Enmap({
  name: 'profiles'
}); // For the profiles
client.suggestions = new Enmap({
  name: "suggestions"
}); // For submitted bugs
client.settings = new Enmap({
  name: "settings"
}); // The settings inside config.js
client.nekoslife = new NekosLifeAPI(); // For the NejosLife API
// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.
client.items = new Enmap({
  name: 'glptmitems'
});
const init = async () => {
  // Here we load **commands** into memory, as a collection, so they're accessible
  // here and everywhere else.
  const cmdFiles = await readdir("./commands/");
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });
  // Then we load methods, which will have some extra functions for commands.
  const methodFiles = await readdir("./methods/");
  client.logger.log(`Loading a total of ${methodFiles.length} methods.`);
  methodFiles.forEach(file => {
    const methodName = file.split(".")[0];
    client.logger.log(`Loading Method: ${methodName}`);
    const method = require(`./methods/${file}`);
    // Bind the client to any event, before the existing arguments
    // provided by the discord.js event.
    client.on(methodName, method.bind(null, client));
  });
  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    // Bind the client to any event, before the existing arguments
    // provided by the discord.js event. 
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
  });
  client.on("message", (message) => {
    /*if(message.content === "PAMA") {
      let pamies = [`:green_heart:`, `MAMA`, `RAMA`, `Hai ^-^`, `PAMA-tastic`, `PAMA-tical`]
      message.channel.send(pamies.random());
    };*/
    /*if (message.content.includes(message.mentions.users.first())) {
if(message.author.bot) return;
      let first = client.afk.get(message.mentions.users.first());
      if (!first) return;
      let mentioned = first.id;
      if (mentioned) {
        if(message.author.bot) return;
        let embed = new Discord.RichEmbed()
        .setColor("#195080")
        .setTitle("Limbo :sparkles:")
        .setDescription(`<@!${mentioned.id}> is currently sleeping :full_moon_with_face:`);
message.channel.send(embed).then(msg => msg.delete(5000));
    }};*/
    //let afkcheck = client.afk.get(message.author.id);
    if (message.content === "PAMA Wake Up" || message.content === "PAMA wake up" || message.content === "PAMA Wake up" || message.content === "PAMA wake Up" || message.content === "PAMA WAKE UP" || message.content === "PAMA wake UP" || message.content === "PAMA wake Up" || message.content === "PAMA wakE Up") {
      if (!client.afk.get(message.author.id)) {
        if (message.author.bot) return;
        return; // message.reply("You're not even asleep.");
      };
      let dreams = ["going to the bathroom", "winning a lottery", "losing your family", "meeting PAMA in person", "finding true love", "being invited to a party", "going to outer space", "working with google", "being slapped by your grandmother", "reading an infinite book", "watching My Little Pony",
        "falling in a hole", "failing biology", "getting a good grade on mathematics", "exploding your own school", "marrying an AI", "being stuck in a well", "eating rotten food", "travelling in time", "farting in class", "being eaten by a whale", "playing a suicidal game", "losing in battle royale", "drowning in quicksand",
        "dehydrating inside a volcano", "being an object", "hiding in the closet", "massacring your sister", "throwing rocks at your neighbor's windows", "drowning in depression", "storming Area 51", "breaking the 4th wall", "entering the DC Universe", "being stung in the eye", "swimming in acid", "losing your compassion", "being chased by a murderer",
        "failing chemistry", "passing English class", "gaining a reputation as a hero", "being suspected in a mystery", "graduating high school", "getting a promotion", "being demoted to the lowest level in a company", "working as a farmer", "being made fun of by your BFF", "breaking with your BF/GF", "having a meeting with your ex", "writing a long peom",
        "developing a game", "going naked to a restaurant", "crying candy instead of tears", "diamond rain", "teaming up with Hitler", "invading the world", "becoming a disease", "wearing every clothing in the world", "burning your bed", "living inside a box", "performing surgery to your siblings", "working as a fire fighter", "fighting a bull"
      ];
      let dembed = new client.discord.RichEmbed()
        .setColor("#195080")
        .setTitle("Limbo :sparkles:")
        .setDescription("You came back from Limbo :sun_with_face:")
        .setFooter(`You had a dream about ${dreams.random()}`);
      return [client.afk.delete(message.author.id), message.channel.send(dembed).then(msg => msg.delete(15000))];
    };
  });
  // Generate a cache of client permissions for pretty perm names in commands.
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  };
  // Here we login the client.
  client.login(client.config.token);
  // End top-level async/await function.
};
init();
