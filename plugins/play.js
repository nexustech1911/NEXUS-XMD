const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "play",
  alias: ["song", "ytmp3"],
  desc: "Download YouTube audio via giftedtech",
  category: "music",
  use: ".play < song name >",
  react: "🎶"
}, async (conn, m, msg, { q }) => {
  try {
    if (!q) return msg.reply("🎵 Please provide the song name.\n_Example:_ `.play calm down`");

    msg.reply("🔍 Searching song...");

    // Step 1: Search YouTube using Akuari API
    const search = await axios.get(`https://api.akuari.my.id/search/ytsearch?query=${encodeURIComponent(q)}`);
    const video = search.data.hasil[0];
    if (!video || !video.url) return msg.reply("❌ No video found.");

    const yturl = video.url;

    // Step 2: Get mp3 download info from giftedtech
    const api = `https://api.giftedtech.co.ke/api/download/ytmusic?apikey=gifted&quality=128&url=${encodeURIComponent(yturl)}`;
    const res = await axios.get(api);
    const data = res.data;

    if (!data.status || !data.result || !data.result.audio) {
      return msg.reply("⚠️ Failed to fetch song. API might be down.");
    }

    const { title, audio, thumbnail } = data.result;

    // Step 3: Download audio buffer
    const dl = await axios.get(audio, { responseType: 'arraybuffer' });

    // Step 4: Send as PTT with fake verified contact + newsletter
    await conn.sendMessage(m.from, {
      audio: Buffer.from(dl.data),
      mimetype: 'audio/mpeg',
      ptt: true,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title,
          body: "NEXUS-XMD | YouTube MP3 🎶",
          thumbnailUrl: thumbnail,
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

  } catch (e) {
    console.error(e);
    msg.reply("❌ Error occurred while processing. Try again later.");
  }
});
