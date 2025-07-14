const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
  return text === fault ? true : false;
}

module.exports = {
  SESSION_ID: process.env.SESSION_ID || "",
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
  AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
  AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
  AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*SEEN YOUR STATUS BY NEXUS-XMD🤍*",
  WELCOME: process.env.WELCOME || "true",
  ADMIN_EVENTS: process.env.ADMIN_EVENTS || "false",
  ANTI_LINK: process.env.ANTI_LINK || "true",
  ANTICALL: process.env.ANTICALL || "true",
  MENTION_REPLY: process.env.MENTION_REPLY || "false",
  MENU_IMAGE_URL: process.env.MENU_IMAGE_URL || "https://files.catbox.moe/z62ts0.jpg",
  PREFIX: process.env.PREFIX || ".",
  BOT_NAME: process.env.BOT_NAME || "NEXUS-XMD",
  STICKER_NAME: process.env.STICKER_NAME || "NEXUS-XMD",
  CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
  CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
  DELETE_LINKS: process.env.DELETE_LINKS || "true",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "254794146821",
  OWNER_NAME: process.env.OWNER_NAME || "Pkdriller",
  DESCRIPTION: process.env.DESCRIPTION || "*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ Pkdriller*",
  ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/z62ts0.jpg",
  LIVE_MSG: process.env.LIVE_MSG || "> Zinda Hun Yar *NEXUS-XMD*⚡",
  READ_MESSAGE: process.env.READ_MESSAGE || "false",
  AUTO_REACT: process.env.AUTO_REACT || "false",
  ANTI_BAD: process.env.ANTI_BAD || "false",
  MODE: process.env.MODE || "public",
  ANTI_LINK_KICK: process.env.ANTI_LINK_KICK || "true",
  AUTO_VOICE: process.env.AUTO_VOICE || "false",
  AUTO_STICKER: process.env.AUTO_STICKER || "false",
  AUTO_REPLY: process.env.AUTO_REPLY || "false",
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
  PUBLIC_MODE: process.env.PUBLIC_MODE || "true",
  AUTO_TYPING: process.env.AUTO_TYPING || "false",
  READ_CMD: process.env.READ_CMD || "false",
  DEV: process.env.DEV || "254794146821",
  ANTI_VV: process.env.ANTI_VV || "true",
  ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "log",
  AUTO_RECORDING: process.env.AUTO_RECORDING || "false",

  // ✅ GROQ CHATBOT SETTINGS (NEW)
  CHATBOT_MODE: process.env.CHATBOT_MODE || "true", // Turn chatbot on/off
  GROQ_API_KEY: process.env.GROQ_API_KEY || "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",       // Add your Groq API Key here
  GROQ_MODEL: process.env.GROQ_MODEL || "mixtral-8x7b-32768" // Default model from Groq
};
