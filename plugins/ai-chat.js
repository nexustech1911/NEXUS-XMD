const { cmd } = require('../command');
const axios = require('axios');
const moment = require('moment-timezone');
const config = require('../config');

// Quoted fake verified contact
const quotedContact = {
    key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
    },
    message: {
        contactMessage: {
            displayName: "NEXUS-XMD",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:NEXUS-XMD\nORG:NEXUS-BOTS;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`
        }
    }
};

// Channel-style context info
const channelContext = (sender) => ({
    mentionedJid: [sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363288304618280@newsletter',
        newsletterName: 'NEXUS-BOTS SUPPORT',
        serverMessageId: 143
    }
});

// Custom hardcoded replies
const handleCustomPrompt = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes("what time") || lower.includes("current time"))
        return `🕰️ *Current Time:* ${moment().tz(config.TIME_ZONE || 'Africa/Nairobi').format('HH:mm:ss')} (${config.TIME_ZONE || 'Africa/Nairobi'})`;
    
    if (lower.includes("repo"))
        return `📦 *Repository:* https://github.com/nexustech1911/NEXUS-XMD`;

    if (lower.includes("channel"))
        return `📡 *Official Channel:* https://t.me/nexus_ai_updates`;

    if (lower.includes("who are you") || lower.includes("your name"))
        return `🤖 I am *NEXUS-XMD AI*, developed and maintained by *Pkdriller 🇰🇪*`;

    if (lower.includes("nexus-xmd"))
        return `🧠 *NEXUS-XMD* is an advanced WhatsApp bot packed with AI, media tools, downloads, group features & more.\n\n🔧 *Support:* https://t.me/nexus_ai_support`;

    return null;
};

cmd({
    pattern: "ai",
    alias: ["bot", "dj", "gpt", "gpt4", "bing"],
    desc: "Chat with an AI model",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react, sender }) => {
    try {
        if (!q) return reply("Please provide a message for the AI.\nExample: `.ai Hello`");

        const hardcoded = handleCustomPrompt(q);
        if (hardcoded) {
            return await conn.sendMessage(from, {
                text: hardcoded,
                contextInfo: channelContext(sender)
            }, { quoted: quotedContact });
        }

        const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.message) {
            await react("❌");
            return reply("AI failed to respond. Please try again later.");
        }

        await conn.sendMessage(from, {
            text: `🤖 *AI Response:*\n\n${data.message}`,
            contextInfo: channelContext(sender)
        }, { quoted: quotedContact });

        await react("✅");

    } catch (e) {
        console.error("Error in AI command:", e);
        await react("❌");
        reply("An error occurred while communicating with the AI.");
    }
});
