const config = require('../config');
const { cmd } = require('../command');
const moment = require('moment-timezone');
const axios = require('axios');

cmd({
    pattern: "calc",
    alias: ["calculator", "math"],
    use: '.calc <expression>',
    desc: "Calculate math expressions via API",
    category: "utilities",
    react: "🧮",
    filename: __filename
},
async (conn, m, { args, prefix, command, sender }) => {
    const q = args.join(" ");
    if (!q) return m.reply(`📌 Usage: ${prefix + command} 12*(5+3)`);

    const expression = encodeURIComponent(q);
    const apiUrl = `https://api.mathjs.org/v4/?expr=${expression}`;

    try {
        const { data } = await axios.get(apiUrl);

        const fakeContact = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "PKDRILLER",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:PKDRILLER\nORG:NEXUS-XMD;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254700000000\nEND:VCARD`
                }
            }
        };

        const contextInfo = {
            forwardingScore: 999,
            isForwarded: true,
            externalAdReply: {
                title: "NEXUS-XMD CALCULATOR",
                body: moment().tz(config.timezone).format("dddd, MMMM Do YYYY"),
                thumbnailUrl: config.LOGO,
                mediaType: 1,
                renderLargerThumbnail: true,
                sourceUrl: config.git
            },
            mentionedJid: [sender],
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363288304618280@newsletter',
                newsletterName: 'NEXUS-XMD UPDATES',
                serverMessageId: 201
            }
        };

        await conn.sendMessage(m.chat, {
            text: `🧮 *Calculation Result:*\n\n📌 Expression: \`\`\`${q}\`\`\`\n✅ Answer: \`\`\`${data}\`\`\``,
            contextInfo
        }, { quoted: fakeContact });

    } catch (err) {
        m.reply("❌ Error solving that. Try a valid expression like:\n.calc (3+7)^2");
    }
});
