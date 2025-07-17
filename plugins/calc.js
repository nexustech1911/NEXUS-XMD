const config = require('../config');
const { cmd } = require('../command');
const moment = require('moment-timezone');

cmd({
    pattern: "calc",
    alias: ["calculator", "math"],
    use: '.calc <expression>',
    desc: "Calculate any math expression",
    category: "utilities",
    react: "🧮",
    filename: __filename
},
async (conn, m, { args, prefix, command, sender }) => {
    const q = args.join(" ");
    if (!q) return m.reply(`📌 Usage: ${prefix + command} 25+15*2`);

    try {
        const math = require('mathjs');
        const result = math.evaluate(q);

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
                title: `NEXUS-XMD CALCULATOR`,
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
                serverMessageId: 120
            }
        };

        await conn.sendMessage(m.chat, {
            text: `📌 Expression: \`\`\`${q}\`\`\`\n🧮 Answer: \`\`\`${result}\`\`\``,
            contextInfo
        }, { quoted: fakeContact });

    } catch (e) {
        m.reply("❌ Invalid Expression. Try something like:\n.calc (5+3)*2");
    }
});
