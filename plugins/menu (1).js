const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');

const commonContextInfo = (sender) => ({
    mentionedJid: [sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363288304618280@newsletter',
        newsletterName: 'NEXUS-BOTS SUPPORT',
        serverMessageId: 143
    }
});

cmd({
    pattern: "menu",
    desc: "Show all bot commands in selection menu",
    category: "menu",
    react: "🪀",
    filename: __filename
},
async (conn, mek, m, { from, sender, pushname, reply }) => {
    try {
        let totalCommands = Object.keys(commands).length;
        const caption = `*╭────⬡ ${config.BOT_NAME} ⬡────*
★├▢ 👤 *𝕠𝕨𝕟𝕖𝕣:* ${config.OWNER_NAME}
★├▢ 🪀 *𝕡𝕣𝕖𝕗𝕚𝕩:* ${config.PREFIX}
★├▢ 🔰 *𝕧𝕖𝕣𝕤𝕚𝕠𝕟:* 5.0.0 antiban
★├▢ ♻️ *𝕡𝕝𝕒𝕥𝕗𝕠𝕣𝕞:* Panel 
★├▢ 📵 *𝕥𝕠𝕥𝕒𝕝 𝕔𝕠𝕞𝕞𝕒𝕟𝕕𝕤:* ${totalCommands}
★├▢ 🚳 *𝕣𝕦𝕟𝕥𝕚𝕞𝕖:* ${runtime(process.uptime())}
★╰────────────────*

*╭───⬡ SELECT MENU ⬡───*
*├▢ 1. 📖 Quran Menu*
*├▢ 2. 🕋 Prayer Time*
*├▢ 3. 🤖 AI Menu*
*├▢ 4. 🎭 Anime Menu*
*├▢ 5. 😹 Reactions*
*├▢ 6. 🔁 Convert Menu*
*├▢ 7. 🎉 Fun Menu*
*├▢ 8. ⬇️ Download Menu*
*├▢ 9. 👥 Group Menu*
*├▢ 10. 🏠 Main Menu*
*├▢ 11. 👑 Owner Menu*
*├▢ 12. 🧩 Other Menu*
*├▢ 13. 🖌️ Logo Menu*
*├▢ 14. 🛠️ Tools Menu*
*╰────────────────*

> Reply with the number to select menu (1-14)`;

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
                    react: { text: '⬇️', key: receivedMsg.key }
                });

                switch (receivedText) {
                    case "1": // Quran Menu
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `*╭────⬡ QURAN MENU ⬡────*
*├▢ • surah <number>*
*├▢ • ayat <surah:verse>*
*├▢ • tafsir <surah>*
*├▢ • listreciters*
*├▢ • play <reciter> <surah>*
*├▢ • searchquran <query>*
*├▢ • quranpdf <surah>*
*╰────────────────*`,
                            contextInfo: commonContextInfo(receivedMsg.key.participant || receivedMsg.key.remoteJid)
                        }, { quoted: receivedMsg });
                        break;

                    case "2": // Prayer Time
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `*╭────⬡ PRAYER TIME ⬡────*
*├▢ • prayer <city>*
*├▢ • setlocation <city>*
*├▢ • mylocation*
*├▢ • prayerfull <city>*
*├▢ • prayernext <city>*
*├▢ • hijridate*
*╰────────────────*`,
                            contextInfo: commonContextInfo(receivedMsg.key.participant || receivedMsg.key.remoteJid)
                        }, { quoted: receivedMsg });
                        break;

                    case "3": // AI Menu
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `*╭────⬡ AI MENU ⬡────*
*├▢ • ai <query>*
*├▢ • gpt <query>*
*├▢ • gpt2 <query>*
*├▢ • gpt3 <query>*
*├▢ • gpt4 <query>*
*├▢ • bard <query>*
*├▢ • bing <query>*
*├▢ • copilot <query>*
*├▢ • imagine <prompt>*
*├▢ • imagine2 <prompt>*
*├▢ • blackbox <query>*
*├▢ • luma <query>*
*├▢ • meta <query>*
*├▢ • pk <query>*
*├▢ • fluxai <query>*
*╰────────────────*`,
                            contextInfo: commonContextInfo(receivedMsg.key.participant || receivedMsg.key.remoteJid)
                        }, { quoted: receivedMsg });
                        break;

                    case "4": // Anime Menu
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `*╭────⬡ ANIME MENU ⬡────*
*├▢ • waifu*
*├▢ • neko*
*├▢ • loli*
*├▢ • maid*
*├▢ • animegirl*
*├▢ • animeboy*
*├▢ • animenews*
*├▢ • animequote*
*├▢ • naruto*
*├▢ • animewall*
*├▢ • animememe*
*├▢ • anime1*
*├▢ • anime2*
*├▢ • anime3*
*├▢ • anime4*
*├▢ • anime5*
*╰────────────────*`,
                            contextInfo: commonContextInfo(receivedMsg.key.participant || receivedMsg.key.remoteJid)
                        }, { quoted: receivedMsg });
                        break;

                    case "5": // Reactions
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `*╭────⬡ REACTIONS ⬡────*
*├▢ • bully @tag*
*├▢ • cuddle @tag*
*├▢ • hug @tag*
*├▢ • kiss @tag*
*├▢ • lick @tag*
*├▢ • pat @tag*
*├▢ • slap @tag*
*├▢ • kick @tag*
*├▢ • poke @tag*
*├▢ • bite @tag*
*├▢ • yeet @tag*
*├▢ • blush @tag*
*├▢ • smile @tag*
*├▢ • wave @tag*
*├▢ • highfive @tag*
*├▢ • handhold @tag*
*╰────────────────*`,
                            contextInfo: commonContextInfo(receivedMsg.key.participant || receivedMsg.key.remoteJid)
                        }, { quoted: receivedMsg });
                        break;

                    case "6": // Convert Menu
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `*╭────⬡ CONVERT MENU ⬡────*
*├▢ • sticker <image>*
*├▢ • sticker2 <video>*
*├▢ • tomp3 <video>*
*├▢ • tomp4 <audio>*
*├▢ • tts <text>*
*├▢ • trt <text> <lang>*
*├▢ • base64 <text>*
*├▢ • unbase64 <text>*
*├▢ • binary <text>*
*├▢ • dbinary <binary>*
*├▢ • tinyurl <url>*
*├▢ • emojimix <emoji+emoji>*
*├▢ • fancy <text>*
*╰────────────────*`,
                            contextInfo: commonContextInfo(receivedMsg.key.participant || receivedMsg.key.remoteJid)
                        }, { quoted: receivedMsg });
                        break;

                    case "7": // Fun Menu
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `*╭────⬡ FUN MENU ⬡────*
*├▢ • joke*
*├▢ • meme*
*├▢ • fact*
*├▢ • quote*
*├▢ • truth*
*├▢ • dare*
*├▢ • ship @tag1 @tag2*
*├▢ • rate <something>*
*├▢ • hack @tag*
*├▢ • character*
*├▢ • pickup*
*├▢ • wyr*
*├▢ • wouldyourather*
*╰────────────────*`,
                            contextInfo: commonContextInfo(receivedMsg.key.participant || receivedMsg.key.remoteJid)
                        }, { quoted: receivedMsg });
                        break;

                    case "8": // Download Menu
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `*╭────⬡ DOWNLOAD MENU ⬡────*
*├▢ • ytmp3 <url>*
*├▢ • ytmp4 <url>*
*├▢ • fb <url>*
*├▢ • fb2 <url>*
*├▢ • fb3 <url>*
*├▢ • tiktok <url>*
*├▢ • insta <url>*
*├▢ • twitter <url>*
*├▢ • spotify <url>*
*├▢ • play <query>*
*├▢ • play2 <query>*
*├▢ • play3 <query>*
*├▢ • play4 <query>*
*├▢ • play5 <query>*
*├▢ • playx <query>*
*├▢ • mediafire <url>*
*├▢ • gdrive <url>*
*╰────────────────*`,
                            contextInfo: commonContextInfo(receivedMsg.key.participant || receivedMsg.key.remoteJid)
                        }, { quoted: receivedMsg });
                        break;

                    case "9": // Group Menu
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `*╭────⬡ GROUP MENU ⬡────*
*├▢ • add @tag*
*├▢ • kick @tag*
*├▢ • promote @tag*
*├▢ • demote @tag*
*├▢ • grouplink*
*├▢ • revoke*
*├▢ • setname <text>*
*├▢ • setdesc <text>*
*├▢ • setwelcome <text>*
*├▢ • setgoodbye <text>*
*├▢ • welcome on/off*
*├▢ • goodbye on/off*
*├▢ • lockgc*
*├▢ • unlockgc*
*├▢ • mute*
*├▢ • unmute*
*├▢ • tagall*
*├▢ • tagadmins*
*├▢ • hidetag <text>*
*╰────────────────*`,
                            contextInfo: commonContextInfo(receivedMsg.key.participant || receivedMsg.key.remoteJid)
                        }, { quoted: receivedMsg });
                        break;

                    case "10": // Main Menu
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `*╭────⬡ MAIN MENU ⬡────*
*├▢ • ping*
*├▢ • runtime*
*├▢ • uptime*
*├▢ • speedtest*
*├▢ • owner*
*├▢ • mpesamenu*
*├▢ • menu*
*├▢ • adultmenu*
*├▢ • listcmd*
*├▢ • allmenu*
*╰────────────────*`,
                            contextInfo: commonContextInfo(receivedMsg.key.participant || receivedMsg.key.remoteJid)
                        }, { quoted: receivedMsg });
                        break;

                    case "11": // Owner Menu
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `*╭────⬡ OWNER MENU ⬡────*
*├▢ • broadcast <message>*
*├▢ • ban @tag*
*├▢ • unban @tag*
*├▢ • block @tag*
*├▢ • unblock @tag*
*├▢ • join <link>*
*├▢ • leave*
*├▢ • setpp <image>*
*├▢ • fullpp*
*├▢ • shutdown*
*├▢ • restart*
*├▢ • update*
*├▢ • getsudo*
*├▢ • addsudo @tag*
*├▢ • delsudo @tag*
*├▢ • banlist*
*╰────────────────*`,
                            contextInfo: commonContextInfo(receivedMsg.key.participant || receivedMsg.key.remoteJid)
                        }, { quoted: receivedMsg });
                        break;

                    case "12": // Other Menu
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `*╭────⬡ OTHER MENU ⬡────*
*├▢ • weather <location>*
*├▢ • news*
*├▢ • movie <name>*
*├▢ • wikipedia <query>*
*├▢ • define <word>*
*├▢ • currency <amount> <from> <to>*
*├▢ • calculator <expression>*
*├▢ • flip*
*├▢ • roll*
*├▢ • fact*
*├▢ • rcolor*
*├▢ • countdown <seconds>*
*├▢ • remind <time> <message>*
*╰────────────────*`,
                            contextInfo: commonContextInfo(receivedMsg.key.participant || receivedMsg.key.remoteJid)
                        }, { quoted: receivedMsg });
                        break;

                    case "13": // Logo Menu
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `*╭────⬡ LOGO MENU ⬡────*
*├▢ • neonlight <text>*
*├▢ • blackpink <text>*
*├▢ • dragonball <text>*
*├▢ • 3dcomic <text>*
*├▢ • america <text>*
*├▢ • naruto <text>*
*├▢ • sadgirl <text>*
*├▢ • clouds <text>*
*├▢ • futuristic <text>*
*├▢ • 3dpaper <text>*
*├▢ • eraser <text>*
*├▢ • sunset <text>*
*├▢ • leaf <text>*
*├▢ • galaxy <text>*
*├▢ • sans <text>*
*├▢ • boom <text>*
*├▢ • hacker <text>*
*├▢ • devilwings <text>*
*├▢ • nigeria <text>*
*├▢ • bulb <text>*
*├▢ • angelwings <text>*
*├▢ • zodiac <text>*
*├▢ • luxury <text>*
*├▢ • paint <text>*
*├▢ • frozen <text>*
*├▢ • castle <text>*
*├▢ • tatoo <text>*
*├▢ • valorant <text>*
*├▢ • bear <text>*
*├▢ • typography <text>*
*├▢ • birthday <text>*
*╰────────────────*`,
                            contextInfo: commonContextInfo(receivedMsg.key.participant || receivedMsg.key.remoteJid)
                        }, { quoted: receivedMsg });
                        break;

                    case "14": // Tools Menu
                        await conn.sendMessage(senderID, {
                            image: { url: config.MENU_IMAGE_URL },
                            caption: `*╭────⬡ TOOLS MENU ⬡────*
*├▢ • setmyname <name>*
*├▢ • setpp <image>*
*├▢ • setonline <on/off>*
*├▢ • setppall <image>*
*├▢ • getbio @tag*
*├▢ • getpp @tag*
*├▢ • getprivacy*
*├▢ • groupsprivacy*
*├▢ • updatebio <text>*
*├▢ • blocklist*
*├▢ • fullpp*
*├▢ • tea*
*├▢ • chai*
*├▢ • remini <image>*
*├▢ • removebg <image>*
*├▢ • urltoimg <url>*
*├▢ • .reception*
*├▢ • .captain*
*├▢ • .repost*
*├▢ • .story*
*├▢ • .status*
*├▢ • .vcf*
*├▢ • .imgjoke*
*├▢ • .invert <image>*
*├▢ • .grey <image>*
*├▢ • .blur <image>*
*├▢ • .ad <text>*
*├▢ • .nokia <text>*
*├▢ • .wanted <image>*
*├▢ • .jail <image>*
*├▢ • .tiny <url>*
*├▢ • .chr <link> <text/emoji>*
*╰────────────────*`,
                            contextInfo: commonContextInfo(receivedMsg.key.participant || receivedMsg.key.remoteJid)
                        }, { quoted: receivedMsg });
                        break;

                    default:
                        await conn.sendMessage(senderID, {
                            text: "Invalid selection. Please reply with a number between 1-14.",
                            contextInfo: commonContextInfo(receivedMsg.key.participant || receivedMsg.key.remoteJid)
                        }, { quoted: receivedMsg });
                }
            }
        });

    } catch (e) {
        console.error(e);
        reply(`❌ Error:\n${e}`);
    }
});
  
