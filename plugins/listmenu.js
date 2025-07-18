const { cmd, commands } = require('../command');
const fs = require('fs');

cmd({
  pattern: "listmenu",
  desc: "List all available commands with category",
  category: "System",
  filename: __filename
}, async (conn, m) => {
  const fakeContact = {
    key: {
      fromMe: false,
      participant: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast'
    },
    message: {
      contactMessage: {
        displayName: "NEXUS Command Feed",
        vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:NEXUS SYSTEM\nORG:NEXUS-XMD;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254700000000\nEND:VCARD"
      }
    }
  };

  // Group commands by category
  let categorized = {};
  for (let name in commands) {
    let cmdObj = commands[name];
    let category = cmdObj.category || "Uncategorized";
    if (!categorized[category]) categorized[category] = [];
    categorized[category].push(cmdObj.pattern);
  }

  // Format the output
  let output = `📦 *NEXUS-XMD Command List*\n`;
  output += `📌 *Total Commands:* ${Object.keys(commands).length}\n`;
  output += `🔍 *Generated:* ${new Date().toLocaleString()}\n\n`;

  for (let category in categorized) {
    output += `🗂️ *${category}*\n`;
    let cmds = [...new Set(categorized[category])]; // remove duplicates
    cmds.sort();
    output += cmds.map(cmd => `▢ ${cmd}`).join('\n') + '\n\n';
  }

  await conn.sendMessage(m.chat, {
    text: output.trim(),
    quoted: fakeContact,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      mentionedJid: [m.sender],
      externalAdReply: {
        title: "📖 NEXUS Realtime Command List",
        body: "Auto-generated system list",
        thumbnailUrl: "https://files.catbox.moe/eto3yr.jpg",
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: "https://github.com/nexustech1911/NEXUS-XMD"
      },
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363288304618280@newsletter",
        newsletterName: "NEXUS-XMD UPDATES",
        serverMessageId: 707
      }
    }
  });
});
