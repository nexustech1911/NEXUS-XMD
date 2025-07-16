const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

cmd({
    pattern: "support",
    alias: ["version", "info"],
    desc: "Show bot support information",
    category: "allmenu",
    react: "🫅",
    filename: __filename
}, 
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const caption = `
╭─「 🤖 *NEXUS-XMD SUPPORT PANEL* 」
│
├ 🧠 *Mode:* ${config.MODE}
├ ⛓ *Prefix:* ${config.PREFIX}
├ 📦 *RAM:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem() / 1024 / 1024)}MB
├ ⏱ *Uptime:* ${runtime(process.uptime())}
├ 🛠 *Version:* V.5 ⚡
│
├──「 🔗 *Links & Resources* 」
│
├ 🌐 *Website:* 
│  https://pkdriller-web.vercel.app/ 
│
├ 📢 *Channel:* 
│   https://whatsapp.com/channel/0029Vad7YNyJuyA77CtIPX0x
│
├ 👥 *Support Group:* 
│   https://chat.whatsapp.com/CbY7YiuobJ1AlMJ8PviKpm
│
├ 💻 *GitHub Dev:* 
│   https://github.com/nexustech1911
│
├ 📁 *GitHub Repo:* 
│   https://github.com/nexustech1911/NEXUS-XMD
│
╰──────────────╯
${readMore}
`;

        // Fake verified contact
        const fakeContact = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "PK DRILLER 👨‍💻",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:PK DRILLER 👨‍💻\nORG:NEXUS TEAM;\nTEL;type=CELL;type=VOICE;waid=254794146821:+254 794 146821\nEND:VCARD`,
                    jpegThumbnail: Buffer.alloc(0),
                    isImportant: true
                }
            }
        }

        await conn.sendMessage(from, {
            image: { url: 'https://i.ibb.co/W4xhtdW8/nexus-xmd.jpg' },
            caption,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363288304618280@newsletter',
                    newsletterName: '『 ☣️ NEXUS-XMD 🦖 』',
                    serverMessageId: 143
                }
            }
        }, { quoted: fakeContact });

        // Send support theme PTT
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/nexustech1911/NEXUS-XMD-DATA/raw/refs/heads/main/music/drake.m4a' },
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: 'Join NEXUS SUPPORT',
                    body: 'Click to explore bot links',
                    thumbnailUrl: 'https://github.com/nexustech1911/NEXUS-XMD-DATA/raw/refs/heads/main/logo/1d694055a8e0c692f5cdf56027b12741.jpg',
                    mediaType: 2,
                    mediaUrl: 'https://github.com/pkdriller0/NEXUS-XMD',
                    sourceUrl: 'https://nexusbots.tech'
                }
            }
        }, { quoted: fakeContact });

    } catch (e) {
        console.error(e);
        reply(`❌ Error:\n${e.message}`);
    }
});
