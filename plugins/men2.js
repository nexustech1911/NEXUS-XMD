const config = require('../config');
const { cmd } = require('../command');

cmd({
  pattern: "menu5",
  alias: ["menu2", "help"],
  desc: "Show command menu",
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
    const menuText = `╭━━❮ *NEXUS-AI MENU* ❯━━⬣
┃ 👤 *Hello:* ${pushname || 'User'}
┃ 🌍 *Mode:* ${config.WORKTYPE || 'Public'}
┃ 📚 *Prefix:* `.`
╰━━━━━━━━━━━━━━⬣

🧟‍♂️ *DOWNLOAD*
• .play / .play2 – YT audio
• .video / .video2 – YT video
• .apk – Apk from Play Store
• .fb / .tk / .ig / .twitter – Video downloader
• .gdrive / .mfire / .baiscope – File download

🧸 *ANIME & FUN*
• .anime / .animegirl / .loli – Anime pics
• .dog / .king / .yts – Random data
• .joke / .fact – Random jokes & facts

🛠 *INFO & TOOLS*
• .ping / .status / .system
• .owner / .about / .repo / .script
• .ai / .define / .gpass / .srepo
• .githubstalk

👥 *GROUP COMMANDS*
• .add / .kick / .remove / .delete
• .tagall / .hidetag / .jid / .ginfo
• .mute / .unmute / .lockgc / .unlockgc
• .setwelcome / .setgoodbye / .disappear
• .joinrequests / .allreq

👑 *OWNER PANEL*
• .update / .restart / .shutdown
• .block / .unblock / .clearchats
• .settings / .broadcast / .setpp
• .jid / .gjid

🔄 *CONVERTERS*
• .sticker – Photo to sticker
• .tts – Text to voice
• .trt – Language translator

_💡 Powered by Nexus-AI Bot_

🔗 *Repo:* ${config.REPO || 'https://github.com/pkdriller0/NEXUS-AI'}`

    const vcardMsg = {
      key: {
        fromMe: false,
        participant: '0@s.whatsapp.net',
        remoteJid: from
      },
      message: {
        contactMessage: {
          displayName: `${config.OWNER_NAME}`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${config.OWNER_NAME}\nORG:NEXUS-AI;\nTEL;type=CELL;type=VOICE;waid=${config.OWNER_NUMBER}:${config.OWNER_NUMBER}\nEND:VCARD`
        }
      }
    };

    await conn.sendMessage(from, {
      image: { url: "https://github.com/nexustech1911/NEXUS-XMD-DATA/raw/refs/heads/main/logo/Nexus-xmd.jpg" },
      caption: menuText,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "NEXUS-AI Command Menu",
          body: "Explore powerful commands",
          thumbnail: { url: "https://github.com/nexustech1911/NEXUS-XMD-DATA/raw/refs/heads/main/logo/Nexus-xmd.jpg" },
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true,
          sourceUrl: config.REPO || "https://github.com/pkdriller0/NEXUS-AI"
        },
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363288304618280@newsletter',
          newsletterName: 'NEXUS-TECH',
          serverMessageId: 100
        }
      }
    }, { quoted: vcardMsg });

  } catch (err) {
    console.log(err);
    reply("❌ Menu display failed.");
  }
});
