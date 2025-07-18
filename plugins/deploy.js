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

  const text = `
📦 *NEXUS-XMD FREE-DEPLOYMENT GUIDE FOLLOW STEPS BELOW💯*

📌 *STEP 1: Scan Session*
🔗 https://xmd-nexus-pair.onrender.com/

📌 *STEP 2: Choose Platform*

☁️ *HEROKU*
• Deploy: https://heroku.com/deploy?template=https://github.com/nexustech1911/NEXUS-XMD
• Add \`SESSION_ID\`
• Deploy and Open App

⚙️ *RENDER*
• Login: https://render.com
• Fork repo: https://github.com/nexustech1911/NEXUS-XMD
• Create Web Service
• Set env \`SESSION_ID\`
• Deploy

🚂 *RAILWAY*
• Deploy: https://railway.app/template/Wvukql
• Paste repo
• Set env \`SESSION_ID\`
• Deploy & run

💻 *REPLIT*
• Open: https://replit.com/github/nexustech1911/NEXUS-XMD
• Add \`SESSION_ID\` in Secrets
• Click Run
• Use UptimeRobot for 24/7

📎 *Repo:* https://github.com/nexustech1911/NEXUS-XMD
🧠 Need help? DM @PKDRILLER +254799056874 or join our support group.
`;

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
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363288304618280@newsletter",
      newsletterName: "NEXUS-XMD DEPLOY UPDATES",
      serverMessageId: 110
    }
  };

  await conn.sendMessage(from, {
    text,
    contextInfo,
    quoted
  });
});
