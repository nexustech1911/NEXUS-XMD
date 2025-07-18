const config = require('../config');
const { cmd } = require('../command');
const moment = require('moment-timezone');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "ping",
    alias: ["speed", "pong"],
    use: '.ping',
    desc: "Stylish animated ping (no spam)",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender }) => {
    try {
        const start = new Date().getTime();

        const hearts = ['❤️‍🔥','💖','🩷','💚','💛','💙','🖤','🤍'];
        let current = 0;

        // Send first message
        let sentMsg = await conn.sendMessage(from, {
            text: hearts[current],
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

        // Animate heart emoji every 500ms
        const interval = setInterval(async () => {
            current = (current + 1) % hearts.length;
            await conn.sendMessage(from, {
                text: hearts[current],
                edit: sentMsg.key
            });
        }, 500);

        // Wait then stop animation & show final result
        setTimeout(async () => {
            clearInterval(interval);

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

            // Edit final result
            await conn.sendMessage(from, {
                text: result,
                edit: sentMsg.key,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363288304618280@newsletter',
                        newsletterName: "NEXUS-XMD SYSTEM STATUS",
                        serverMessageId: 666
                    },
                    externalAdReply: {
                        showAdAttribution: true,
                        mediaType: 1,
                        title: "📱 Wallpapers Channel",
                        body: "Click to follow our HD wallpapers 🖼️",
                        sourceUrl: "https://whatsapp.com/channel/0029VbAchaI59PwSijs6a81f",
                        thumbnailUrl: "https://i.imgur.com/3b1KX1i.jpeg"
                    }
                }
            });

        }, 4000); // Animation lasts 4 seconds

    } catch (e) {
        console.error("Ping Error:", e);
        await conn.sendMessage(from, { text: `❌ *Ping failed:* ${e.message}` });
    }
});
