const { cmd } = require('../command');
const axios = require('axios');
const moment = require('moment-timezone');
const config = require('../config');

// Fake contact to simulate verified message
const fakeContact = {
    key: {
        fromMe: false,
        participant: '0@s.whatsapp.net'
    },
    message: {
        contactMessage: {
            displayName: 'NEXUS-XMD AI ENGINE',
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:AI Engine;;;\nFN:NEXUS-XMD AI\nitem1.TEL;waid=254700000000:+254 700 000000\nitem1.X-ABLabel:Developer\nEND:VCARD`,
            jpegThumbnail: Buffer.alloc(0)
        }
    }
};

// Newsletter-style context
const getContext = (sender) => ({
    mentionedJid: [sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363288304618280@newsletter',
        newsletterName: 'NEXUS-XMD UPDATES',
        serverMessageId: 100
    },
    externalAdReply: {
        showAdAttribution: true,
        title: '🤖 NEXUS-XMD AI',
        body: moment().tz(config.TIME_ZONE).format('dddd, MMMM Do YYYY • h:mm A'),
        thumbnailUrl: 'https://i.imgur.com/ErKf5Yb.jpg',
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: 'https://chat.openai.com'
    }
});

cmd({
    pattern: "pkai",
    alias: ["nexus", "askbot", "askai", "pk"],
    desc: "Chat with NEXUS-XMD AI",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, sender, q, reply, react }) => {
    try {
        if (!q) return reply("❗ Please provide a message.\nExample: `.pkai what is nexus-xmd?`");

        const text = q.toLowerCase();
        let answer = null;

        // Predefined smart responses
        if (text.includes("time")) {
            answer = `🕐 Current time: *${moment().tz(config.TIME_ZONE).format("dddd, MMMM Do YYYY, h:mm:ss A")}*`;
        } else if (text.includes("repo")) {
            answer = "📁 *GitHub Repo:* https://github.com/pkdriller2/NEXUS-XMD";
        } else if (text.includes("pkdriller")) {
            answer = "👤 *PKDRILLER* is the lead developer of NEXUS-XMD, known for top-tier WhatsApp automation.";
        } else if (text.includes("today") || text.includes("date")) {
            answer = `📅 Today is: *${moment().tz(config.TIME_ZONE).format("dddd, MMMM Do YYYY")}*`;
        } else if (text.includes("owner")) {
            answer = "👑 My owner is *@pkdriller2*, creator of NEXUS-XMD.";
        } else if (text.includes("country")) {
            answer = "🌍 I'm based in *Kenya*, developed by African innovation.";
        } else if (text.includes("nexus") && text.includes("more")) {
            answer = "🤖 *NEXUS-XMD* is an advanced multi-purpose WhatsApp bot packed with tools for AI, group control, media download, fun, and automation.";
        } else if (text.includes("support nexus")) {
            answer = "💖 You can support NEXUS-XMD by sharing, starring the GitHub, joining the dev channel, or donating!";
        } else if (text.includes("updates") || text.includes("supportive link")) {
            answer = `📢 *NEXUS-XMD Resources:*\n\n• GitHub: https://github.com/pkdriller2/NEXUS-XMD\n• Channel: https://whatsapp.com/channel/0029VaFbhkQF3s9WbVQYvK2N\n• Support: https://chat.whatsapp.com/IjLSqYjaRwR1zBhVfDgxg5`;
        } else if (text.includes("can we") && text.includes("giveaway")) {
            answer = "🎁 Yes! Giveaways are coming soon. Stay tuned in the dev channel.";
        } else if (text.includes("why can't") && text.includes("giveaway")) {
            answer = "🚫 No giveaway right now due to budget limits, but it's planned!";
        }

        // If predefined response found
        if (answer) {
            await conn.sendMessage(from, {
                text: answer,
                contextInfo: getContext(sender)
            }, { quoted: fakeContact });
            return await react("✅");
        }

        // Fallback to API
        const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(q)}`;
        const res = await axios.get(apiUrl);

        if (!res?.data?.message) {
            await react("❌");
            return reply("AI didn’t respond. Try again later.");
        }

        await conn.sendMessage(from, {
            text: `🤖 *AI Response:*\n\n${res.data.message}`,
            contextInfo: getContext(sender)
        }, { quoted: fakeContact });
        await react("✅");

    } catch (err) {
        console.error('❌ Error:', err);
        await react("❌");
        reply("An error occurred while processing your request.");
    }
});
