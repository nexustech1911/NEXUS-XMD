const { cmd } = require('../command')
const { yt } = require('@dark-yasiya/yt-dl.js')
const axios = require('axios')
const config = require('../config')

cmd({
    pattern: "video3",
    alias: ["ytv3", "mp43"],
    desc: "Download YouTube video by name or link",
    category: "Downloaders",
    use: '.video <name or link>',
    filename: __filename
}, async (conn, m, text) => {
    if (!text) return m.reply("🎥 *Please provide a song name or YouTube link!*")

    try {
        let search = await yt(text)
        let vid = search?.video || search[0]
        if (!vid) return m.reply("🚫 Video not found.")

        let caption = `🎬 *Title:* ${vid.title}\n⏱️ *Duration:* ${vid.duration}\n👁️ *Views:* ${vid.views}\n📎 *Link:* ${vid.url}`

        let fakeContact = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "NEXUS Verified Channel",
                    vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:NEXUS Verified\nORG:NEXUS-XMD;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD"
                }
            }
        }

        await conn.sendMessage(m.chat, {
            video: { url: vid.url_video },
            caption,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: "YouTube Video Downloader",
                    body: "Powered by NEXUS-XMD",
                    mediaUrl: vid.url,
                    mediaType: 1,
                    previewType: "VIDEO",
                    renderLargerThumbnail: true,
                    thumbnailUrl: vid.thumbnail,
                    sourceUrl: vid.url
                },
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363288304618280@newsletter',
                    newsletterName: 'NEXUS-XMD CHANNEL',
                    serverMessageId: 402
                }
            },
            quoted: fakeContact
        }, { quoted: fakeContact })

    } catch (e) {
        console.error(e)
        return m.reply("❌ Error fetching video.")
    }
})
