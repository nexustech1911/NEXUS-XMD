const { cmd } = require('../command');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');

cmd({
    pattern: "shazam",
    desc: "Identify music from a voice/audio message.",
    category: "music",
    use: '.shazam (reply to audio)',
    filename: __filename,
    react: "🎶"
},
async (conn, m, msg, { from, quoted, reply, sender }) => {
    try {
        if (!quoted || !quoted.message || !/audio|video/.test(quoted.mtype)) {
            return reply("🎧 *Please reply to an audio or voice message to identify the song.*");
        }

        const mediaBuffer = await conn.downloadMediaMessage(quoted);
        const filePath = './tmp_audio.mp3';
        fs.writeFileSync(filePath, mediaBuffer);

        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));

        const { data } = await axios.post('https://api.davidcyril.tech/shazam/recognize', form, {
            headers: form.getHeaders()
        });

        fs.unlinkSync(filePath);

        if (!data || !data.status || !data.result) {
            return reply("❌ Couldn't recognize that audio. Try a clearer version.");
        }

        const {
            title,
            artists,
            album,
            release_date,
            genres,
            label,
            youtube_link,
            thumbnail,
            isrc
        } = data.result;

        let ytLink = youtube_link;

        // If no direct YouTube link, search manually
        if (!ytLink && title) {
            const search = await ytsearch(`${title} ${artists || ''}`);
            if (search && search.video && search.video.length > 0) {
                ytLink = search.video[0].url;
            }
        }

        const caption = `
🎶 *SH💥ZAM RESULT*

📌 *Title:* ${title || "Unknown"}
🧑‍🎤 *Artist:* ${artists || "Unknown"}
💽 *Album:* ${album || "N/A"}
📆 *Released:* ${release_date || "Unknown"}
🏷️ *Genre:* ${genres || "N/A"}
🏢 *Label:* ${label || "N/A"}
🎧 *ISRC:* ${isrc || "N/A"}
🔗 *Link:* ${ytLink || "Not available"}

— *NEXUS-XMD | Music Scanner™*
`.trim();

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
            image: { url: thumbnail || 'https://telegra.ph/file/957b3936cd33381f56c0c.jpg' },
            caption,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: 'NEXUS-BOTS SUPPORT',
                    newsletterJid: '120363288304618280@newsletter',
                    serverMessageId: 191
                }
            }
        }, { quoted: fakeContact });

    } catch (e) {
        console.error("Shazam error:", e);
        reply("❌ Failed to recognize the song.");
    }
});
