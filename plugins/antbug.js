const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "antibug",
    alias: ["cleanbug", "bugfix"],
    use: ".antibug",
    desc: "Clean bug or crash messages in group or private chat.",
    category: "utilities",
    react: "🧹",
    filename: __filename
},
async (conn, m, mdata, { from, sender, quoted, isGroup }) => {
    const cleanBug = async () => {
        try {
            let messages = await conn.fetchMessages(from, { limit: 25 });
            let deleted = 0;
            let blocked = new Set();

            for (let msg of messages) {
                const content =
                    msg.message?.conversation ||
                    msg.message?.extendedTextMessage?.text ||
                    "";

                const isBug =
                    content.length > 1000 ||
                    /[\u200B-\u200F\uFEFF]/.test(content);

                if (isBug) {
                    // Delete the message
                    await conn.sendMessage(from, { delete: msg.key });
                    deleted++;

                    // Block the sender of the bug message
                    const userToBlock = msg.key.participant || msg.key.remoteJid;
                    if (userToBlock && !blocked.has(userToBlock)) {
                        await conn.updateBlockStatus(userToBlock, "block");
                        blocked.add(userToBlock);
                    }
                }
            }

            await conn.sendMessage(from, {
                text: `✅ AntiBug Completed.\n🧹 Deleted: *${deleted}* bugs\n🚫 Blocked: *${blocked.size}* users`,
                mentions: [sender]
            }, {
                quoted: {
                    key: {
                        fromMe: false,
                        participant: "0@s.whatsapp.net",
                        remoteJid: "status@broadcast"
                    },
                    message: {
                        contactMessage: {
                            displayName: "NEXUS-XMD Verified User",
                            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Anti;Bug;;;\nFN:Anti Bug\nitem1.TEL;waid=${sender.split('@')[0]}:+${sender.split('@')[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`
                        }
                    }
                },
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363288304618280@newsletter',
                        newsletterName: 'NEXUS-XMD SYSTEM',
                        serverMessageId: 202
                    }
                }
            });

        } catch (err) {
            console.error("❌ AntiBug error:", err);
            await conn.sendMessage(from, { text: `❌ Failed to clean bug messages.` });
        }
    };

    await cleanBug();
});
