const config = require('../config');
const { cmd } = require('../command');
const moment = require('moment-timezone');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "deploy",
    alias: ["freebot", "giveaway"],
    use: '.deploy',
    desc: "Stylish ping command with animated heartbeat.",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender }) => {
    try {
        const start = new Date().getTime();

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

        // Fake contact message to quote
        const fakeContact = {
            key: {
                fromMe: false,
                participant: '0@s.whatsapp.net',
                remoteJid: 'status@broadcast',
            },
            message: {
                contactMessage: {
                    displayName: "NEXUS SYSTEM",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:NEXUS SYSTEM\nORG:NEXUS-XMD;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`
                }
            }
        };

        await conn.sendMessage(from, {
            text: result,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363288304618280@newsletter',
                    newsletterName: "NEXUS-XMD SYSTEM STATUS",
                    serverMessageId: 666
                }
            }
        }, { quoted: fakeContact });

    } catch (e) {
        console.error("deploy Error:", e);
        await conn.sendMessage(from, { text: `❌ *deploy failed:* ${e.message}` });
    }
});
