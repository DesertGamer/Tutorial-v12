module.exports = async (bot, con) => {
  const Discord = require(`discord.js`);
  const channel = bot.channels.cache.get(`701667050694639727`);
  if (channel) {
    const fetchedChannels = [channel];
    fetchedChannels.forEach(c => {
      c.messages.fetch(`719470053216485407`).then(collected => console.log(`[DEBUG] Найдено ${collected.size} сообщений в ${c.name}`))
    })
  }
};