const { cmd } = require('../command');
const axios = require('axios');
const moment = require('moment-timezone');
const config = require('../config');

// 🔹 Fake verified contact
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

// 🔹 Context Info (Newsletter style)
const commonContextInfo = (sender) => ({
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
        title: '🤖 NEXUS-XMD AI ZONE',
        body: moment().tz(config.TIME_ZONE).format('dddd, MMMM Do YYYY • h:mm A'),
        thumbnailUrl: 'https://i.imgur.com/ErKf5Yb.jpg',
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: 'https://chat.openai.com'
    }
});

// 🧠 Command: .ai
cmd({
    pattern: "ai2",
    alias: ["bot", "dj2", "gpt2", "gpt9", "bing9"],
    desc: "Chat with an AI model",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react, sender }) => {
    try {
        if (!q) return reply("Please provide a message for the AI.\nExample: `.ai Hello`");

        const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.message) {
            await react("❌");
            return reply("AI failed to respond. Please try again later.");
        }

        await conn.sendMessage(from, {
            text: `🤖 *AI Response:*\n\n${data.message}`,
            contextInfo: commonContextInfo(sender)
        }, { quoted: fakeContact });

        await react("✅");
    } catch (e) {
        console.error("Error in AI command:", e);
        await react("❌");
        reply("An error occurred while communicating with the AI.");
    }
});

// 🧠 Command: .openai
cmd({
    pattern: "openai",
    alias: ["chatgpt", "gpt3", "open-gpt"],
    desc: "Chat with OpenAI",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react, sender }) => {
    try {
        if (!q) return reply("Please provide a message for OpenAI.\nExample: `.openai Hello`");

        const apiUrl = `https://vapis.my.id/api/openai?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.result) {
            await react("❌");
            return reply("OpenAI failed to respond. Please try again later.");
        }

        await conn.sendMessage(from, {
            text: `🧠 *OpenAI Response:*\n\n${data.result}`,
            contextInfo: commonContextInfo(sender)
        }, { quoted: fakeContact });

        await react("✅");
    } catch (e) {
        console.error("Error in OpenAI command:", e);
        await react("❌");
        reply("An error occurred while communicating with OpenAI.");
    }
});

// 🧠 Command: .deepseek
cmd({
    pattern: "deepseek",
    alias: ["deep", "seekai"],
    desc: "Chat with DeepSeek AI",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react, sender }) => {
    try {
        if (!q) return reply("Please provide a message for DeepSeek AI.\nExample: `.deepseek Hello`");

        const apiUrl = `https://api.ryzendesu.vip/api/ai/deepseek?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.answer) {
            await react("❌");
            return reply("DeepSeek AI failed to respond. Please try again later.");
        }

        await conn.sendMessage(from, {
            text: `🧠 *DeepSeek AI Response:*\n\n${data.answer}`,
            contextInfo: commonContextInfo(sender)
        }, { quoted: fakeContact });

        await react("✅");
    } catch (e) {
        console.error("Error in DeepSeek AI command:", e);
        await react("❌");
        reply("An error occurred while communicating with DeepSeek AI.");
    }
});
