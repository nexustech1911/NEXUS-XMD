const { cmd } = require('../command');
const config = require('../config');
const moment = require('moment-timezone');

cmd({
    pattern: "deploy",
    alias: ["setup", "freebot"],
    use: '.deploy',
    desc: "Get deployment guide for NEXUS-XMD",
    category: "system",
    react: "🚀",
    filename: __filename
},
async (conn, m, mdata, { from, sender }) => {

    const deployText = `╭───────『 *🚀 NEXUS-XMD DEPLOY GUIDE* 』
│ *Bot:* NEXUS-XMD
│ *Owner:* PKDRILLER
│ *Repo:* github.com/PKDRILLER/NEXUS-XMD
╰────────────────────

📌 *STEP 1: Get Session*
Visit: 👉 https://nexus-md-session.vercel.app
Scan QR. Copy the session data.

📌 *STEP 2: Choose a Platform to Deploy*

───────────────
☁️ *HEROKU (Free Hosting)*
1. Go to:
   🔗 https://heroku.com/deploy?template=https://github.com/PKDRILLER/NEXUS-XMD
2. Click "Deploy App"
3. Paste your session in \`SESSION_ID\`
4. Wait for build → click "Open App"

───────────────
⚙️ *RENDER (Stable Uptime)*
1. Login → https://render.com
2. Fork this repo or paste link:
   🔗 https://github.com/PKDRILLER/NEXUS-XMD
3. Create new Web Service
4. Set Environment Variables:
   \`SESSION_ID\`, \`PORT\` = 3000
5. Deploy → Enjoy!

───────────────
🚂 *RAILWAY (Simple UI + Fast Deploy)*
1. Go to:
   🔗 https://railway.app/template/Wvukql
2. Click "Deploy Now"
3. Link GitHub + set environment \`SESSION_ID\`
4. Done. Start bot!

───────────────
💻 *REPLIT (Browser IDE)*
1. Visit:
   🔗 https://replit.com/github/PKDRILLER/NEXUS-XMD
2. Paste session in \`config.js\` or secrets
3. Click "Run"
4. Use Uptime Robot for 24/7

───────────────

🧠 *Need Help?* Contact owner or ask in support group.
_Updated: ${moment().tz(config.TIMEZONE).format('dddd, MMMM Do YYYY, h:mm A')}_
`;

    const fakeContact = {
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
TEL;type=CELL;type=VOICE;waid=254700000001:+254 700 000001
END:VCARD`
            }
        }
    };

    const contextInfo = {
        forwardingScore: 999,
        isForwarded: true,
        mentionedJid: [sender],
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363288304618280@newsletter',
            newsletterName: 'NEXUS-XMD DEPLOY UPDATES',
            serverMessageId: 110
        }
    };

    await conn.sendMessage(from, { text: deployText, contextInfo }, { quoted: fakeContact });
});
