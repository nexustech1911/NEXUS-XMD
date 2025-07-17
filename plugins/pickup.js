const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "pickup",
    alias: ["pickupline", "flirt"],
    category: "fun",
    desc: "Send a random pickup line.",
    use: ".pickup",
    filename: __filename,
    react: "💌"
}, async (conn, m, { sender }) => {

    const pickupLines = [
        "Are you a magician? Because whenever I look at you, everyone else disappears. ✨",
        "Do you have a map? I just got lost in your eyes. 🗺️👀",
        "Is your name Google? Because you’ve got everything I’m searching for. 🔍❤️",
        "Do you believe in love at first sight, or should I walk by again? 😏",
        "If beauty were time, you’d be an eternity. ⏳💫",
        "I’m not a photographer, but I can picture us together. 📸💕",
        "Are you French? Because Eiffel for you. 🗼😍",
        "Are you Wi-Fi? Because I'm feeling a strong connection. 📶💞",
        "If you were a vegetable, you’d be a cutecumber. 🥒🥰",
        "I must be a snowflake, because I’ve fallen for you. ❄️💘"
    ];

    const quoteMsg = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            remoteJid: "status@broadcast"
        },
        message: {
            contactMessage: {
                displayName: "NEXUS-XMD Verified Bot",
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;NEXUS-XMD;;;\nFN:NEXUS-XMD\nitem1.TEL;waid=254700000000:+254700000000\nitem1.X-ABLabel:Official Bot\nEND:VCARD`
            }
        }
    };

    const contextInfo = {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363288304618280@newsletter',
            newsletterName: 'NEXUS-XMD UPDATES',
            serverMessageId: 108
        }
    };

    const line = pickupLines[Math.floor(Math.random() * pickupLines.length)];

    const msg = `┏━━━༺💌༻━━━┓
*✨ NEXUS PICKUP LINE ✨*
┗━━━━━━━━━━━━━━┛

${line}

💘 _Generated with love by NEXUS-XMD™_`;

    await conn.sendMessage(m.chat, {
        text: msg,
        contextInfo
    }, { quoted: quoteMsg });
});
