const { cmd, commands } = require('../command');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const moment = require('moment-timezone');
const { runtime } = require('../lib/functions');

cmd({
  pattern: "menu2",
  alias: ["help", "commands"],
  desc: "Display full list of available commands with categories.",
  category: "System",
  filename: __filename
}, async (conn, m) => {
  // Fake vCard quoted
  const quoted = {
    key: {
      fromMe: false,
      participant: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast'
    },
    message: {
      contactMessage: {
        displayName: 'NEXUS-XMD',
        vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:NEXUS-XMD\nORG:NEXUS-XMD;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD'
      }
    }
  };

  // Get bot runtime, time, date
  const time = moment().tz(config.TIMEZONE).format("HH:mm:ss");
  const date = moment().tz(config.TIMEZONE).format("dddd, MMMM Do YYYY");
  const uptime = runtime(process.uptime());

  // Group commands by category
  const categoryMap = {};
  let totalCommands = 0;
  for (let name in commands) {
    const cmdData = commands[name];
    const cat = cmdData.category || 'Uncategorized';
    if (!categoryMap[cat]) categoryMap[cat] = [];
    categoryMap[cat].push(cmdData.pattern || name);
    totalCommands++;
  }

  // Stylized menu message
  let menuMsg = `╭━━━〔 𝗡𝗘𝗫𝗨𝗦-𝗫𝗠𝗗 𝗠𝗘𝗡𝗨 〕━━━◆
┃
┃ 👤 *User:* @${m.sender.split("@")[0]}
┃ ⏱️ *Time:* ${time}
┃ 📅 *Date:* ${date}
┃ ⚙️ *Uptime:* ${uptime}
┃ 💻 *Commands:* ${totalCommands}
┃
┣━〔 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗜𝗘𝗦 〕━━━◆`;

  for (const [cat, cmds] of Object.entries(categoryMap)) {
    menuMsg += `

╭─❒ 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗬: ${cat.toUpperCase()}
${cmds.map(c => `│• ${c}`).join("\n")}
╰───────────────⬣`;
  }

  menuMsg += `

╰━〔 𝙉𝙀𝙓𝙐𝙎-𝙓𝙈𝘿 🔰 〕━⬣`;

  // PTT audio path
  const audioPath = path.join(__dirname, '../media/menu.mp3');
  if (!fs.existsSync(audioPath)) {
    return await m.reply("❌ Menu audio not found: media/menu.mp3");
  }

  // Send with audio, vCard, and contextInfo
  await conn.sendMessage(m.chat, {
    audio: fs.readFileSync(audioPath),
    mimetype: 'audio/mpeg',
    ptt: true,
    contextInfo: {
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      externalAdReply: {
        title: "NEXUS-XMD MENU",
        body: `Total Commands: ${totalCommands}`,
        mediaType: 2,
        thumbnailUrl: config.LOGO,
        mediaUrl: config.GROUP_LINK,
        sourceUrl: config.GROUP_LINK
      },
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363288304618280@newsletter",
        newsletterName: "NEXUS-XMD UPDATES",
        serverMessageId: 99999
      }
    }
  }, { quoted });

  // Send caption message
  await m.reply(menuMsg, quoted);
});
