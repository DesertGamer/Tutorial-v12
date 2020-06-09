const discord = require("discord.js");
const fs = require("fs");
const bot = new discord.Client();
const { Client } = require('pg');
const botconfig = require("./botconfig.json");
const moment = require("moment");
const ms = require('parse-ms');

bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();
cooldowns = new discord.Collection();

fs.readdir("./events/", (err, files) => {files.forEach(file => {if (file.split(".").slice(-1)[0] !== "js") return;const event = require(`./events/${file}`);const eventName = file.split(" ")[0];const eName = file.split(" ")[1];console.log(`[ИВЕНТЫ] Ивент ${eventName + " " + eName} был успешно загружен!`);bot.on(eventName, event.bind(null, bot, con));});});

const con = new Client({user: `${botconfig.user}`,host: `${botconfig.ip}`,database: `${botconfig.database}`,password: `${botconfig.password}`,})
con.connect(err => {if (err) throw err; console.log(`[DATABASE] Подключение к базе данных успешно выполнено!`) })

bot.on("messageReactionAdd", async (messageReaction, user) => {
  let message = messageReaction.message;
  if(message.guild.id != "694748513371816008") return;
  let guildoff = bot.guilds.cache.get(`694748513371816008`);
  let channel = guildoff.channels.cache.get(`701667050694639727`);
  let member = guildoff.members.cache.get(user.id);
  if(channel.id === message.channel.id && message.id === "719470053216485407" && messageReaction.emoji.name === "🍎"){
    member.roles.add('694748513371816009')
  }
})

bot.on("messageReactionRemove", async (messageReaction, user) => {
  let message = messageReaction.message;
  if(message.guild.id != "694748513371816008") return;
  let guildoff = bot.guilds.cache.get(`694748513371816008`);
  let channel = guildoff.channels.cache.get(`701667050694639727`)
  let member = guildoff.members.cache.get(user.id);
  if(channel.id === message.channel.id && message.id === "719470053216485407" && messageReaction.emoji.name === "🍎"){
    member.roles.remove(`694748513371816009`)
  }
})

bot.on("message", async message => {
  if (message.author.bot) return;//Если автор другой бот - нет.
  if (message.channel.type == "dm") return;//Если команда в личку - нет.
});

bot.login(botconfig.tokendcd)