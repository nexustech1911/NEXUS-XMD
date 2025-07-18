const { cmd } = require('../command');
const axios = require('axios');
const yts = require('yt-search');

cmd({
  pattern: "play8",
  alias: ["playyt", "ytplay8"],
  desc: "Search and download song with multi-source fallback",
  category: "Downloaders",
  use: ".play8 <song name>",
  filename: __filename
}, async (conn, m, text) => {
  if (!text) return m.reply("🎶 *Enter a song name to play.*");

  const fakeContact = {
    key: {
      fromMe: false,
      participant: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast'
    },
    message: {
      contactMessage: {
        displayName: "NEXUS Audio Channel",
        vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:NEXUS-XMD\nORG:NEXUS-XMD;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254700000000\nEND:VCARD"
      }
    }
  };

  try {
    const search = await yts(text);
    const video = search.videos[0];
    if (!video) return m.reply("❌ Song not found.");

    let audio = null;
    const apis = [
      `https://apis-keith.vercel.app/api/youtube/audio?url=${video.url}`,
      `https://api.siputzx.my.id/api/download/yta2?url=${video.url}`,
      `https://dreaded.site/api/dl/yta?url=${video.url}`
    ];

    for (let url of apis) {
      try {
        const res = await axios.get(url);
        audio = res.data.result || res.data.data || res.data;
        if (audio.audio || audio.audio_128 || audio.url) break;
      } catch (e) {
        console.log(`[API FAILED] ${url}`);
      }
    }

    if (!audio || (!audio.audio && !audio.audio_128 && !audio.url)) {
      return m.reply("❌ All APIs failed. Try again later.");
    }

    const audioUrl = audio.audio_128 || audio.audio || audio.url;

    await conn.sendMessage(m.chat, {
      audio: { url: audioUrl },
      mimetype: 'audio/mp4',
      ptt: false,
      fileName: `${video.title}.mp3`,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 1000,
        isForwarded: true,
        externalAdReply: {
          title: video.title,
          body: "🎧 Powered by NEXUS-XMD",
          thumbnailUrl: video.thumbnail,
          mediaType: 1,
          renderLargerThumbnail: true,
          sourceUrl: video.url
        },
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363288304618280@newsletter",
          newsletterName: "NEXUS-XMD MUSIC",
          serverMessageId: 801
        }
      },
      quoted: fakeContact
    });

  } catch (err) {
    console.error(err);
    return m.reply("❌ Failed to process your request.");
  }
});
