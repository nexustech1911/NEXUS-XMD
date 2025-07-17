const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');

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
    pattern: "menu",
    desc: "Show full command list",
    category: "menu",
    react: "📚",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const totalCommands = Object.keys(commands).length;
        const uptime = runtime(process.uptime());

        const header = `╭──────[ 🤖 ${config.BOT_NAME} FULL MENU ]──────╮
│ 👤 Owner: ${config.OWNER_NAME}
│ 💠 Prefix: ${config.PREFIX}
│ 🛠 Version: 5.0.0 Antiban
│ 🧾 Total Commands: ${totalCommands}
│ ⏱ Uptime: ${uptime}
╰────────────────────────────────────╯\n\n`;

        const fullCmdList = Object.keys(commands).map((cmd, i) => `*${i + 1}. ${config.PREFIX}${cmd}*`).join('\n');

        const fullMenuText = `${header}${fullCmdList}`;

        // Fake verified vCard
        const quotedContact = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "NEXUS VERIFIED BOT",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:NEXUS-XMD\nORG:NEXUS TECHS;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`
                }
            }
        };

        // Send full menu
        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL },
            caption: fullMenuText,
            contextInfo: commonContextInfo(sender)
        }, { quoted: quotedContact });

        // Send song (PTT)
        await conn.sendMessage(from, {
            audio: {
                url: 'https://files.catbox.moe/9eo2q4.mp3'
            },
            ptt: true,
            mimetype: 'audio/mpeg',
            contextInfo: commonContextInfo(sender)
        }, { quoted: quotedContact });

    } catch (e) {
        console.error(e);
        reply(`❌ Error occurred:\n${e.message}`);
    }
});
