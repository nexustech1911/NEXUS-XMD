const { cmd } = require('../command');
const chatbot = require('../lib/chatbot-db');

cmd({
  pattern: "chatbot",
  alias: ["cb"],
  desc: "Turn on/off chatbot in private chat",
  category: "AI",
  use: "chatbot on / chatbot off",
  react: "🤖",
  fromMe: false,

  async function(conn, m, mdata) {
    const { args, reply, isGroup, sender } = mdata;

    if (isGroup) return reply("❌ Chatbot can only be enabled in private chats.");

    if (!args[0]) return reply("⚙️ Usage: .chatbot on / off");

    if (args[0].toLowerCase() === "on") {
      chatbot.setChatbot(sender, true);
      reply("✅ Chatbot enabled.");
    } else if (args[0].toLowerCase() === "off") {
      chatbot.setChatbot(sender, false);
      reply("🛑 Chatbot disabled.");
    } else {
      reply("⚙️ Usage: .chatbot on / off");
    }
  }
});
