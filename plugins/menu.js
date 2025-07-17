const config = require('../config');
const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const moment = require('moment-timezone');

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
    desc: "Show complete list of all commands",
    category: "menu",
    react: "📚",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const uptime = runtime(process.uptime());
        const now = moment().tz(config.TIME_ZONE || "Africa/Nairobi");
        const time = now.format("HH:mm:ss");
        const date = now.format("dddd, MMMM Do YYYY");
        const platform = process.platform;

        // Count total commands
        const totalCommands = 950; // You can update this if you add/remove commands

        const menu = `*╭───────[ 🌟 ${config.BOT_NAME.toUpperCase()} MENU ]───────╮*
*│ 👤 Owner:* ${config.OWNER_NAME}
*│ ⏱ Uptime:* ${uptime}
*│ 📆 Date:* ${date}
*│ 🕒 Time:* ${time}
*│ 💻 Platform:* ${platform}
*│ 🔖 Prefix:* ${config.PREFIX}
*│ 📦 Total Commands:* ${totalCommands}
*╰──────────────────────────────────────╯*

╭───🎯 *AI COMMANDS* ───
★├▢ • *ai* <query>
★├▢ • *gpt*
★├▢ • *gpt2*
★├▢ • *gpt3*
★├▢ • *gpt4*
★├▢ • *bard*
★├▢ • *meta*
★├▢ • *fluxai*
★├▢ • *pk*
★├▢ • *blackbox*
★├▢ • *copilot*

╭───📥 *DOWNLOADERS* ───
★├▢ • *play*
★├▢ • *ytmp3*
★├▢ • *ytmp4*
★├▢ • *spotify*
★├▢ • *tiktok*
★├▢ • *fb*
★├▢ • *twitter*
★├▢ • *mediafire*
★├▢ • *gdrive*

╭───🔄 *CONVERTERS* ───
★├▢ • *sticker*
★├▢ • *tomp3*
★├▢ • *tomp4*
★├▢ • *tts*
★├▢ • *base64*
★├▢ • *unbase64*
★├▢ • *binary*
★├▢ • *dbinary*

╭───🎌 *ANIME ZONE* ───
★├▢ • *waifu*
★├▢ • *neko*
★├▢ • *maid*
★├▢ • *animequote*
★├▢ • *animewall*
★├▢ • *animememe*

╭───😹 *REACTIONS* ───
★├▢ • *hug*
★├▢ • *kiss*
★├▢ • *pat*
★├▢ • *slap*
★├▢ • *poke*
★├▢ • *bite*

╭───🌐 *UTILITIES* ───
★├▢ • *weather*
★├▢ • *news*
★├▢ • *wikipedia*
★├▢ • *define*
★├▢ • *currency*
★├▢ • *calculator*
★├▢ • *countdown*
★├▢ • *remind*
★├▢ • *flip*
★├▢ • *roll*
★├▢ • *fact*

╭───🧠 *FUN ZONE* ───
★├▢ • *joke*
★├▢ • *meme*
★├▢ • *truth*
★├▢ • *dare*
★├▢ • *ship*
★├▢ • *rate*
★├▢ • *hack*
★├▢ • *pickup*
★├▢ • *wyr*
★├▢ • *wouldyourather*

╭───🎨 *LOGO MAKER* ───
★├▢ • *neonlight*
★├▢ • *blackpink*
★├▢ • *dragonball*
★├▢ • *naruto*
★├▢ • *sadgirl*
★├▢ • *galaxy*
★├▢ • *boom*
★├▢ • *angelwings*
★├▢ • *paint*

╭───👑 *OWNER COMMANDS* ───
★├▢ • *ban*
★├▢ • *unban*
★├▢ • *block*
★├▢ • *unblock*
★├▢ • *broadcast*
★├▢ • *restart*
★├▢ • *shutdown*

╭───👥 *GROUP TOOLS* ───
★├▢ • *add*
★├▢ • *kick*
★├▢ • *promote*
★├▢ • *demote*
★├▢ • *grouplink*
★├▢ • *revoke*
★├▢ • *setname*
★├▢ • *setdesc*
★├▢ • *welcome on/off*
★├▢ • *goodbye on/off*
★├▢ • *tagall*
★├▢ • *hidetag*

╭───⚙️ *SYSTEM COMMANDS* ───
★├▢ • *menu*
★├▢ • *listcmd*
★├▢ • *allmenu*
★├▢ • *ping*
★├▢ • *uptime*
★├▢ • *owner*
★├▢ • *support*

*╰────📚 End of List ────╯*`;

        const quotedContact = {
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
        };

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL },
            caption: menu,
            contextInfo: commonContextInfo(sender)
        }, { quoted: quotedContact });

        await conn.sendMessage(from, {
            audio: {
                url: 'https://files.catbox.moe/9eo2q4.mp3'
            },
            mimetype: 'audio/mpeg',
            ptt: true,
            contextInfo: commonContextInfo(sender)
        }, { quoted: quotedContact });

    } catch (e) {
        console.error(e);
        reply(`❌ Error while generating menu:\n${e.message}`);
    }
});
