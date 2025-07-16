const config = require('../config');
const { cmd } = require('../command');
const axios = require('axios');
const fetch = require('node-fetch');

cmd({
  pattern: "song",
  alias: ["play", "ytsong"],
  react: "🎶",
  desc: "Download & play music from YouTube",
  category: "main",
  use: '.song <name or yt url>',
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  if (!q) return await reply("🎵 Please provide a YouTube song name or link.");

  try {
    const res = await axios.get(`https://vihangayt.me/tools/ytplay?q=${encodeURIComponent(q)}`);
    const data = res.data.data;

    const downloadUrl = data.dl_link;
    const title = data.title;
    const duration = data.duration;
    const views = data.views || "Unknown";
    const author = data.channel;
    const thumb = data.thumb;
    const url = data.url;

    const quotedContact = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        remoteJid: "status@broadcast"
      },
      message: {
        contactMessage: {
          displayName: "NEXUS-XMD",
          vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:NEXUS-XMD\nORG:NEXUS BOTS;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000 000\nEND:VCARD'
        }
      }
    };

    const contextInfo = {
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363288304618280@newsletter',
        newsletterName: 'NEXUS-TECH MUSIC 🎧',
      },
      externalAdReply: {
        title,
        body: `Duration: ${duration}`,
        thumbnailUrl: thumb,
        mediaType: 2,
        mediaUrl: url,
        sourceUrl: url
      }
    };

    const ytmsg = `🎵 *Song Details*
🎶 *Title:* ${title}
⏳ *Duration:* ${duration}
👤 *Channel:* ${author}
👁️ *Views:* ${views}
🔗 *Link:* ${url}

*Choose download format:*
1. 📄 MP3 as Document  
2. 🎧 MP3 as Audio  
3. 🎙️ MP3 as Voice Note (PTT)

_Reply with 1, 2 or 3 to this message._`;

    const songmsg = await conn.sendMessage(from, {
      image: { url: thumb },
      caption: ytmsg,
      contextInfo
    }, { quoted: quotedContact });

    conn.ev.on("messages.upsert", async (msgUpdate) => {
      const msg = msgUpdate.messages[0];
      if (!msg.message || !msg.message.extendedTextMessage) return;

      const selected = msg.message.extendedTextMessage.text.trim();
      if (
        msg.message.extendedTextMessage.contextInfo &&
        msg.message.extendedTextMessage.contextInfo.stanzaId === songmsg.key.id
      ) {
        await conn.sendMessage(from, { react: { text: "⬇️", key: msg.key } });

        switch (selected) {
          case "1":
            await conn.sendMessage(from, {
              document: { url: downloadUrl },
              mimetype: "audio/mpeg",
              fileName: `${title}.mp3`,
              contextInfo
            }, { quoted: msg });
            break;

          case "2":
            await conn.sendMessage(from, {
              audio: { url: downloadUrl },
              mimetype: "audio/mpeg",
              contextInfo
            }, { quoted: msg });
            break;

          case "3":
            await conn.sendMessage(from, {
              audio: { url: downloadUrl },
              mimetype: "audio/mpeg",
              ptt: true,
              contextInfo
            }, { quoted: msg });
            break;

          default:
            await conn.sendMessage(from, {
              text: "*⚠️ Invalid option. Choose 1, 2, or 3.*"
            }, { quoted: msg });
        }
      }
    });

  } catch (e) {
    console.error(e);
    reply("❌ Failed to fetch song. Try another name or later.");
  }
});
