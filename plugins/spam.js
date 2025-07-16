const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "spam",
    desc: "Spam a user's DM and block them after.",
    category: "main",
    use: '.spam @user 5 message',
    filename: __filename,
    react: "💣"
},
async (conn, m, msg, { args, sender, from, reply }) => {
    try {
        if (args.length < 3) return reply("⚠️ Usage: .spam @user 5 message");

        let mentioned = m.mentionedJid && m.mentionedJid[0];
        if (!mentioned) return reply("⚠️ Tag the user to spam.");

        const count = parseInt(args[1]);
        if (isNaN(count) || count > 10 || count < 1) return reply("⚠️ Spam count must be between 1 and 10.");

        const spamText = args.slice(2).join(" ");
        const spamTarget = mentioned;

        const fakeContact = {
            key: {
                fromMe: false,
                participant: '0@s.whatsapp.net',
                remoteJid: 'status@broadcast',
            },
            message: {
                contactMessage: {
                    displayName: "NEXUS SYSTEM",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:NEXUS SYSTEM\nORG:NEXUS-XMD;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`
                }
            }
        };

        reply(`💣 Spamming @${spamTarget.split('@')[0]} ${count} times...`);

        for (let i = 0; i < count; i++) {
            await conn.sendMessage(spamTarget, {
                text: `💣 *SPAM MESSAGE*\n\n${spamText}`,
                contextInfo: {
                    mentionedJid: [spamTarget],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363288304618280@newsletter',
                        newsletterName: 'NEXUS-BOTS SUPPORT',
                        serverMessageId: 666
                    }
                }
            }, { quoted: fakeContact });
            await new Promise(res => setTimeout(res, 1500)); // 1.5 sec delay to avoid flood block
        }

        await conn.updateBlockStatus(spamTarget, 'block');
        reply(`✅ Done spamming and blocked @${spamTarget.split('@')[0]}`);

    } catch (e) {
        console.error("Spam error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
