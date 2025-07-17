const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "chai",
    alias: ["tea", "chaiya"],
    use: '.chai',
    desc: 'Serve hot chai with an image 🍵',
    category: 'fun',
    react: '☕',
    filename: __filename
},
async (conn, m, mdata, { from, sender }) => {
    const chaiQuotes = [
        "☕ Here's your chai, freshly brewed for the soul. 🌿",
        "Take a break, sip some chai, and let the stress fade away. 🍵✨",
        "Chai isn't just a drink, it's a feeling. ☕💫",
        "🫖 Warm hugs come in cups of chai.",
        "Tea time is me time. Enjoy your chai! 😌☕"
    ];

    const chaiImages = [
        "https://i.imgur.com/suQnkl2.jpg",
        "https://i.imgur.com/kKX1bLj.jpg",
        "https://i.imgur.com/VNKljQc.jpg",
        "https://i.imgur.com/TCmvW6T.jpg",
        "https://i.imgur.com/O8EmuAC.jpg"
    ];

    const quote = chaiQuotes[Math.floor(Math.random() * chaiQuotes.length)];
    const imageUrl = chaiImages[Math.floor(Math.random() * chaiImages.length)];

    await conn.sendMessage(from, {
        image: { url: imageUrl },
        caption: `🍵 *CHAI TIME* ☕\n\n${quote}`,
        mentions: [sender]
    }, {
        quoted: {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "NEXUS-XMD Verified User",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Chai;Time;;;\nFN:Chai Lover\nitem1.TEL;waid=${sender.split('@')[0]}:+${sender.split('@')[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`
                }
            }
        },
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363288304618280@newsletter',
                newsletterName: 'NEXUS-XMD TEA TIME',
                serverMessageId: 777
            }
        }
    });
});
