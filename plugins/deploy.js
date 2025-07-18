const { cmd } = require('../command');
const moment = require('moment-timezone');
const config = require('../config');

cmd({
  pattern: "deploy",
  alias: ["setup", "freebot"],
  use: ".deploy",
  desc: "Guide to deploy NEXUS-XMD bot on various platforms.",
  category: "system",
  react: "🚀",
  filename: __filename
},
async (conn, m, mdata, { from, sender }) => {

  const deployGuide = `
📦 *NEXUS-XMD FREE DEPLOYMENT GUIDE 💯*

🔐 *STEP 1: SCAN SESSION*
🔗 https://xmd-nexus-pair.onrender.com/

🌐 *CHOOSE DEPLOYMENT METHOD:*

☁️ *HEROKU*
↪ https://heroku.com/deploy?template=https://github.com/nexustech1911/NEXUS-XMD
→ Add \`SESSION_ID\` → Deploy → Open App

⚙️ *RENDER*
↪ https://render.com
→ Fork: https://github.com/nexustech1911/NEXUS-XMD
→ Web Service → Add \`SESSION_ID\` → Deploy

🚂 *RAILWAY*
↪ https://railway.app/template/Wvukql
→ Paste repo → Add \`SESSION_ID\` → Deploy

💻 *REPLIT*
↪ https://replit.com/github/nexustech1911/NEXUS-XMD
→ Secrets: Add \`SESSION_ID\` → Click Run → Use UptimeRobot

📎 *Repo:* https://github.com/nexustech1911/NEXUS-XMD  
📨 *Support:* wa.me/254799056874`;

  const quoted = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "NEXUS-XMD SUPPORT",
        vcard: `
BEGIN:VCARD
VERSION:3.0
FN:NEXUS-XMD SUPPORT
ORG:NEXUS-XMD;
TEL;type=CELL;type=VOICE;waid=254700000001:+254700000001
END:VCARD`
      }
    }
  };

  const contextInfo = {
    mentionedJid: [sender],
    forwardingScore: 999,
    isForwarded: true,
    quoted,
    externalAdReply: {
      title: "NEXUS-XMD DEPLOY CENTER",
      body: "Click the links to start free hosting ⚡",
      mediaType: 1,
      previewType: "PHOTO",
      thumbnailUrl: "https://i.imgur.com/y71HG4s.jpeg",
      sourceUrl: "https://github.com/nexustech1911/NEXUS-XMD"
    },
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363288304618280@newsletter",
      newsletterName: "NEXUS-XMD DEPLOY UPDATES",
      serverMessageId: 111
    }
  };

  await conn.sendMessage(from, {
    text: deployGuide,
    contextInfo
  }, { quoted });
});
