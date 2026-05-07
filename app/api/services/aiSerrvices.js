import axios from "axios";

export const askAI = async (message) => {
  try {
    const res = await axios.post("http://127.0.0.1:8000/chat", {
      query: message,
    });

    return res.data.response;
  } catch (error) {
    console.error("❌ AI Service Error:", error.message);
    return "AI service is currently unavailable";
  }
};