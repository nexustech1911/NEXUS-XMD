const { cmd } = require('../command');

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
  desc: "Get some random AI gossip or tea ☕",
  category: "fun zone",
  react: "☕",
  filename: __filename
},
async (conn, m, { reply, react }) => {
  try {
    await react('☕');

    const teaList = [
      "Did you know PK Driller once shut down a spammer with just a .ban? ☠️",
      "Someone in this group deletes messages faster than light… suspicious 👀",
      "NEXUS-XMD just hit 1000 active sessions. Dominating the AI scene 🧠",
      "There’s an undercover bot in this chat. Can you spot it? 🤖",
      "The quietest group member is secretly watching everything… 🕵️‍♀️",
      "A giveaway might drop soon — if you stay active! 🎁",
      "Someone here has a crush on an admin. Not naming names 😹",
      "PK DRILLER sees your screenshots 👁️",
      "Someone almost got banned yesterday... stay sharp ⚠️",
      "The next command you use might expose your secrets 😳"
    ];

    const randomTea = teaList[Math.floor(Math.random() * teaList.length)];

    await conn.sendMessage(m.chat, {
      text: `☕ *NEXUS-XMD HOT TEA*\n\n${randomTea}`,
      contextInfo: forwardedContext
    }, { quoted: fakeContact });

  } catch (err) {
    console.error(err);
    await reply("Failed to serve the tea. Try again later.");
  }
});
