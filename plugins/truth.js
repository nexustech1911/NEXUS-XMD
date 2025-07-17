const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "truth",
    alias: [],
    category: "fun",
    desc: "Get a random truth question.",
    use: ".truth",
    filename: __filename,
    react: "🫣"
}, async (conn, m, { sender }) => {

    const truths = [
        "What’s your biggest secret that you’ve never told anyone? 😶",
        "Have you ever lied to your best friend? 🤥",
        "What’s the most embarrassing thing you’ve ever done? 😳",
        "Who was your first crush? ❤️",
        "Have you ever cheated in school? 📚",
        "If you had to delete one app forever, which one would it be? 📱",
        "What’s your worst habit? 🙈",
        "Do you stalk your crush online? 👀",
        "Who do you like the most in this group? 👤",
        "What’s the last thing you searched on Google? 🔎"
    ];

    const quoteMsg = {
        key: {
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast"
        },
        message: {
            contactMessage: {
                displayName: "NEXUS-XMD Official",
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
            serverMessageId: 109
        }
    };

    const msg = `┏━━━━━━༺🫣༻━━━━━━┓
*🎤 TRUTH TIME!*
┗━━━━━━━━━━━━━━━━┛

🧠 *${truths[Math.floor(Math.random() * truths.length)]}*

💡 _Be honest... NEXUS-XMD is watching!_`;

    await conn.sendMessage(m.chat, {
        text: msg,
        contextInfo
    }, { quoted: quoteMsg });
});
