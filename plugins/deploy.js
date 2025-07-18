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

  const text = [
    '📦 *NEXUS-XMD FULL DEPLOYMENT GUIDE* 💯',
    '',
    '🔐 *STEP 1: SCAN SESSION*',
    '🔗 https://xmd-nexus-pair.onrender.com/',
    '',
    '━━━━━━━━━━━━━━',
    '',
    '☁️ *HEROKU DEPLOYMENT*',
    '🔗 https://heroku.com/deploy?template=https://github.com/nexustech1911/NEXUS-XMD',
    '1. Click the link above',
    '2. Login to Heroku',
    '3. In "Config Vars", add:',
    '   - SESSION_ID = (your session)',
    '4. Click "Deploy App"',
    '5. When done, click "Open App"',
    '',
    '━━━━━━━━━━━━━━',
    '',
    '⚙️ *RENDER DEPLOYMENT*',
    '🔗 https://render.com',
    '🔗 https://github.com/nexustech1911/NEXUS-XMD',
    '1. Login to Render',
    '2. Fork the repo on GitHub',
    '3. In Render dashboard, click "New Web Service"',
    '4. Connect your GitHub, select the repo',
    '5. In environment vars, add:',
    '   - SESSION_ID = (your session)',
    '6. Click "Deploy"',
    '',
    '━━━━━━━━━━━━━━',
    '',
    '🚂 *RAILWAY DEPLOYMENT*',
    '🔗 https://railway.app/template/Wvukql',
    '1. Click the link above',
    '2. Create account or sign in',
    '3. Paste the GitHub repo',
    '4. Set env var:',
    '   - SESSION_ID = (your session)',
    '5. Deploy and run',
    '',
    '━━━━━━━━━━━━━━',
    '',
    '💻 *REPLIT DEPLOYMENT*',
    '🔗 https://replit.com/github/nexustech1911/NEXUS-XMD',
    '1. Click the link above',
    '2. Click "Fork Repl"',
    '3. Open "Secrets" tab (🔒)',
    '4. Add:',
    '   - Key: SESSION_ID',
    '   - Value: your session',
    '5. Click "Run"',
    '6. For 24/7, use UptimeRobot',
    '',
    '━━━━━━━━━━━━━━',
    '',
    '📎 GitHub Repo: github.com/nexustech1911/NEXUS-XMD',
    '📞 Support: wa.me/254799056874'
  ].join('\n');

  const quoted = {
    key: {
      fromMe: false,
      participant: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast'
    },
    message: {
      contactMessage: {
        displayName: 'NEXUS-XMD SUPPORT',
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
      body: 'Step-by-step guide: Heroku, Render, Railway, Replit.',
      mediaType: 1,
      previewType: 'PHOTO',
      thumbnailUrl: 'https://i.imgur.com/y71HG4s.jpeg',
      sourceUrl: 'https://github.com/nexustech1911/NEXUS-XMD'
    }
  };

  await conn.sendMessage(from, {
    text,
    contextInfo
  }, { quoted });
});
