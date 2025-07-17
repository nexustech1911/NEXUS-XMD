const { cmd } = require('../command');
const axios = require('axios');
const moment = require('moment-timezone');
const config = require('../config');

const commonContextInfo = (sender) => ({
    mentionedJid: [sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363288304618280@newsletter',
        newsletterName: 'NEXUS-XMD UPDATES',
        serverMessageId: 100,
    },
    externalAdReply: {
        showAdAttribution: true,
        title: 'NEXUS-XMD AI ZONE',
        body: moment().tz(config.TIME_ZONE).format('dddd, MMMM Do YYYY • h:mm A'),
        thumbnailUrl: 'https://i.imgur.com/ErKf5Yb.jpg',
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: 'https://chat.openai.com',
    }
});

const fakeContact = {
    key: {
        fromMe: false,
        participant: '0@s.whatsapp.net',
    },
    message: {
        contactMessage: {
            displayName: 'NEXUS-XMD AI ENGINE',
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:AI Engine;;;\nFN:NEXUS-XMD AI\nitem1.TEL;waid=254700000000:+254 700 000000\nitem1.X-ABLabel:Developer\nEND:VCARD`,
            jpegThumbnail: Buffer.alloc(0)
        }
    }
};

// 🧠 AI Command with Custom Responses
cmd({
    pattern: "pkai",
    alias: ["botq", "nex", "gp", "pk", "pkdriller"],
    desc: "Chat with an AI model",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for the AI.\nExample: `.ai Hello`");

        const text = q.toLowerCase();
        let answer;

        // 🎯 Custom Hardcoded Q&A
        if (text.includes("time")) {
            answer = `🕐 Current time is: *${moment().tz(config.TIME_ZONE).format("dddd, MMMM Do YYYY, h:mm:ss A")}*`;
        } else if (text.includes("repo") || text.includes("github")) {
            answer = "📂 *NEXUS-XMD GitHub Repo:*\nhttps://github.com/pkdriller2/NEXUS-XMD";
        } else if (text.includes("pkdriller")) {
            answer = "👤 *PKDRILLER* is the lead developer and founder of NEXUS-XMD, known for innovative bot development and customization.";
        } else if (text.includes("today") || text.includes("date")) {
            answer = `📅 Today is: *${moment().tz(config.TIME_ZONE).format("dddd, MMMM Do YYYY")}*`;
        } else if (text.includes("owner")) {
            answer = "👑 *My owner is @pkdriller2*, a skilled developer behind NEXUS-XMD.";
        } else if (text.includes("country")) {
            answer = "🌍 I'm based in *Kenya*, developed by African innovation.";
        } else if (text.includes("nexus") && text.includes("more")) {
            answer = "🤖 *NEXUS-XMD* is a powerful WhatsApp bot built for automation, entertainment, group management, AI chat, media downloads, and more. Continuously evolving with new features!";
        } else if (text.includes("support nexus")) {
            answer = "💖 You can support NEXUS-XMD by sharing it, starring the GitHub repo, and following @pkdriller2. Donations or contributions are welcome!";
        } else if (text.includes("updates") || text.includes("supportive link")) {
            answer = "📢 *Stay Updated on NEXUS-XMD:*\n\n📌 GitHub Repo:\nhttps://github.com/pkdriller2/NEXUS-XMD\n📌 Developer Channel:\nhttps://whatsapp.com/channel/0029VaFbhkQF3s9WbVQYvK2N\n📌 Support Group:\nhttps://chat.whatsapp.com/IjLSqYjaRwR1zBhVfDgxg5";
        } else if (text.includes("giveaway") && text.includes("can we")) {
            answer = "🎁 *Giveaway?* That's a great idea! We’re planning future events. Stay active in the channel for announcements.";
        } else if (text.includes("why can't") && text.includes("giveaway")) {
            answer = "🚫 *No giveaway currently* due to limited resources and fairness control. But it's on our roadmap!";
        }

        if (answer) {
            await conn.sendMessage(from, {
                text: answer,
                contextInfo: commonContextInfo(m.sender)
            }, { quoted: fakeContact });
            return await react("✅");
        }

        // 🌐 Fallback to AI API
        const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data?.message) {
            await react("❌");
            return reply("AI failed to respond. Please try again later.");
        }

        await conn.sendMessage(from, {
            text: `🤖 *AI Response:*\n\n${data.message}`,
            contextInfo: commonContextInfo(m.sender)
        }, { quoted: fakeContact });
        await react("✅");

    } catch (e) {
        console.error("AI command error:", e);
        await react("❌");
        reply("An error occurred while communicating with the AI.");
    }
});
