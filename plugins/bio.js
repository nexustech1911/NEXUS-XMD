const { cmd } = require('../command');
const moment = require('moment-timezone');
const config = require('../config');

let autobioEnabled = false;
let bioInterval;

cmd({
  pattern: "autobio",
  use: ".autobio on / off",
  desc: "Automatically update bot bio with time",
  category: "owner",
  filename: __filename,
  react: "📝"
}, async (conn, m, msg, { args, sender, isOwner }) => {
  if (!isOwner) return msg.reply("🛑 Only the owner can use this.");

  const option = args[0]?.toLowerCase();
  if (!['on', 'off'].includes(option)) return msg.reply("⚙️ Use `.autobio on` or `.autobio off`");

  if (option === 'on') {
    if (autobioEnabled) return msg.reply("🟢 Autobio is already enabled.");
    autobioEnabled = true;

    bioInterval = setInterval(async () => {
      const time = moment().tz(config.timezone).format("HH:mm:ss");
      const bio = `🔁 Active | 🕒 ${time} | 🤖 NEXUS-XMD`;

      try {
        await conn.updateProfileStatus(bio);
      } catch (e) {
        console.log("Failed to update bio:", e);
      }
    }, 30 * 1000); // Update every 30 seconds

    msg.reply("✅ Autobio has been *enabled*.");
  }

  if (option === 'off') {
    if (!autobioEnabled) return msg.reply("🛑 Autobio is already disabled.");
    autobioEnabled = false;

    clearInterval(bioInterval);
    msg.reply("❌ Autobio has been *disabled*.");
  }
});
