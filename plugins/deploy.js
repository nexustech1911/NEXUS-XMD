const { cmd } = require('../command');
const config = require('../config');

cmd({
  pattern: "deploy",
  alias: ["setup", "freebot"],
  use: ".deploy",
  desc: "Step-by-step guide to deploy NEXUS-XMD bot.",
  category: "system",
  react: "🚀",
  filename: __filename
},
async (conn, m, mdata, { from, sender }) => {

  const text = `📦 *NEXUS-XMD FULL DEPLOYMENT GUIDE* 💯

🔐 *STEP 1: SCAN SESSION*
🟢 Go to: https://xmd-nexus-pair.onrender.com/
☑️ Scan the QR code to generate your SESSION_ID

━━━━━━━━━━━━━━

☁️ *HEROKU DEPLOYMENT*
🔗 https://heroku.com/deploy?template=https://github.com/nexustech1911/NEXUS-XMD

🔧 Steps:
1. Click the link above
2. Login or create a Heroku account
3. Scroll to config vars and set:
   • `SESSION_ID` = paste your session from Step 1
4. Click *Deploy App*
5. Wait until it's built → Click *Open App*

━━━━━━━━━━━━━━

⚙️ *RENDER DEPLOYMENT*
🔗 https://render.com  
🔗 https://github.com/nexustech1911/NEXUS-XMD

🔧 Steps:
1. Create an account at render.com
2. Fork the repo on GitHub
3. In Render dashboard → Create new Web Service
4. Connect your GitHub → Select the forked repo
5. In environment:
   • `SESSION_ID` = paste session
6. Click *Deploy*

━━━━━━━━━━━━━━

🚂 *RAILWAY DEPLOYMENT*
🔗 https://railway.app/template/Wvukql

🔧 Steps:
1. Click the Railway link
2. Create an account or sign in
3. Import project from template
4. Set environment:
   • `SESSION_ID` = your scanned session
5. Click *Deploy Project*

━━━━━━━━━━━━━━

💻 *REPLIT DEPLOYMENT*
🔗 https://replit.com/github/nexustech1911/NEXUS-XMD

🔧 Steps:
1. Open the link above
2. Click "Fork Repl"
3. Go to *Secrets (Lock icon)* on left panel
4. Add:
   • Key = `SESSION_ID`, Value = your session string
5. Click *Run* to start
6. For 24/7 uptime: use UptimeRobot or Koyeb

━━━━━━━━━━━━━━

📎 *GitHub Repo:* https://github.com/nexustech1911/NEXUS-XMD  
📞 *Support:* wa.me/254799056874 (PKDRILLER)

🧠 Need help? Join support group or DM owner.`;

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
      newsletterJid: '120363288304618280@newsletter',
      newsletterName: 'NEXUS-XMD DEPLOY UPDATES',
      serverMessageId: 114
    },
    externalAdReply: {
      title: 'DEPLOY NEXUS-XMD FREE',
      body: 'Step-by-step instructions for Heroku, Railway, Replit, Render.',
      mediaType: 1,
      previewType: 'PHOTO',
      thumbnailUrl: 'https://files.catbox.moe/v2la6u.jpg',
      sourceUrl: 'https://github.com/nexustech1911/NEXUS-XMD'
    }
  };

  await conn.sendMessage(from, {
    text,
    contextInfo
  }, { quoted });
});
