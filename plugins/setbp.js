const { cmd } = require('../command');
const config = require('../config');

cmd({
  pattern: "setbp",
  alias: ["setpfp"],
  use: ".setpp (send or reply to an image)",
  desc: "Set bot's profile picture",
  category: "owner",
  filename: __filename,
  react: "🖼️"
}, async (conn, m, msg, { sender, isOwner }) => {
  if (!isOwner) return msg.reply("🛑 *Only the bot owner can use this.*");

  let imageMsg = msg.quoted && msg.quoted.mimetype?.startsWith('image') ? msg.quoted : msg;
  if (!imageMsg.mimetype?.startsWith('image')) return msg.reply("📸 *Please reply/send an image to set as profile picture.*");

  try {
    let media = await conn.downloadMediaMessage(imageMsg);
    await conn.updateProfilePicture(conn.user.id, media);

    await conn.sendMessage(msg.from, {
      text: `✅ *Profile picture updated successfully!*`,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        quotedMessage: {
          contactMessage: {
            displayName: "NEXUS OWNER",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:NEXUS OWNER\nTEL;type=CELL;waid=${sender.split('@')[0]}:+${sender.split('@')[0]}\nEND:VCARD`
          }
        },
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363288304618280@newsletter",
          newsletterName: "NEXUS-XMD UPDATES",
          serverMessageId: 101
        }
      }
    }, { quoted: msg });
  } catch (e) {
    console.error(e);
    msg.reply("❌ Failed to update profile picture.");
  }
});
