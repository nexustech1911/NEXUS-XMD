const axios = require("axios");

const groqApiKey = "sk-..."; // BADILISHA na Groq API key yako

const fetchGptReply = async (message) => {
  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "mixtral-8x7b-32768", // au "llama3-70b-8192" ukipenda
        messages: [
          {
            role: "system",
            content: "You are NEXUS-XMD AI bot, a helpful assistant in WhatsApp chat. Answer clearly.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqApiKey}`,
        },
      }
    );

    return res.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Groq Chatbot Error:", error?.response?.data || error.message);
    return "⚠️ Samahani, kuna shida kupata jibu kutoka kwa AI.";
  }
};

module.exports = { fetchGptReply };
            
