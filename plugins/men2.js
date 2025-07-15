const config = require('../config');
const { cmd } = require('../command');

cmd({
  pattern: "menu5",
  alias: ["menu2", "help"],
  desc: "Interactive button menu",
  category: "menu",
  react: "📚",
  filename: __filename
},
async (conn, mek, m, {
  from,
  pushname,
  sender,
  reply
}) => {
  try {
    const thumb = {
      url: "https://github.com/nexustech1911/NEXUS-XMD-DATA/raw/refs/heads/main/logo/Nexus-xmd.jpg"
    };

    const sections = [
      {
        title: "📥 Download Commands",
        rows: [
          { title: ".play / .play2", rowId: ".play song" },
          { title: ".video / .video2", rowId: ".video clip" },
          { title: ".apk / .img / .darama", rowId: ".apk app" },
          { title: ".fb / .tk / .ig / .twitter", rowId: ".fb link" },
          { title: ".gdrive / .mfire / .baiscope", rowId: ".gdrive file" }
        ]
      },
      {
        title: "🧸 Anime & Fun",
        rows: [
          { title: ".anime / .animegirl / .loli", rowId: ".anime" },
          { title: ".dog / .king / .yts", rowId: ".dog" },
          { title: ".joke / .fact", rowId: ".joke" }
        ]
      },
      {
        title: "🛠 Info & Tools",
        rows: [
          { title: ".ping / .system / .status", rowId: ".ping" },
          { title: ".owner / .about / .repo / .script", rowId: ".owner" },
          { title: ".ai / .define / .gpass / .srepo", rowId: ".ai" },
          { title: ".githubstalk", rowId: ".githubstalk" }
        ]
      },
      {
        title: "👥 Group Controls",
        rows: [
          { title: ".add / .kick / .remove / .delete", rowId: ".add" },
          { title: ".mute / .unmute / .lockgc / .unlockgc", rowId: ".mute" },
          { title: ".tagall / .hidetag / .jid / .ginfo", rowId: ".tagall" },
          { title: ".setwelcome / .setgoodbye / .disappear", rowId: ".setwelcome" },
          { title: ".joinrequests / .allreq", rowId: ".joinrequests" }
        ]
      },
      {
        title: "👑 Owner Panel",
        rows: [
          { title: ".update / .restart / .shutdown", rowId: ".update" },
          { title: ".block / .unblock / .clearchats", rowId: ".block" },
          { title: ".settings / .broadcast / .setpp", rowId: ".settings" },
          { title: ".jid / .gjid", rowId: ".jid" }
        ]
      },
      {
        title: "🔄 Convert Tools",
        rows: [
          { title: ".sticker", rowId: ".sticker" },
          { title: ".tts", rowId: ".tts" },
          { title: ".trt", rowId: ".trt" }
        ]
      }
    ];

    const vcardMsg = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        ...(from ? { remoteJid: from } : {})
      },
      message: {
        contactMessage: {
          displayName: `${config.OWNER_NAME}`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${config.OWNER_NAME}\nORG:NEXUS-AI;\nTEL;type=CELL;type=VOICE;waid=${config.OWNER_NUMBER}:${config.OWNER_NUMBER}\nEND:VCARD`
        }
      }
    };

    const listMessage = {
      text: `╭━━❮ *NEXUS-AI MENU* ❯━━⬣\n┃ Hello ${pushname || "there"}!\n┃ Tap below to explore commands.\n╰━━━━━━━━━━━━━━⬣`,
      footer: `${config.FOOTER || 'NEXUS-AI BOT'}`,
      title: `☣️ NEXUS-AI COMMAND CENTER`,
      buttonText: "📖 Open Menu",
      sections,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "NEXUS-AI",
          body: "Best WhatsApp Bot",
          thumbnail: thumb,
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true,
          sourceUrl: config.REPO || "https://github.com/pkdriller0/NEXUS-AI"
        },
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363288304618280@newsletter',
          newsletterName: 'NEXUS-TECH',
          serverMessageId: 143
        }
      }
    };

    await conn.sendMessage(from, listMessage, { quoted: vcardMsg });

  } catch (err) {
    console.log(err);
    reply("❌ Menu command failed.");
  }
});
