const discord = require("discord.js");
const fs = require("fs");
const bot = new discord.Client();
const botconfig = require("./botconfig.json");
const moment = require("moment");
const ms = require('parse-ms');

bot.on("ready", async() => {
  const channel = bot.channels.cache.get(`701667050694639727`);
  if (channel) {
    const fetchedChannels = [channel];
    fetchedChannels.forEach(c => {
      c.messages.fetch(`725295846387613788`);
    })
  }
})

bot.on("messageReactionAdd", async (messageReaction, user) => {
  let message = messageReaction.message;
  let guildoff = bot.guilds.cache.get(`694748513371816008`);
  if(message.guild.id != guildoff.id) return;
  if(message.channel.id != "701667050694639727") return;
  if(messageReaction.emoji.id === "720728668485189768"){
    let member = message.guild.members.cache.get(user.id)
    let role = message.guild.roles.cache.get(`694748513371816009`)
    member.roles.add(role)
    let embed = new discord.MessageEmbed()
    .setTitle(`Выдача роли`)
    .setDescription(`**Вам была выдана роль \`${role.name}\` на сервере \`${message.guild.name}\`**`)
    .setThumbnail(member.user.avatarURL({format: 'png', dynamic: true, size: 1024}))
    .setTimestamp();
    member.send(embed);
  }
})

bot.on("messageReactionRemove", async (messageReaction, user) => {
  let message = messageReaction.message;
  let guildoff = bot.guilds.cache.get(`694748513371816008`);
  if(message.guild.id != guildoff.id) return;
  if(message.channel.id != "701667050694639727") return;
  if(messageReaction.emoji.id === "720728668485189768"){
    let member = message.guild.members.cache.get(user.id)
    let role = message.guild.roles.cache.get(`694748513371816009`)
    member.roles.remove(role)
    let embed = new discord.MessageEmbed()
    .setTitle(`Снятие роли`)
    .setDescription(`**Вам была снята роль \`${role.name}\` на сервере \`${message.guild.name}\`**`)
    .setThumbnail(member.user.avatarURL({format: 'png', dynamic: true, size: 1024}))
    .setTimestamp();
    member.send(embed);
  }
})

bot.login(botconfig.tokendcd)
