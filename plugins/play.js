const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "play",
  alias: ["song"],
  desc: "Download YouTube audio by title",
  category: "music",
  use: '.play < song name >',
  react: "🎧"
}, async (conn, m, msg, { q }) => {
  try {
    if (!q) return msg.reply("❗Please provide the song name, e.g., `.play calm down`");

    msg.reply("🔍 Searching, please wait...");

    // Step 1: Search with YT Data API via Voxy search (no need for yt-dl)
    const searchUrl = `https://api.voxyi.my.id/api/search/yt?query=${encodeURIComponent(q)}`;
    const searchRes = await axios.get(searchUrl);
    const video = searchRes.data.result[0];
    const yturl = video.url;

    // Step 2: Download audio using Voxy API
    const audioRes = await axios.get(`https://api.voxyi.my.id/api/dl/ytmp3?url=${yturl}`);
    const { title, audio, thumb } = audioRes.data;

    // Step 3: Send as PTT (audio)
    const dlAudio = await axios.get(audio, { responseType: 'arraybuffer' });
    
    await conn.sendMessage(m.from, {
      audio: Buffer.from(dlAudio.data),
      mimetype: 'audio/mp4',
      ptt: true,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: "NEXUS-XMD | YouTube Music",
          thumbnailUrl: thumb,
          sourceUrl: yturl,
          mediaType: 2,
          renderLargerThumbnail: true,
          showAdAttribution: true
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.log(e);
    msg.reply("⚠️ Error. Maybe song not found or API is temporarily down.");
  }
});
