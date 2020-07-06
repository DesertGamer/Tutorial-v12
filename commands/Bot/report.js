const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "report",
  aliases: ["report"],
  category: "Bot",
  description: "Report",
  usage: "report",
  cooldown: 15000,
  run: async (bot, message, args, con) => {
        message.delete();
        if(message.channel.id != "701686541872922736") return;
        var reportUser = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));
        if(!reportUser) return message.reply(`Вы не указали пользователя!`);
        var reason = args.slice(1).join(" ");
        if(!reason) return message.reply(`Вы не указали причину!`);
        let reportchan = bot.channels.cache.get(`725302044902293589`);
        let embed = new Discord.MessageEmbed()
        .setTitle(`Жалоба на ${reportUser.user.tag} от ${message.author.tag}`)
        .addField(`**Информация:**`, `**Пользователь: ${message.author.tag}[\`ID: ${message.author.id}\`]\nПожаловался на: ${reportUser.user.tag}[\`ID: ${reportUser.id}\`]**`)
        .addField(`**Причина жалобы:**`, `**\`${reason}\`**`)
        .setFooter(`Desert Cave Development | Offical Bot`, bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setTimestamp();
        reportchan.send(embed)
    }
}
