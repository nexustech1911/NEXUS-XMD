const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');

const commonContextInfo = (sender) => ({
    mentionedJid: [sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363288304618280@newsletter',
        newsletterName: 'NEXUS-XMD CHANNEL',
        serverMessageId: 120
    }
});

cmd({
    pattern: "menu",
    desc: "Show all bot features",
    category: "menu",
    react: "🎛️",
    filename: __filename
},
async (conn, mek, m, { from, sender, pushname, reply }) => {
    try {
        const totalCommands = Object.keys(commands).length;
        const uptime = runtime(process.uptime());

        const menuText = `╭───〔 🤖 *${config.BOT_NAME} SYSTEM PANEL* 〕───╮
│ 🧑🏻‍💻 Owner: ${config.OWNER_NAME}
│ ☄️ Prefix: ${config.PREFIX}
│ 🛠 Version: 5.0.0 Antiban
│ 🌐 Hosted: Panel
│ 🧮 Total Commands: ${totalCommands}
│ ⏳ Uptime: ${uptime}
╰────────────────────────────╯

┌──〔 🕌 Quran & Prayer 〕──
│ 📖 .surah <no>, .ayat <s:v>
│ 🕋 .prayer <city>, .hijridate

┌──〔 🤖 AI / Chatbots 〕──
│ 💡 .ai, .gpt, .gpt4, .bard, .meta
│ 🧠 .blackbox, .luma, .fluxai, .imagine

┌──〔 🎌 Anime & Reactions 〕──
│ 😼 .waifu, .neko, .animequote
│ 💥 .slap @tag, .kiss @tag, .poke

┌──〔 🎨 Logo & Image Tools 〕──
│ 🖌 .neonlight <txt>, .devilwings
│ 🧸 .remini, .removebg, .invert

┌──〔 🎛 Convert / Tools 〕──
│ 🎚️ .sticker, .tomp3, .tts, .base64
│ 🧰 .countdown, .calculator, .tinyurl

┌──〔 🎉 Fun / Games 〕──
│ 🪀 .joke, .meme, .dare, .wyr, .hack
│ ❤️ .rate <txt>, .pickup, .truth

┌──〔 ⬇️ Downloader 〕──
│ 🔊 .ytmp3, .play, .spotify
│ 📹 .ytmp4, .fb, .tiktok, .mediafire

┌──〔 👥 Group Features 〕──
│ 🚪 .add, .kick, .welcome on/off
│ 📢 .tagall, .hidetag, .setdesc

┌──〔 🧩 Others / Info 〕──
│ 🌍 .weather, .wikipedia, .news
│ 📌 .define, .movie, .currency

┌──〔 👑 Owner & Admins 〕──
│ 🔐 .ban, .unban, .block, .shutdown
│ 🚨 .broadcast <msg>, .restart

┌──〔 ⚙️ Main / System 〕──
│ 📈 .ping, .uptime, .owner, .menu
│ 🗃️ .support, .allmenu, .listcmd
╰──────────────────────────────╯`;

        // Fake vCard contact quote
        const quotedContact = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "NEXUS Verified",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:NEXUS-XMD\nORG:NEXUS SUPPORT;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`,
                    jpegThumbnail: null
                }
            }
        };

        // Send menu as captioned image
        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL },
            caption: menuText,
            contextInfo: commonContextInfo(sender)
        }, { quoted: quotedContact });

        // Send PTT song with context
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/9eo2q4.mp3' },
            mimetype: 'audio/mpeg',
            ptt: true,
            contextInfo: commonContextInfo(sender)
        }, { quoted: quotedContact });

    } catch (err) {
        console.error(err);
        reply('❌ *Failed to load menu.*\n' + err.message);
    }
});
