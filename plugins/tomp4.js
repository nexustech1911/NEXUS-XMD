const { cmd } = require('../command');
const config = require('../config');
const { webp2mp4File } = require('../lib/uploader');
const moment = require('moment-timezone');

const commonContextInfo = (sender) => ({
    mentionedJid: [sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363288304618280@newsletter',
        newsletterName: 'NEXUS-XMD UPDATES',
        serverMessageId: 202
    }
});

cmd({
    pattern: "tomp4",
    alias: ["mp4"],
    desc: "Convert sticker/video to mp4",
    category: "converter",
    react: "🎥",
    filename: __filename
},
async (conn, mek, m, { from, sender, quoted, mime, reply }) => {
    try {
        if (!quoted) return reply("🎥 Please reply to a *sticker* or *video*.");
        if (!/webp|video/.test(quoted.mtype)) return reply("❌ Unsupported format. Only *sticker* or *video* allowed.");

        await reply("⏳ Converting to MP4, please wait...");

        let mp4Buffer;
        if (/webp/.test(mime)) {
            const media = await quoted.download();
            const result = await webp2mp4File(media);
            if (!result?.data?.url) return reply("❌ Failed to convert webp to mp4.");
            await conn.sendMessage(from, {
                video: { url: result.data.url },
                caption: "✅ Successfully converted to MP4!",
                contextInfo: commonContextInfo(sender)
            }, { quoted: {
                key: {
                    fromMe: false,
                    participant: "0@s.whatsapp.net",
                    remoteJid: "status@broadcast"
                },
                message: {
                    contactMessage: {
                        displayName: "NEXUS VERIFIED",
                        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:NEXUS-XMD\nORG:NEXUS SUPPORT;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`
                    }
                }
            } });
        } else if (/video/.test(mime)) {
            const media = await quoted.download();
            await conn.sendMessage(from, {
                video: media,
                caption: "✅ Re-sent video as MP4!",
                contextInfo: commonContextInfo(sender)
            }, { quoted: {
                key: {
                    fromMe: false,
                    participant: "0@s.whatsapp.net",
                    remoteJid: "status@broadcast"
                },
                message: {
                    contactMessage: {
                        displayName: "NEXUS VERIFIED",
                        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:NEXUS-XMD\nORG:NEXUS SUPPORT;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`
                    }
                }
            } });
        }

    } catch (e) {
        console.error(e);
        reply(`❌ Conversion error:\n${e.message}`);
    }
});
