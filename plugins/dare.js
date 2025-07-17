cmd({
    pattern: "dare",
    alias: [],
    category: "fun",
    desc: "Get a random dare challenge.",
    use: ".dare",
    filename: __filename,
    react: "🎯"
}, async (conn, m, { sender }) => {

    const dares = [
        "Text your crush and say 'I like you.' 😳",
        "Change your profile pic to a meme for 1 hour 😂",
        "Call someone and sing a random song 🎶",
        "Post an embarrassing photo in your status 📸",
        "Pretend to be a cat for 1 minute 🐱",
        "Say a tongue twister 3 times fast 👅",
        "Act like a baby for 2 minutes 🍼",
        "Send a message using only emojis for 5 minutes 😹",
        "Type without using the backspace for 1 hour ⌨️",
        "Confess something you never told anyone 🙊"
    ];

    const quoteMsg = {
        key: {
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast"
        },
        message: {
            contactMessage: {
                displayName: "NEXUS-XMD Official",
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;NEXUS-XMD;;;\nFN:NEXUS-XMD\nitem1.TEL;waid=254700000000:+254700000000\nitem1.X-ABLabel:Official Bot\nEND:VCARD`
            }
        }
    };

    const contextInfo = {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363288304618280@newsletter',
            newsletterName: 'NEXUS-XMD UPDATES',
            serverMessageId: 110
        }
    };

    const msg = `┏━━━━━━༺🎯༻━━━━━━┓
*🔥 DARE TIME!*
┗━━━━━━━━━━━━━━━━┛

🎲 *${dares[Math.floor(Math.random() * dares.length)]}*

😈 _Don’t back out... it's a dare from NEXUS-XMD!_`;

    await conn.sendMessage(m.chat, {
        text: msg,
        contextInfo
    }, { quoted: quoteMsg });
});
