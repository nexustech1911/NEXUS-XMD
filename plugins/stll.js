const config = require('../config');
const { cmd } = require('../command');
const axios = require('axios');
const { getBuffer } = require('../lib/myfunc');

cmd({
    pattern: "web2zip",
    alias: ["w2z", "zipweb"],
    use: '.web2zip <url>',
    desc: "Convert a website to ZIP archive",
    category: "tools",
    react: "🌐",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply, args, q }) => {
    try {
        const reactionEmojis = ['📦', '🌀', '🌐', '💻', '⚙️', '📁'];
        const textEmojis = ['📂', '📎', '🛠️', '💽', '🔗'];

        const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        await conn.sendMessage(from, {
            react: { text: textEmoji, key: mek.key }
        });

        if (!q || !q.startsWith("http")) {
            return reply(`🌐 *Website to ZIP*\n\nExample:\n.web2zip https://www.google.com`);
        }

        const api = `https://api.giftedtech.web.id/api/tools/web2zip?apikey=gifted&url=${encodeURIComponent(q)}`;
        const res = await axios.get(api);

        if (!res.data || !res.data.url) {
            return reply(`❌ Failed to generate ZIP file. ${res.data.message || 'Unknown error.'}`);
        }

        const zipBuffer = await getBuffer(res.data.url);

        const fakeContact = {
            key: {
                fromMe: false,
                participant: '0@s.whatsapp.net',
                remoteJid: 'status@broadcast',
            },
            message: {
                contactMessage: {
                    displayName: "GiftedTech Verified",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:GiftedTech Verified\nORG:NEXUS-XMD TOOLS;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`
                }
            }
        };

        await conn.sendMessage(from, {
            document: zipBuffer,
            fileName: `website.zip`,
            mimetype: 'application/zip',
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363288304618280@newsletter',
                    newsletterName: "NEXUS-BOTS SUPPORT",
                    serverMessageId: 209
                },
                externalAdReply: {
                    title: "🌐 Web to ZIP Converter",
                    body: "Powered by GiftedTech API",
                    mediaType: 1,
                    thumbnailUrl: "https://github.com/nexustech1911/NEXUS-XMD-DATA/raw/refs/heads/main/logo/1d694055a8e0c692f5cdf56027b12741.jpg",
                    sourceUrl: q
                }
            }
        }, { quoted: fakeContact });

    } catch (e) {
        console.error("Error in web2zip command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
