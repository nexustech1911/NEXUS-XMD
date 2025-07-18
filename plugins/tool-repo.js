const config = require('../config');
const { cmd } = require('../command');
const axios = require('axios');
const ytSearch = require('yt-search');

cmd({
    pattern: "play6",
    alias: ["song6", "audio6", "playdoc6"],
    use: '.play <song name>',
    desc: "Download music from YouTube, SoundCloud, or Spotify",
    category: "downloaders",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, sender, args, reply }) => {
    try {
        if (!args[0]) return reply("🎵 *Please enter the name of the song!*");

        const query = args.join(" ");
        const emoji = ['🎵', '🎶', '🎧', '📻', '💽'][Math.floor(Math.random() * 5)];

        await conn.sendMessage(from, {
            react: { text: emoji, key: mek.key }
        });

        // PLATFORM SEARCH FUNCTIONS
        const searchYouTube = async (q) => {
            const { videos } = await ytSearch(q);
            return videos.length ? { platform: 'youtube', title: videos[0].title, url: videos[0].url, thumbnail: videos[0].thumbnail } : null;
        };
        const searchSpotify = async (q) => {
            const res = await axios.get(`https://apis-keith.vercel.app/search/spotify?q=${encodeURIComponent(q)}`);
            const r = res.data?.result?.[0];
            return r ? { platform: 'spotify', title: r.title, url: r.url, thumbnail: r.thumbnail, artist: r.artists } : null;
        };
        const searchSoundCloud = async (q) => {
            const res = await axios.get(`https://apis-keith.vercel.app/search/soundcloud?q=${encodeURIComponent(q)}`);
            const r = res.data?.result?.result?.find(t => t.timestamp);
            return r ? { platform: 'soundcloud', title: r.title, url: r.url, thumbnail: r.thumb } : null;
        };

        // DOWNLOAD FUNCTIONS
        const downloadYouTube = async (url) => {
            const res = await axios.get(`https://apis-keith.vercel.app/download/dlmp3?url=${encodeURIComponent(url)}`);
            const r = res.data?.result;
            return r?.downloadUrl ? { downloadUrl: r.downloadUrl, format: 'mp3' } : null;
        };
        const downloadSpotify = async (url) => {
            const res = await axios.get(`https://api.siputzx.my.id/api/d/spotify?url=${encodeURIComponent(url)}`);
            const r = res.data?.data;
            return r?.download ? { downloadUrl: r.download, format: 'mp3', artist: r.artis, thumbnail: r.image } : null;
        };
        const downloadSoundCloud = async (url) => {
            const res = await axios.get(`https://apis-keith.vercel.app/download/soundcloud?url=${encodeURIComponent(url)}`);
            const r = res.data?.result?.track;
            return r?.downloadUrl ? { downloadUrl: r.downloadUrl, format: 'mp3' } : null;
        };

        // DETECT PLATFORM
        let platforms = [];
        if (query.includes('youtube.com') || query.includes('youtu.be')) platforms.push('youtube');
        if (query.includes('soundcloud.com')) platforms.push('soundcloud');
        if (query.includes('spotify.com')) platforms.push('spotify');
        if (platforms.length === 0) platforms = ['youtube', 'soundcloud', 'spotify'];

        let track, downloadData;
        for (const platform of platforms) {
            try {
                const searchFn = { youtube: searchYouTube, soundcloud: searchSoundCloud, spotify: searchSpotify }[platform];
                track = await searchFn(query);
                if (!track) continue;

                const downloadFn = { youtube: downloadYouTube, soundcloud: downloadSoundCloud, spotify: downloadSpotify }[platform];
                downloadData = await downloadFn(track.url);
                if (downloadData) break;
            } catch (err) {
                console.log(`${platform} error:`, err.message);
            }
        }

        if (!track || !downloadData) return reply("❌ Couldn't find or download the song from any platform.");

        const artist = downloadData.artist || track.artist || 'Unknown Artist';
        const thumbnail = downloadData.thumbnail || track.thumbnail || '';
        const fileName = `${track.title} - ${artist}.${downloadData.format}`.replace(/[^\w\s.-]/gi, '');

        // Fake Verified Contact
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

        // Send Audio
        await conn.sendMessage(from, {
            audio: { url: downloadData.downloadUrl },
            mimetype: 'audio/mp4',
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363288304618280@newsletter',
                    newsletterName: "NEXUS-BOTS SUPPORT",
                    serverMessageId: 176
                }
            }
        }, { quoted: fakeContact });

        // Send As Document too
        await conn.sendMessage(from, {
            document: { url: downloadData.downloadUrl },
            mimetype: `audio/${downloadData.format}`,
            fileName: fileName,
            caption: `🎵 *${track.title}* by ${artist}`,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363288304618280@newsletter',
                    newsletterName: "NEXUS-BOTS SUPPORT",
                    serverMessageId: 176
                }
            }
        }, { quoted: fakeContact });

    } catch (e) {
        console.error("Play Command Error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
