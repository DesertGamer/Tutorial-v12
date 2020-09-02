const Discord = require("discord.js");
const moment = require("moment");
const ms = require("ms");

module.exports = {
  name: "tempban",
  aliases: ["tempban"],
  category: "Bot",
  description: "tempban",
  usage: "tempban",
  cooldown: 15000,
  run: async (bot, message, args, con) => {
        message.delete();
        if(message.channel.id != "701686541872922736") return;
        var banUser = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));
        if(!banUser) return message.channel.send(`Вы не указали пользователя для блокировки\n\nПравильное использование: /tempban [юзер] [время] [причина]`);
        if(banUser.id === message.author.id) return message.channel.send(`Вы не можете заблокировать сами себя\n\nПравильное использование: /tempban [юзер] [время] [причина]`);
        var time = args[1];
        if(!time) return message.channel.send(`Вы не указали время блокировки\n\nПравильное использование: /tempban [юзер] [время] [причина]`);
        var reason = args.slice(2).join(" ");
        if(ms(time) < 60000) return message.channel.send(`Вы указали время меньше 1-ой минуты\n\nПравильное использование: /tempban [юзер] [время] [причина]`);
        if(!reason) return message.channel.send(`Вы не указали причину блокировки\n\nПравильное использование: /tempban [юзер] [время] [причина]`);
        let embedchannel = new Discord.MessageEmbed()
        .setTitle(`Пользователь ${banUser.user.tag} был временно заблокирован от ${message.author.tag}`)
        .addField(`**Информация:**`, `**Заблокировал: ${message.author.tag}[\`ID: ${message.author.id}\`]\nПользователя: ${banUser.user.tag}[\`ID: ${banUser.id}\`]\nВремя: \`${time}\`**`)
        .addField(`**Причина:**`, `**\`${reason}\`**`)
        .setFooter(`Desert Cave Development | Offical Bot`, bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setTimestamp();
        await message.channel.send(embedchannel);
        let embedlog = new Discord.MessageEmbed()
        .setTitle(`Пользователь ${banUser.user.tag} был временно заблокирован от ${message.author.tag}`)
        .addField(`**Информация:**`, `**Заблокировал: ${message.author.tag}[\`ID: ${message.author.id}\`]\nПользователя: ${banUser.user.tag}[\`ID: ${banUser.id}\`]\nВремя: \`${time}\`**`)
        .addField(`**Причина:**`, `**\`${reason}\`**`)
        .setFooter(`Desert Cave Development | Offical Bot`, bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setTimestamp();
        await message.guild.channels.cache.get("725302044902293589").send(embedlog);
        con.query(`INSERT INTO \"Bans\" (\"discord_id\",\"timeban\",\"curtime\",\"reason\") VALUES ('${banUser.id}','${ms(time)}','${Date.now()}', '${reason}')`)
        await message.guild.members.ban(banUser);
    }
}
