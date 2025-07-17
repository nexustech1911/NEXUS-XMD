const config = require('../config');
const { cmd } = require('../command');

cmd({
  pattern: "deploy",
  alias: ["setupbot", "installation"],
  use: ".deploy",
  desc: "Get bot repo, session, and deployment guide",
  category: "system",
  filename: __filename,
  react: "🚀"
}, async (conn, m, msg, { sender }) => {
  const repoLink = "https://github.com/pkdriller0/NEXUS-XMD"; // update to your real repo
  const sessionLink = "https://xmd-nexus-pair.onrender.com/;   // update to your session generator
  const guideText = `🚀 *NEXUS-XMD DEPLOYMENT GUIDE*\n
🔗 *GitHub Repo:* ${repoLink}
📦 *Session Link:* ${sessionLink}

⚙️ *How to Deploy:*
1. Get session from the link above.
2. Fork or clone the GitHub repo.
3. Paste your session ID in \`config.js\` or env panel.
4. Deploy using any of the platforms below:

🌐 *Deploy Options:*
🔹 Railway → https://railway.app
🔹 Render → https://render.com
🔹 Heroku → https://heroku.com
🔹 Replit → https://replit.com

📚 *Docs & Support:*
Need help? Ask in the support group or DM the owner +254794146821.

✅ Happy deploying!`;

  await conn.sendMessage(msg.from, {
    text: guideText,
    contextInfo: {
      mentionedJid: [sender],
      forwardingScore: 999,
      isForwarded: true,
      quotedMessage: {
        contactMessage: {
          displayName: "NEXUS-XMD SUPPORT",
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:NEXUS DEPLOYMENT\nORG:NEXUS-XMD PROJECT\nTEL;type=CELL;waid=254700000000:+254700000000\nEND:VCARD`
        }
      },
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363288304618280@newsletter",
        newsletterName: "NEXUS-XMD UPDATES",
        serverMessageId: 909
      }
    }
  }, { quoted: msg });
});
