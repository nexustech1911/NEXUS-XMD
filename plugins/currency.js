const { cmd } = require('../command');
const config = require('../config');
const axios = require('axios');

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
  pattern: "currency",
  desc: "Convert currency (e.g., USD to KES)",
  category: "utility",
  react: "💱",
  use: '.currency 100 usd to kes',
  filename: __filename
},
async (conn, mek, m, { from, sender, args, reply }) => {
  try {
    if (args.length < 4 || args[2].toLowerCase() !== 'to') {
      return reply(`*Usage:* .currency 100 usd to kes`);
    }

    const amount = parseFloat(args[0]);
    const fromCurrency = args[1].toUpperCase();
    const toCurrency = args[3].toUpperCase();

    if (isNaN(amount)) {
      return reply(`*Invalid amount:* ${args[0]}`);
    }

    const res = await axios.get(`https://api.exchangerate.host/convert`, {
      params: {
        from: fromCurrency,
        to: toCurrency,
        amount
      }
    });

    if (!res.data || !res.data.result) {
      return reply(`❌ Conversion failed. Please try again later.`);
    }

    const result = res.data.result;
    const message = `💱 *Currency Conversion*\n\n🔢 Amount: ${amount} ${fromCurrency}\n🔁 Converted: ${result.toFixed(2)} ${toCurrency}`;

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
    reply(`❌ Error: Could not complete the request.`);
  }
});
