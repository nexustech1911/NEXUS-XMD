const config = require('../config');
const { cmd } = require('../command');

cmd({
    pattern: "test",
    alias: ["check", "working"],
    use: '.test',
    desc: "Test if bot is responding correctly.",
    category: "main",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const emojiReact = ['✅', '📶', '🟢', '🔧', '🤖'][Math.floor(Math.random() * 5)];
        const emojiText = ['🧪', '⚙️', '🧠', '📡', '💻'][Math.floor(Math.random() * 5)];

        await conn.sendMessage(from, {
            react: { text: emojiText, key: mek.key }
        });

        const testText = `${emojiReact} *BOT IS WORKING PROPERLY!*\n\n💡 *NEXUS-XMD SYSTEM ONLINE*\n\n📍 Use .menu to view all commands.`;

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
            text: testText,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363288304618280@newsletter',
                    newsletterName: "NEXUS-BOTS SUPPORT",
                    serverMessageId: 199
                }
            }
        }, { quoted: fakeContact });

    } catch (e) {
        console.error("Error in test command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
