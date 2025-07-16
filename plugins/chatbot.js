const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');
const config = require('../config');

// Path to store chatbot enable/disable states
const chatbotDataPath = path.join(__dirname, '../lib/database/chatbot.json');

// Create file if it doesn't exist
if (!fs.existsSync(chatbotDataPath)) {
  fs.writeFileSync(chatbotDataPath, JSON.stringify({}));
}

// Load chatbot state
const chatbotData = JSON.parse(fs.readFileSync(chatbotDataPath));

cmd({
  pattern: "chatbot",
  alias: ["chat"],
  desc: "Toggle chatbot ON/OFF in group",
  category: "group",
  use: '.chatbot on/off',
  filename: __filename
},
async (conn, m, mdata, { args, isGroup, isAdmin, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups.");
  if (!isAdmin) return reply("🛑 Only group admins can toggle the chatbot.");

  const groupId = m.chat;
  const arg = args[0]?.toLowerCase();

  if (!arg || !["on", "off"].includes(arg)) {
    return reply("💡 Usage: .chatbot on / .chatbot off");
  }

  chatbotData[groupId] = (arg === "on");

  fs.writeFileSync(chatbotDataPath, JSON.stringify(chatbotData, null, 2));

  const status = chatbotData[groupId] ? "✅ Chatbot is now *ENABLED*" : "🚫 Chatbot is now *DISABLED*";

  await conn.sendMessage(m.chat, {
    text: status,
    contextInfo: {
      externalAdReply: {
        title: "NEXUS-XMD",
        body: "Chatbot Control",
        thumbnailUrl: config.LOGO,
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true,
        sourceUrl: "https://github.com/pkdriller0/NEXUS-XMD"
      },
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363288304618280@newsletter',
        newsletterName: 'NEXUS-XMD OFFICIAL',
      }
    }
  }, { quoted: {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "NEXUS-BOT",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:NEXUS-BOT\nORG:NEXUS-XMD;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`
      }
    }
  }});
});
