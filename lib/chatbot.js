const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Load chatbot status
const chatbotPath = path.join(__dirname, '../lib/database/chatbot.json');
let chatbotData = fs.existsSync(chatbotPath) ? JSON.parse(fs.readFileSync(chatbotPath)) : {};

module.exports = async (conn, m) => {
  try {
    const { text, from, isGroup, sender } = m;

    if (!text || !isGroup) return;
    if (!chatbotData[from]) return; // Chatbot must be enabled for this group
    if (m.key.fromMe || m.isBot || m.quoted) return;

    // Use Affiliate+ Chatbot API (can be replaced with Groq/OpenAI)
    const response = await axios.get(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(text)}&name=NEXUS-XMD&owner=Driller`);
    const replyText = response?.data?.reply || "I couldn't understand that.";

    await conn.sendMessage(from, {
      text: replyText,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363288304618280@newsletter',
          newsletterName: 'NEXUS-XMD OFFICIAL'
        }
      }
    }, { quoted: m });

  } catch (err) {
    console.error("🤖 Chatbot error:", err);
  }
};
