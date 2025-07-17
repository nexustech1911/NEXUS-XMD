const { cmd } = require('../command');
const axios = require('axios');
const { getBuffer } = require('../lib/myfunc');

cmd({
    pattern: "web2zip",
    alias: ["w2z", "zipweb"],
    desc: "Convert a website to ZIP archive",
    category: "tools",
    use: '.web2zip <url>',
    filename: __filename
},
async (conn, m, mdata, { args, q, from, prefix, command }) => {
    try {
        if (!q) return m.reply(`🌐 *Website to ZIP*\n\nUsage:\n${prefix + command} https://example.com`);

        const res = await axios.get(`https://api.giftedtech.web.id/api/tools/web2zip?apikey=gifted&url=${encodeURIComponent(q)}`);
        const { url, message } = res.data;

        if (!url) return m.reply(`❌ Failed to generate ZIP. Reason: ${message || 'Unknown error'}`);

        const zipBuffer = await getBuffer(url);

        await conn.sendMessage(m.chat, {
            document: zipBuffer,
            mimetype: 'application/zip',
            fileName: `website.zip`,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363144007948371@newsletter',
                    newsletterName: 'NEXUS TOOLS HUB',
                    serverMessageId: 'web2zip-nexus'
                },
                externalAdReply: {
                    showAdAttribution: true,
                    title: "Website to ZIP Tool 🌍",
                    body: "Powered by GiftedTech",
                    thumbnailUrl: "https://telegra.ph/file/33f72cdd28980f1fbbbd6.jpg",
                    mediaType: 1,
                    mediaUrl: q,
                    sourceUrl: q
                }
            }
        }, { quoted: {
            key: {
                fromMe: false,
                participant: '0@s.whatsapp.net',
                remoteJid: 'status@broadcast'
            },
            message: {
                contactMessage: {
                    displayName: 'Gifted Verified',
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Gifted Verified\nORG:NEXUS-XMD Team\nTEL;type=CELL;type=VOICE;waid=254700000000:+254700000000\nEND:VCARD`
                }
            }
        }});

    } catch (err) {
        console.log(err);
        m.reply('❌ An error occurred while processing the website.');
    }
});
