const { cmd } = require('../command');
const axios = require('axios');
const fs = require('fs');
const { getBuffer } = require('../lib/myfunc');

const fakeContact = {
  key: {
    fromMe: false,
    participant: `0@s.whatsapp.net`,
    remoteJid: 'status@broadcast'
  },
  message: {
    contactMessage: {
      displayName: 'PK DRILLER ☑️',
      vcard: 'BEGIN:VCARD\n' +
        'VERSION:3.0\n' +
        'FN:PK DRILLER\n' +
        'ORG:NEXUS-XMD;\n' +
        'TEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\n' +
        'END:VCARD'
    }
  }
};

const forwardedContext = {
  forwardingScore: 999,
  isForwarded: true,
  mentionedJid: [],
  forwardedNewsletterMessageInfo: {
    newsletterJid: '120363288304618280@newsletter',
    newsletterName: 'NEXUS-XMD UPDATES',
    serverMessageId: 303
  }
};

cmd({
  pattern: "tea",
  alias: ["teatime", "gossip"],
  desc: "Get some random AI gossip or hot tea ☕",
  category: "fun zone",
  react: "☕",
  filename: __filename
},
async (conn, m, { reply, react }) => {
  try {
    await react('☕');

    const teaList = [
      "Did you know PK Driller once shut down a spammer with just a .ban? ☠️",
      "Someone in the group has been secretly stalking your stories... 👀",
      "The NEXUS-XMD AI is smarter than half of the admins. Facts only. 🧠",
      "A group member is using a second account. Look closely next time. 🕵️‍♂️",
      "Someone tried to copy this bot… and failed. 💀",
      "Rumor says a giveaway is coming soon... stay active 👀",
      "That moment when the owner reads your message and ignores... ouch 😂",
      "Someone in this group simps hard for anime girls. You know who. 😹",
      "PK DRILLER is watching 👁️",
      "Someone here deletes messages a little too fast... guilty? 😶"
    ];

    const randomTea = teaList[Math.floor(Math.random() * teaList.length)];

    const ttsUrl = `https://api.ryzendesu.vip/api/tts?text=${encodeURIComponent(randomTea)}&lang=en&apikey=beta`;
    const audioBuffer = await getBuffer(ttsUrl);

    await conn.sendMessage(m.chat, {
      audio: audioBuffer,
      ptt: true,
      mimetype: 'audio/mpeg',
      contextInfo: forwardedContext
    }, { quoted: fakeContact });

    await reply(`☕ *NEXUS-XMD Hot Tea:*\n\n${randomTea}`, fakeContact, forwardedContext);

  } catch (err) {
    console.error(err);
    await reply("Something went wrong while brewing the tea ☹️");
  }
});
