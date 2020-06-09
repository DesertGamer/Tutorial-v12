const discord = require("discord.js");
const fs = require("fs");
const bot = new discord.Client();
const botconfig = require("./botconfig.json");
const moment = require("moment");
const ms = require('parse-ms');

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

bot.login(botconfig.tokendcd)
