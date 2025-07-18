const config = require('../config');
const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "spotify",
    alias: ["spot", "spotdl"],
    use: '.spotify <song name>',
    desc: "Search and download Spotify song as MP3",
    category: "downloaders",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, sender, args, reply }) => {
    try {
        if (!args[0]) return reply("🎧 *Please provide a song name!*\n\nExample: `.spotify calm down`");

        const query = args.join(" ");
        const emoji = ['🎶', '🎧', '🎤', '🎼', '🎹'][Math.floor(Math.random() * 5)];

        await conn.sendMessage(from, {
            react: { text: emoji, key: mek.key }
        });

        // 1. Search song
        const search = await axios.get(`https://api.safone.dev/spotifysearch?q=${encodeURIComponent(query)}`);
        const result = search.data?.data[0];

        if (!result) return reply("❌ Song not found!");

        const songTitle = result.title;
        const artist = result.artist;
        const trackUrl = result.url;

        // 2. Get download URL
        const dl = await axios.get(`https://api.safone.dev/spotify?url=${trackUrl}`);
        const { download_url, thumbnail, album, duration } = dl.data;

        if (!download_url) return reply("⚠️ Couldn't get download link. Try again.");

        // 3. Fake quoted contact
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

        // 4. Send image with metadata
        await conn.sendMessage(from, {
            image: { url: thumbnail },
            caption: `
🎧 *Title:* ${songTitle}
🎤 *Artist:* ${artist}
💽 *Album:* ${album}
🕒 *Duration:* ${duration}
🔗 *Link:* ${trackUrl}
            `.trim(),
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363288304618280@newsletter',
                    newsletterName: "NEXUS-BOTS SUPPORT",
                    serverMessageId: 166
                }
            }
        }, { quoted: fakeContact });

        // 5. Send audio file
        await conn.sendMessage(from, {
            audio: { url: download_url },
            mimetype: 'audio/mp4',
            ptt: false,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                mentionedJid: [sender],
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363288304618280@newsletter',
                    newsletterName: "NEXUS-BOTS SUPPORT",
                    serverMessageId: 166
                }
            }
        });

    } catch (e) {
        console.error("Spotify Search Error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
