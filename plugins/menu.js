const config = require('../config');
const { cmd } = require('../command');
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
    desc: "Show complete list of all commands",
    category: "menu",
    react: "📚",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const uptime = runtime(process.uptime());

        const menu = `╭──────[ 🌟 ${config.BOT_NAME} FEATURES ]──────╮
│ 👤 Owner: ${config.OWNER_NAME}
│ ⏱ Uptime: ${uptime}
│ 📊 Prefix: ${config.PREFIX}
╰────────────────────────────────╯

╭──「 🤖 AI COMMANDS 」──
1. .ai <query>
2. .gpt <prompt>
3. .gpt2 <prompt>
4. .gpt3 <prompt>
5. .gpt4 <prompt>
6. .bard <query>
7. .blackbox <query>
8. .fluxai <query>
9. .copilot <query>
10. .meta <query>
11. .pk <query>

╭──「 🔊 DOWNLOAD COMMANDS 」──
12. .play <song name>
13. .ytmp3 <url>
14. .ytmp4 <url>
15. .spotify <url>
16. .tiktok <url>
17. .fb <url>
18. .twitter <url>
19. .mediafire <url>
20. .gdrive <url>

╭──「 🧱 CONVERT COMMANDS 」──
21. .sticker <image>
22. .tomp3 <video>
23. .tomp4 <audio>
24. .tts <text>
25. .base64 <text>
26. .unbase64 <text>
27. .binary <text>
28. .dbinary <binary>

╭──「 🎌 ANIME COMMANDS 」──
29. .waifu
30. .neko
31. .maid
32. .animequote
33. .animewall
34. .animememe

╭──「 😹 REACTIONS 」──
35. .hug @tag
36. .kiss @tag
37. .pat @tag
38. .slap @tag
39. .poke @tag
40. .bite @tag

╭──「 🌐 OTHER COMMANDS 」──
41. .weather <location>
42. .news
43. .wikipedia <query>
44. .define <word>
45. .currency <amount> <from> <to>
46. .calculator <expression>
47. .countdown <seconds>
48. .remind <time> <message>
49. .flip
50. .roll
51. .fact

╭──「 🧠 FUN COMMANDS 」──
52. .joke
53. .meme
54. .truth
55. .dare
56. .ship @tag1 @tag2
57. .rate <something>
58. .hack @tag
59. .pickup
60. .wyr
61. .wouldyourather

╭──「 🎨 LOGO COMMANDS 」──
62. .neonlight <text>
63. .blackpink <text>
64. .dragonball <text>
65. .naruto <text>
66. .sadgirl <text>
67. .galaxy <text>
68. .boom <text>
69. .angelwings <text>
70. .paint <text>

╭──「 👑 OWNER COMMANDS 」──
71. .ban @tag
72. .unban @tag
73. .block @tag
74. .unblock @tag
75. .broadcast <msg>
76. .restart
77. .shutdown

╭──「 👥 GROUP COMMANDS 」──
78. .add @tag
79. .kick @tag
80. .promote @tag
81. .demote @tag
82. .grouplink
83. .revoke
84. .setname <text>
85. .setdesc <text>
86. .welcome on/off
87. .goodbye on/off
88. .tagall
89. .hidetag <text>

╭──「 ⚙️ MAIN SYSTEM 」──
90. .menu
91. .listcmd
92. .allmenu
93. .ping
94. .uptime
95. .owner
96. .support

╰──── End of Command List ────╯`;

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

        // Send menu message
        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL },
            caption: menu,
            contextInfo: commonContextInfo(sender)
        }, { quoted: quotedContact });

        // Send PTT background song
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
        reply(`❌ Error while generating menu:\n${e.message}`);
    }
});
