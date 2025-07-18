const { cmd } = require('../command');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');
const axios = require("axios");

cmd({
  pattern: "song7",
  alias: ["play7", "ytmp7", "audio7", "music7"],
  desc: "Download YouTube audio via multiple APIs",
  category: "music",
  use: '.song < title >',
  react: "🎶"
}, async (conn, m, msg, { q }) => {
  if (!q) return msg.reply("Please provide a song name.\n\n_Example:_ `.song calm down`");

  try {
    const results = await ytsearch(q);
    if (!results.status || !results.data.length) return msg.reply("❌ No result found.");

    let teks = `🎶 *Select one of the following:*`;
    results.data.slice(0, 3).forEach((v, i) => {
      teks += `\n\n${i + 1}. 🎵 *${v.title}*\n⏱️ ${v.duration} | 📺 ${v.views} views`;
    });
    teks += `\n\n_Reply with number 1 - 3_`;

    const sent = await msg.reply(teks);
    const incoming = await conn.awaitReply(m.from, sent.key.id, 15);

    if (!incoming || !/^[1-3]$/.test(incoming.body)) return msg.reply("❌ Invalid or no response received.");
    const choice = results.data[Number(incoming.body) - 1];
    const videoUrl = choice.url;
    const title = choice.title;

    msg.reply("⏳ Fetching audio...");

    const tryApi = async (url) => {
      try {
        const res = await axios.get(url);
        if (res.data?.result?.download_url) {
          return res.data.result.download_url;
        } else if (res.data?.link) {
          return res.data.link;
        }
      } catch {}
      return null;
    };

    const apis = [
      `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(videoUrl)}`,
      `https://www.dark-yasiya-api.site/download/ytmp3?url=${encodeURIComponent(videoUrl)}`,
      `https://api.dreaded.site/api/ytdl/video?query=${encodeURIComponent(videoUrl)}`
    ];

    let downloadLink;
    for (const url of apis) {
      downloadLink = await tryApi(url);
      if (downloadLink) break;
    }

    if (!downloadLink) return msg.reply("❌ All sources failed. Try again later.");

    await conn.sendMessage(m.from, {
      audio: { url: downloadLink },
      mimetype: 'audio/mp4',
      ptt: true
    });

  } catch (err) {
    console.error("SONG ERROR:", err);
    msg.reply("❌ Failed to process: " + err.message);
  }
});
