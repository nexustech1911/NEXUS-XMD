const config = require('../config');
const { cmd } = require('../command');
const moment = require('moment-timezone');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "ping",
    alias: ["speed", "pong"],
    use: '.ping',
    desc: "Stylish glitch-ping with emoji animation.",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender }) => {
    try {
        const start = new Date().getTime();

        // React
        await conn.sendMessage(from, {
            react: { text: '⚡', key: mek.key }
        });

        // 1️⃣ Animated Emoji Message
        const emojiFrames = [
            '❤️‍🔥', '💖💫', '🩷💀', '💚🧨', '💓🕳️', '🖤⚡', '💘🔮', '💙💥'
        ];

        // Send initial emoji frame
        const emojiMsg = await conn.sendMessage(from, {
            text: emojiFrames[0],
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363288304618280@newsletter',
                    newsletterName: "NEXUS-XMD SYSTEM STATUS",
                    serverMessageId: 777
                }
            }
        });

        // Continuously update emoji every second for animation effect
        for (let i = 1; i < emojiFrames.length; i++) {
            await new Promise(res => setTimeout(res, 800)); // Delay
            await conn.sendMessage(from, {
                text: emojiFrames[i],
                edit: emojiMsg.key // Edit same message
            });
        }

        // 2️⃣ Final Ping Info
        const end = new Date().getTime();
        const speed = end - start;
        const time = moment.tz(config.TIME_ZONE).format("hh:mm A");
        const date = moment.tz(config.TIME_ZONE).format("DD MMMM, YYYY");
        const uptime = runtime(process.uptime());

        const finalPing = `
╭─⟪ ⚙️ *NEXUS-XMD PING SYSTEM* ⚙️ ⟫─
│
├ 🔁 *Speed:* ${speed} ms
├ ⏱ *Uptime:* ${uptime}
├ 🕓 *Time:* ${time}
├ 📅 *Date:* ${date}
│
╰─⟪ 🧠 Powered by PK-DRILLER ⟫
        `.trim();

        // Fake Verified Contact Quote
        const fakeQuote = {
            key: {
                fromMe: false,
                participant: '0@s.whatsapp.net',
                remoteJid: 'status@broadcast'
            },
            message: {
                contactMessage: {
                    displayName: "NEXUS SYSTEM",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:NEXUS SYSTEM\nORG:NEXUS-XMD;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`
                }
            }
        };

        // Send final message
        await conn.sendMessage(from, {
            text: finalPing,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363288304618280@newsletter',
                    newsletterName: "NEXUS-XMD SYSTEM STATUS",
                    serverMessageId: 777
                }
            }
        }, { quoted: fakeQuote });

    } catch (e) {
        console.error("Ping Error:", e);
        await conn.sendMessage(from, { text: `❌ *Ping failed:* ${e.message}` });
    }
});
