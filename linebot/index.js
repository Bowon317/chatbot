const express = require('express');
const linebot = require('linebot');
const { askGemini } = require('./geminiService');
const db = require('./db');
require('dotenv').config();
const cors = require('cors');
const reviewService = require('./reviewService');
const app = express();
app.use(cors());

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

// ✅ ต้องมาก่อน express.json()
app.post('/linewebhook', bot.parser());

bot.on('message', async event => {
  const userMsg = event.message.text;
  const lineUserId = event.source.userId;
  const userId = `USER-${lineUserId}`;

  try {
    const [userRows] = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);
    if (userRows.length === 0) {
      await db.query('INSERT INTO users (user_id, line_user_id) VALUES (?, ?)', [userId, lineUserId]);
      console.log(`✅ เพิ่มผู้ใช้ใหม่: ${userId}`);
    }

    // ✅ ตรวจสอบว่าผู้ใช้ส่งข้อความที่เป็นรีวิว
    if (userMsg.startsWith('รีวิว')) {
      const reviewText = userMsg.replace('รีวิว', '').trim();

      if (reviewText.length === 0) {
        await event.reply('กรุณาพิมพ์ข้อความรีวิวต่อจากคำว่า "รีวิว" ด้วยครับ');
        return;
      }

      await reviewService.saveReview(lineUserId, reviewText);
      console.log(`📝 บันทึกรีวิวจาก ${lineUserId}: ${reviewText}`);

      await event.reply('ขอบคุณสำหรับรีวิวของคุณครับ 😊');
      return;
    }

    // ✅ เก็บคำค้นหาปกติ
    await db.query('INSERT INTO search_history (user_id, keyword) VALUES (?, ?)', [userId, userMsg]);
    console.log(`🔍 คำค้นหา: "${userMsg}" จาก ${userId}`);

    const gptReply = await askGemini(userMsg);
    console.log(`🤖 Gemini ตอบ: ${gptReply}`);

    await event.reply(gptReply);
  } catch (err) {
    console.error('🚨 Error:', err);
    await event.reply('ขออภัย เซิร์ฟเวอร์มีปัญหา กรุณาลองใหม่');
  }
});

// 👇 JSON middleware สำหรับ React frontend
app.use(express.json());

app.get('/search-history', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM search_history ORDER BY created_at DESC');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  const { line_user_id, review_text } = req.body;
  await reviewService.saveReview(line_user_id, review_text);
  res.json({ message: 'Review saved' });
});

app.get('/api/reviews', async (req, res) => {
  const reviews = await reviewService.getAllReviews();
  res.json(reviews);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
