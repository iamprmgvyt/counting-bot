require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose');
const Count = require('./models/Count');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const prefix = '!';

client.once('ready', async () => {
  console.log(`✅ Bot đã đăng nhập dưới tên: ${client.user.tag}`);
  await mongoose.connect(process.env.MONGO_URI);
});

client.on('messageCreate', async (message) => {
  // Bỏ qua bot hoặc sai kênh
  if (message.author.bot || message.channel.id !== process.env.CHANNEL_ID) return;

  const number = parseInt(message.content);

  // 👇 Nếu tin nhắn là số
  if (!isNaN(number)) {
    const data = await Count.findOneAndUpdate(
      { guildId: process.env.GUILD_ID, channelId: process.env.CHANNEL_ID },
      {},
      { upsert: true, new: true }
    );

    // Không cho đếm 2 lần liên tiếp (nếu không bật freeMode)
    if (!data.freeMode && message.author.id === data.lastUserId) {
      return message.delete().catch(() => {});
    }

    // ✅ Đếm đúng
    if (number === data.currentNumber + 1) {
      data.currentNumber = number;
      data.lastUserId = message.author.id;
      await data.save();
      return message.react('✅');
    }

    // ❌ Đếm sai
    await message.react('❌');
    return message.delete().catch(() => {});
  }

  // 👇 Nếu là lệnh prefix (!)
  if (!message.content.startsWith(prefix)) return;

  const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/\s+/);

  // !setfree true/false
  if (cmd === 'setfree') {
    if (message.author.id !== process.env.OWNER_ID) {
      return message.reply('⛔ Bạn không có quyền dùng lệnh này.');
    }

    const value = args[0]?.toLowerCase();
    if (value !== 'true' && value !== 'false') {
      return message.reply('📌 Dùng: `!setfree true` hoặc `!setfree false`');
    }

    const data = await Count.findOneAndUpdate(
      { guildId: process.env.GUILD_ID, channelId: process.env.CHANNEL_ID },
      {},
      { upsert: true, new: true }
    );

    data.freeMode = value === 'true';
    await data.save();

    return message.reply(`✅ Đã bật chế độ tự do: **${data.freeMode}**`);
  }

  // !reset
  if (cmd === 'reset') {
    if (message.author.id !== process.env.OWNER_ID) {
      return message.reply('⛔ Bạn không có quyền dùng lệnh này.');
    }

    const data = await Count.findOneAndUpdate(
      { guildId: process.env.GUILD_ID, channelId: process.env.CHANNEL_ID },
      {},
      { upsert: true, new: true }
    );

    data.currentNumber = 0;
    data.lastUserId = null;
    await data.save();

    return message.reply('🔄 Đã reset bộ đếm về **0**.');
  }

  // !help
  if (cmd === 'help') {
    const embed = new EmbedBuilder()
      .setTitle('📘 Lệnh hỗ trợ')
      .setDescription(`
💬 **Nhắn số** để đếm

\`!setfree true/false\` – (chỉ chủ bot) Bật/tắt chế độ tự do
\`!reset\` – (chỉ chủ bot) Reset bộ đếm về 0
\`!help\` – Hiển thị hướng dẫn
      `)
      .setColor('Blue')
      .setFooter({ text: 'Vietnamese Counting Bot', iconURL: client.user.displayAvatarURL() });

    return message.reply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);