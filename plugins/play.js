const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "play",
  alias: ["ytmp3", "song"],
  desc: "Download YouTube song via gifted API",
  category: "music",
  use: ".play < song name >",
  react: "🎶"
}, async (conn, m, msg, { q }) => {
  try {
    if (!q) return msg.reply("🎵 Please provide the song name.\n_Example:_ `.play calm down`");

    msg.reply("🔍 Searching...");

    // 1. Search video via lightweight yt search API
    const search = await axios.get(`https://api.akuari.my.id/search/ytsearch?query=${encodeURIComponent(q)}`);
    const video = search.data.hasil[0];
    if (!video || !video.url) return msg.reply("❌ Song not found.");

    const yturl = video.url;

    // 2. Call giftedtech API
    const res = await axios.get(`https://api.giftedtech.co.ke/api/download/dlmp3?apikey=gifted&url=${encodeURIComponent(yturl)}`);
    const data = res.data;
    if (!data.status || !data.audio) return msg.reply("⚠️ API error. Song might not be downloadable.");

    // 3. Download audio
    const audioData = await axios.get(data.audio, { responseType: 'arraybuffer' });

    // 4. Send audio as PTT with fake verification & newsletter
    await conn.sendMessage(m.from, {
      audio: Buffer.from(audioData.data),
      mimetype: 'audio/mpeg',
      ptt: true,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: data.title,
          body: "NEXUS-XMD | YouTube MP3",
          thumbnailUrl: data.thumb,
          sourceUrl: yturl,
          mediaType: 2,
          renderLargerThumbnail: true,
          showAdAttribution: true
        },
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363128902636636@newsletter',
          newsletterName: 'NEXUS-XMD MUSIC',
          serverMessageId: 'msg1234'
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
            displayName: "NEXUS Verified 🎧",
            vcard: `
BEGIN:VCARD
VERSION:3.0
N:AI;NEXUS;;;
FN:NEXUS-XMD OFFICIAL
ORG:NEXUS-MUSIC;
TEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000
END:VCARD`
          }
        }
      }
    });

  } catch (err) {
    console.error(err);
    msg.reply("❌ Something went wrong. Try again later.");
  }
});
