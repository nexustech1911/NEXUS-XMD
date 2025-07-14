const { cmd } = require('../command');
const config = require('../config');
const fs = require('fs');

cmd({
  pattern: "chatbot ?(.*)",
  desc: "Turn chatbot on or off",
  category: "general",
  use: ".chatbot on/off",
  filename: __filename
}, async (m, text, { quoted }) => {
  if (!text || (text !== 'on' && text !== 'off')) {
    return m.reply("⚙️ *Usage:* .chatbot on/off");
  }

  let newValue = text === 'on' ? 'true' : 'false';

  const envPath = './config.env';
  const content = fs.readFileSync(envPath, 'utf8');
  const updated = content.replace(/CHATBOT_MODE=.*/g, `CHATBOT_MODE=${newValue}`);
  fs.writeFileSync(envPath, updated);

  config.CHATBOT_MODE = newValue; // Update runtime config

  return m.reply(`🤖 Chatbot has been turned *${text.toUpperCase()}* for private chats.`);
});
          
