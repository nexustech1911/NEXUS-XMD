const { cmd } = require('../command')
const config = require('../config')

cmd({
    pattern: "ship",
    alias: ["compatibility", "lovematch"],
    category: "fun",
    desc: "Calculate love compatibility between two users.",
    use: ".ship @user1 @user2",
    filename: __filename,
    react: "💘"
}, async (conn, m, { text, args, sender, mentions }) => {
    
    const quotedContact = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            remoteJid: "status@broadcast"
        },
        message: {
            contactMessage: {
                displayName: "Official NEXUS-XMD™",
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;NEXUS-XMD;;;\nFN:NEXUS-XMD\nitem1.TEL;waid=254700000000:+254 700 000000\nitem1.X-ABLabel:Official Bot\nEND:VCARD`
            }
        }
    }

    const contextInfo = {
        mentionedJid: [sender, ...(mentions || [])],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363288304618280@newsletter',
            newsletterName: 'NEXUS-XMD UPDATES',
            serverMessageId: 106,
        }
    }

    // Check for 2 mentions
    if ((mentions || []).length < 2) {
        return await conn.sendMessage(m.chat, {
            text: `*💘 Use the command like this:*\n\n.ship @user1 @user2\n\n_Tag two users to calculate their love score_ ❤️`,
            contextInfo
        }, { quoted: quotedContact })
    }

    // Extract names or fallback to short JID
    const [user1, user2] = mentions
    const getName = jid => conn.getName(jid) || jid.split("@")[0]

    const name1 = await getName(user1)
    const name2 = await getName(user2)

    // Generate score and message
    const score = Math.floor(Math.random() * 101)
    let emoji = "❤️"
    let message = ""

    if (score > 90) {
        emoji = "💖💍"
        message = "Perfect couple! Wedding bells soon? 💍"
    } else if (score > 70) {
        emoji = "😍"
        message = "Great chemistry! You two would rock together! 💞"
    } else if (score > 50) {
        emoji = "😊"
        message = "There’s potential... maybe a date soon? 🌹"
    } else if (score > 30) {
        emoji = "😅"
        message = "Hmm... friends zone might be safer 😬"
    } else {
        emoji = "💔"
        message = "Oil & water... this might not work out 😭"
    }

    const response = `┏━━━━━━༺💘༻━━━━━━┓
*❤️ LOVE COMPATIBILITY ❤️*
┗━━━━━━━━━━━━━━━━━━━━┛

👤 *${name1}*
💞 *${name2}*
    
*💯 Score:* *${score}%* ${emoji}

💬 *Status:* ${message}

✨ _Brought to you by NEXUS-XMD Bot™_`

    await conn.sendMessage(m.chat, { text: response, contextInfo }, { quoted: quotedContact })
})
