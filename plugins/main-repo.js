const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "repo",
    alias: ["github"],
    desc: "Show GitHub repository info",
    category: "main",
    use: '.repo',
    react: "📦",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        const apiUrl = 'https://api.github.com/repos/nexustech1911/NEXUS-XMD';
        const { data } = await axios.get(apiUrl);

        const stars = data.stargazers_count;
        const forks = data.forks_count;
        const watchers = data.subscribers_count;
        const html_url = data.html_url;

        const msg = `
*🌐 NEXUS-XMD GITHUB REPO*
┏━━━━━━━━━━━━━━━⬣
┃ 👥 *Owner:* ${data.owner.login}
┃ 🌟 *Stars:* ${stars}
┃ 🍴 *Forks:* ${forks}
┃ 👀 *Watchers:* ${watchers}
┃ 🔗 *Repo:* ${html_url}
┃ 
┃ ⚙️ Deploy via:
┃ 🔹 Heroku
┃ 🔹 Render
┃ 🔹 Railway
┃ 🔹 Cpanel / VPS
┗━━━━━━━━━━━━━━━⬣
        `.trim();

        await conn.sendMessage(from, {
            text: msg,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363288304618280@newsletter',
                    newsletterName: "Nexus tech",
                    serverMessageId: 145
                },
                externalAdReply: {
                    showAdAttribution: true,
                    title: "NEXUS-XMD on GitHub",
                    body: "Click to view the official repo",
                    thumbnailUrl: 'https://github.com/nexustech1911/NEXUS-XMD-DATA/raw/refs/heads/main/logo/Nexus-xmd.jpg',
                    mediaType: 1,
                    mediaUrl: html_url,
                    sourceUrl: html_url
                }
            }
        }, {
            quoted: {
                key: {
                    fromMe: false,
                    participant: "0@s.whatsapp.net",
                    remoteJid: "status@broadcast"
                },
                message: {
                    contactMessage: {
                        displayName: "Verified GitHub",
                        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:GitHub Inc\nORG:Nexus Tech Verified✅;\nTEL;type=CELL;type=VOICE;waid=1234567890:+1 234 567 890\nEND:VCARD`
                    }
                }
            }
        });

    } catch (err) {
        console.error(err);
        reply("❌ Failed to fetch GitHub data.");
    }
});
