const { cmd } = require('../command');
const axios = require('axios');
const ytSearch = require('yt-search');

cmd({
  pattern: "play",
  alias: ["song", "ytmp3", "audio", "mp3"],
  desc: "Download YouTube audio via working APIs",
  category: "music",
  use: ".play < song name >",
  react: "⬇️"
}, async (conn, m, msg, { q }) => {
  try {
    if (!q) return msg.reply("❗Please provide a song name.\n\n_Example:_ `.play calm down`");

    const search = await ytSearch(q);
    if (!search.videos.length) return msg.reply("❌ No results found.");

    const video = search.videos[0];
    const videoUrl = video.url;
    const title = video.title;
    const [artist, songTitle] = title.includes(" - ") ? title.split(" - ", 2) : ["Unknown Artist", title];

    await msg.reply("⏳ Downloading audio...");

    const tryApi = async (url) => {
      try {
        const res = await axios.get(url);
        return res.data;
      } catch {
        return { success: false };
      }
    };

    const apis = [
      `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(videoUrl)}&apikey=gifted-md`,
      `https://www.dark-yasiya-api.site/download/ytmp3?url=${encodeURIComponent(videoUrl)}`,
      `https://api.dreaded.site/api/ytdl/video?query=${encodeURIComponent(videoUrl)}`
    ];

    let response;
    for (const url of apis) {
      const result = await tryApi(url);
      if (result?.success && result?.result?.download_url) {
        response = result;
        break;
      }
    }

    if (!response) return msg.reply("❌ All sources failed. Try again later.");

    const { download_url, thumbnail } = response.result;

    await conn.sendMessage(m.from, {
      audio: { url: download_url },
      mimetype: "audio/mp4",
      ptt: true,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "🎧 NEXUS-XMD AUDIO DOWNLOADER",
          body: `🎵 ${artist} - ${songTitle}`,
          mediaType: 1,
          thumbnailUrl: thumbnail || "https://telegra.ph/file/94f5c37a2b1d6c93a97ae.jpg",
          sourceUrl: videoUrl,
          renderLargerThumbnail: false,
          showAdAttribution: false
        },
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363295141350550@newsletter',
          newsletterName: 'NEXUS-XMD BOT',
          serverMessageId: 143
        }
      }
    }, {
      quoted: {
        key: {
          fromMe: false,
          participant: '0@s.whatsapp.net',
          remoteJid: 'status@broadcast'
        },
        message: {
          contactMessage: {
            displayName: "NEXUS Verified Bot",
            vcard: `
BEGIN:VCARD
VERSION:3.0
N:NEXUS;AI;;;
FN:NEXUS-XMD OFFICIAL
ORG:NEXUS-BOTS;
TEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000
END:VCARD`
          }
        }
      }
    });

  } catch (err) {
    console.error("Play Error:", err);
    msg.reply("❌ Error occurred: " + (err.message || err));
  }
});
