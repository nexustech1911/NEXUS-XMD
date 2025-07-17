const { cmd } = require('../command');
const config = require('../config');

const commonContextInfo = (sender) => ({
  mentionedJid: [sender],
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: '120363288304618280@newsletter',
    newsletterName: 'NEXUS-XMD UPDATES',
    serverMessageId: 202
  }
});

cmd({
  pattern: "calculator",
  alias: ["calc", "math"],
  desc: "Evaluate a math expression",
  category: "utility",
  react: "➗",
  use: '.calculator 5 * (3 + 2)',
  filename: __filename
},
async (conn, mek, m, { from, sender, q, reply }) => {
  try {
    if (!q) return reply(`*Usage:* .calculator 5 * (3 + 2)`);

    // Safe math eval (no dangerous code)
    const math = require('mathjs');
    let result;

    try {
      result = math.evaluate(q);
    } catch (e) {
      return reply(`❌ Invalid expression.\nExample: .calculator 5 * (3 + 2)`);
    }

    const message = `🧠 *Calculator Result*\n\n📝 Expression: ${q}\n📊 Result: *${result}*`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: commonContextInfo(sender)
    }, {
      quoted: {
        key: {
          fromMe: false,
          participant: "0@s.whatsapp.net",
          remoteJid: "status@broadcast"
        },
        message: {
          contactMessage: {
            displayName: "NEXUS VERIFIED",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:NEXUS-XMD\nORG:NEXUS SUPPORT;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`
          }
        }
      }
    });

  } catch (err) {
    console.log(err);
    reply(`❌ Error occurred while evaluating.`);
  }
});
