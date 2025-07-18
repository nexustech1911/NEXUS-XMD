const config = require('../config');
const { cmd } = require('../command');
const moment = require('moment-timezone');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "ping",
    alias: ["speed", "pong"],
    use: '.ping',
    desc: "Stylish glitch-ping with emoji transformation.",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender }) => {
    try {
        const start = new Date().getTime();

        // React with ⚡
        await conn.sendMessage(from, {
            react: { text: '⚡', key: mek.key }
        });

        // 🔥 Phase 1: Glitch heart transformation
        const glitchHearts = [
            '❤️‍🔥', '💖💫', '🩷💀🖤', '💚🧨💛', '💓🕳️💘', '🖤⚡🤍'
        ];
        for (let i = 0; i < glitchHearts.length; i++) {
            await conn.sendMessage(from, {
                text: glitchHearts[i],
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
            });
            await new Promise(res => setTimeout(res, 600));
        }

        // 🔧 Final Ping Info
        const end = new Date().getTime();
        const speed = end - start;
        const time = moment.tz(config.TIME_ZONE).format("hh:mm A");
        const date = moment.tz(config.TIME_ZONE).format("DD MMMM, YYYY");
        const uptime = runtime(process.uptime());

        const result = `
┏━━━━━━⬣
┃ *🚀 NEXUS-XMD SYSTEM PING*
┃
┃ 📶 Speed: *${speed}ms*
┃ ⏱ Uptime: *${uptime}*
┃ 🕓 Time: *${time}*
┃ 📅 Date: *${date}*
┃
┃ 🌐 Powered by PK-DRILLER 🌐
┗━━━━━━⬣
        `.trim();

        // 📞 Fake verified contact quote
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
        console.error("Ping Error:", e);
        await conn.sendMessage(from, { text: `❌ *Ping failed:* ${e.message}` });
    }
});
