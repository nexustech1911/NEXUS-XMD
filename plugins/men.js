const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');

const commonContextInfo = (sender) => ({
    mentionedJid: [sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363354023106228@newsletter',
        newsletterName: 'JawadTechX',
        serverMessageId: 143
    }
});

cmd({
    pattern: "menu4",
    desc: "Show all bot commands in selection menu",
    category: "menu",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender, pushname, reply }) => {
    try {
        let totalCommands = Object.keys(commands).length;
        const caption = `╭━〔 🔰 ${config.BOT_NAME} • MENU 〕━╮
┃ 👤 Owner: *${config.OWNER_NAME}*
┃ ⚙️ Prefix: *${config.PREFIX}*
┃ 🚀 Version: *5.0.0 Beta*
┃ 🌐 Hosted: *Heroku*
┃ 📦 Total Commands: *${totalCommands}*
┃ ⏳ Uptime: *${runtime(process.uptime())}*
╰━━━━━━━━━━━━━━━━━━╯

📘 *MAIN MENU CATEGORIES*:
╭─────❖
│ 1️⃣  Quran 📖  
│ 2️⃣  Prayer 🕌  
│ 3️⃣  AI 🤖  
│ 4️⃣  Anime 🎌  
│ 5️⃣  Reactions 💬  
│ 6️⃣  Convert 🔁  
│ 7️⃣  Fun 🎉  
│ 8️⃣  Download ⬇️  
│ 9️⃣  Group 👥  
│ 🔟  Main 🏠  
│ 11️⃣  Owner 👑  
│ 12️⃣  Other 🧩  
│ 13️⃣  Logo 🖼  
│ 14️⃣  Tools 🛠  
╰─────❖

✏️ *Reply with the number (1-14)* to access any menu.`;

        const sentMsg = await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL },
            caption: caption,
            contextInfo: commonContextInfo(sender)
        }, { quoted: mek });

        const messageID = sentMsg.key.id;

        conn.ev.on("messages.upsert", async (msgData) => {
            const receivedMsg = msgData.messages[0];
            if (!receivedMsg.message) return;

            const receivedText = receivedMsg.message.conversation || receivedMsg.message.extendedTextMessage?.text;
            const senderID = receivedMsg.key.remoteJid;
            const isReplyToBot = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;

            if (isReplyToBot) {
                await conn.sendMessage(senderID, {
                    react: { text: '✅', key: receivedMsg.key }
                });

                switch (receivedText) {
                    case "1":
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `🕌 *QURAN MENU*
╭─「📜」─
├ ❖ surah <number>
├ ❖ ayat <surah:verse>
├ ❖ tafsir <surah>
├ ❖ listreciters
├ ❖ play <reciter> <surah>
├ ❖ searchquran <query>
├ ❖ quranpdf <surah>
╰────────────`,
                            contextInfo: commonContextInfo(senderID)
                        }, { quoted: receivedMsg });
                        break;

                    case "2":
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `🕋 *PRAYER TIME MENU*
╭─「🕰」─
├ ❖ prayer <city>
├ ❖ setlocation <city>
├ ❖ mylocation
├ ❖ prayerfull <city>
├ ❖ prayernext <city>
├ ❖ hijridate
╰────────────`,
                            contextInfo: commonContextInfo(senderID)
                        }, { quoted: receivedMsg });
                        break;

                    case "3":
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `🤖 *AI & GPT MENU*
╭─「💡」─
├ ❖ ai <query>
├ ❖ gpt | gpt2 | gpt3 | gpt4 <query>
├ ❖ bard <query>
├ ❖ bing <query>
├ ❖ copilot <query>
├ ❖ imagine <prompt>
├ ❖ blackbox | luma | meta | khan
├ ❖ jawad <query>
╰────────────`,
                            contextInfo: commonContextInfo(senderID)
                        }, { quoted: receivedMsg });
                        break;

                    case "4":
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `🎌 *ANIME MODE*
╭─「🖼️」─
├ ❖ waifu | neko | loli | maid
├ ❖ animegirl | animeboy | animenews
├ ❖ animequote | naruto | animewall
├ ❖ animememe | anime1-5
╰────────────`,
                            contextInfo: commonContextInfo(senderID)
                        }, { quoted: receivedMsg });
                        break;

                    case "5":
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `💬 *REACTION MENU*
╭─「🌀」─
├ ❖ hug | kiss | cuddle | pat
├ ❖ slap | poke | lick | bite
├ ❖ bully | wave | blush
├ ❖ handhold | highfive | yeet | smile
╰────────────`,
                            contextInfo: commonContextInfo(senderID)
                        }, { quoted: receivedMsg });
                        break;

                    case "6":
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `🔁 *CONVERT TOOLS*
╭─「🔄」─
├ ❖ sticker | sticker2
├ ❖ tomp3 | tomp4
├ ❖ tts | trt | fancy
├ ❖ base64 | binary
├ ❖ emojimix | tinyurl
╰────────────`,
                            contextInfo: commonContextInfo(senderID)
                        }, { quoted: receivedMsg });
                        break;

                    case "7":
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `🎉 *FUN & GAMES*
╭─「😂」─
├ ❖ joke | meme | quote | fact
├ ❖ truth | dare | ship
├ ❖ hack | pickup | wyr
├ ❖ rate | character
╰────────────`,
                            contextInfo: commonContextInfo(senderID)
                        }, { quoted: receivedMsg });
                        break;

                    case "8":
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `⬇️ *DOWNLOADERS*
╭─「📥」─
├ ❖ ytmp3 | ytmp4 | fb | fb2 | fb3
├ ❖ tiktok | insta | twitter | spotify
├ ❖ play | play2 | play3 | play4 | play5 | playx
├ ❖ mediafire | gdrive
╰────────────`,
                            contextInfo: commonContextInfo(senderID)
                        }, { quoted: receivedMsg });
                        break;

                    case "9":
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `👥 *GROUP CONTROL*
╭─「🛡️」─
├ ❖ add | kick | promote | demote
├ ❖ grouplink | revoke
├ ❖ setname | setdesc
├ ❖ setwelcome | setgoodbye
├ ❖ welcome on/off
├ ❖ tagall | tagadmins | hidetag
╰────────────`,
                            contextInfo: commonContextInfo(senderID)
                        }, { quoted: receivedMsg });
                        break;

                    case "10":
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `🏠 *MAIN SETTINGS*
╭─「⚙️」─
├ ❖ ping | runtime | uptime | speedtest
├ ❖ owner | support | menu | allmenu
╰────────────`,
                            contextInfo: commonContextInfo(senderID)
                        }, { quoted: receivedMsg });
                        break;

                    case "11":
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `👑 *OWNER PANEL*
╭─「🔐」─
├ ❖ broadcast | ban | unban
├ ❖ block | unblock | join | leave
├ ❖ setpp | fullpp | shutdown | restart
├ ❖ addsudo | delsudo | banlist
╰────────────`,
                            contextInfo: commonContextInfo(senderID)
                        }, { quoted: receivedMsg });
                        break;

                    case "12":
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `🧩 *OTHER UTILITIES*
╭─「📚」─
├ ❖ weather | news | movie | define
├ ❖ wikipedia | calculator | currency
├ ❖ countdown | remind
╰────────────`,
                            contextInfo: commonContextInfo(senderID)
                        }, { quoted: receivedMsg });
                        break;

                    case "13":
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `🖼 *LOGO MAKERS*
╭─「🎨」─
├ ❖ neonlight | blackpink | dragonball
├ ❖ america | naruto | sadgirl | clouds
├ ❖ futuristic | galaxy | leaf | boom
├ ❖ hacker | angelwings | zodiac | frozen
├ ❖ luxury | castle | tatoo | valorant
╰────────────`,
                            contextInfo: commonContextInfo(senderID)
                        }, { quoted: receivedMsg });
                        break;

                    case "14":
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `🛠 *TOOLS MENU*
╭─「🧰」─
├ ❖ setmyname | setpp | getpp | getbio
├ ❖ setonline | setppall | blocklist
├ ❖ updatebio | fullpp | remini | removebg
├ ❖ urltoimg | .reception | .captain | .repost
├ ❖ .story | .status | .vcf | .tiny
├ ❖ .invert | .grey | .blur
╰────────────`,
                            contextInfo: commonContextInfo(senderID)
                        }, { quoted: receivedMsg });
                        break;

                    default:
                        await conn.sendMessage(senderID, {
                            text: "❌ Invalid input. Please reply with a number from *1 to 14*.",
                            contextInfo: commonContextInfo(senderID)
                        }, { quoted: receivedMsg });
                }
            }
        });

    } catch (e) {
        console.error(e);
        reply(`❌ Error:\n${e}`);
    }
});
