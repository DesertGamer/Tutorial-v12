const discord = require("discord.js");
const fs = require("fs");
const bot = new discord.Client();
const { Client } = require('pg');
const botconfig = require("../botconfig.json");
const moment = require("moment");
const ms = require("ms");

bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();
cooldowns = new discord.Collection();

const con = new Client({
  user: `${botconfig.user}`,
  host: `${botconfig.ip}`,
  database: `${botconfig.database}`,
  password: `${botconfig.password}`,
})
con.connect(err => {
  if (err) throw err; 
  console.log(`[DATABASE] Подключение к базе данных успешно выполнено!`);
})

bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {require(`./DcdHandler/${handler}`)(bot);});

bot.on("ready", async() => {
  console.log(`[READY] Бот успешно запущен!`);
  setInterval(async() => {
    let guild = bot.guilds.cache.get(`694748513371816008`);
    con.query(`SELECT * FROM \"Bans\"`, async (err, result) => {
      if (err) {
        return;
    } else if (result.rowCount == 0) {
        return;
    }
    for (var i in result.rows) {
      let timeout = result.rows[i].timemute;
      let curtime = result.rows[i].curtime;
      let userid = result.rows[i].discord_id;
      if (curtime !== null && timeout - (Date.now() - curtime) > 0) return;
      guild.members.unban(userid, 'Истёк срок блокировки');
      con.query(`DELETE FROM \"Bans\" WHERE discord_id = \'${userid}\'`)
      console.log(`[SYSTEM] Пользователь ${userid} был разблокирован. Срок бана истёк!`);
    }
    })
  }, 60000)
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

bot.on("message", async (message) => {
  if (message.author.bot) return;//Если автор другой бот - нет.
  if (message.channel.type == "dm") return;//Если команда в личку - нет.
  if (message.guild.id != "694748513371816008") return;//Проверяем сервер
  let channelidea = bot.channels.cache.get(`701683705508266014`)
  if(message.channel.id === channelidea.id){
    if(message.author.id === "297577892156669954") return;
    message.delete();//Удаляем сообщение
    let embed = new discord.MessageEmbed()
    .setTitle(`Идея от ${message.author.tag}`)
    .setDescription(`**Суть идеи: \`${message.content}\`**`)
    .addField(`**Описание смайликов**`, `**👍 - хорошая идея\n\n👎 - плохая идея**`)
    .setThumbnail(message.author.avatarURL({format: 'png', dynamic: true, size: 1024}))
    .setTimestamp();
    channelidea.send("**Внимание! <@&701686578124423208> была предложена новая идея, рассмотрите её**", embed).then(async(msg) => {
      await msg.react("👍");
      await msg.react("👎");
    });
  }
  let prefix = `/`;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = bot.commands.get(cmd);
  if (!command) command = bot.commands.get(bot.aliases.get(cmd));
  if (command) {
    command.run(bot, message, args, con);
  }
});

bot.login(botconfig.tokendcd)