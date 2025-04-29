const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function askGemini(message) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // ✅ ใช้ชื่อโมเดลใหม่

    const result = await model.generateContent([message]); // ✅ ใส่ใน array
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error("Gemini Error:", err.message);
    return "ขออภัย บอทไม่สามารถตอบได้ในขณะนี้";
  }
}

module.exports = { askGemini };
