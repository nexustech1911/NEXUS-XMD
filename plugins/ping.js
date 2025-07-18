const config = require('../config');
const { cmd } = require('../command');
const moment = require('moment-timezone');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "ping",
    alias: ["speed", "pong"],
    use: '.ping',
    desc: "Show cinematic ping test.",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender }) => {
    try {
        const start = new Date().getTime();

        // React to trigger
        await conn.sendMessage(from, {
            react: { text: '⚡', key: mek.key }
        });

        // Phase 1: Send emoji spam animations
        const frames = ['🟢', '🟡', '🔴', '🟣', '⚪', '⚫', '🟤', '🔵', '🟠'];
        const msgs = [];

        for (let i = 0; i < 5; i++) {
            const msg = await conn.sendMessage(from, {
                text: `⚙️ SYSTEM PULSE: ${frames[Math.floor(Math.random() * frames.length)]} ${frames[Math.floor(Math.random() * frames.length)]} ${frames[Math.floor(Math.random() * frames.length)]}`,
                edit: mek.key
            });
            msgs.push(msg.key);
            await new Promise(resolve => setTimeout(resolve, 600)); // 0.6 sec delay
        }

        // Phase 2: Send hacking simulation
        const loadingMessages = [
            '🔍 Breaching firewall...',
            '💾 Injecting ping protocol...',
            '📡 Accessing NEXUS core...',
            '⚙️ Finalizing connection...'
        ];

        for (const line of loadingMessages) {
            const msg = await conn.sendMessage(from, { text: line });
            msgs.push(msg.key);
            await new Promise(resolve => setTimeout(resolve, 700));
        }

        // Delete all previous animated messages
        for (const key of msgs) {
            await conn.sendMessage(from, { delete: key });
        }

        const end = new Date().getTime();
        const speed = end - start;
        const time = moment.tz(config.TIME_ZONE).format("hh:mm A");
        const date = moment.tz(config.TIME_ZONE).format("DD MMMM, YYYY");
        const uptime = runtime(process.uptime());

        const text = `
🎯 *NEXUS-XMD PING STATS*

📶 *Speed:* _${speed}ms_
⏳ *Uptime:* _${uptime}_
🕓 *Time:* _${time}_
📅 *Date:* _${date}_

⚡ *Powered by NEXUS-AI* ⚡
`.trim();

        // Fake contact to quote
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
            text,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363288304618280@newsletter',
                    newsletterName: "NEXUS-XMD UPDATES",
                    serverMessageId: 143
                }
            }
        }, { quoted: fakeContact });

    } catch (e) {
        console.error("Ping Error:", e);
        await conn.sendMessage(from, { text: `❌ *Ping failed:* ${e.message}` });
    }
});
