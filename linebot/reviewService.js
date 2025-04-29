// linebot/reviewService.js
const db = require('./db');

// บันทึกรีวิว
exports.saveReview = async (lineUserId, reviewText) => {
  const [result] = await db.query(
    'INSERT INTO reviews (line_user_id, review_text) VALUES (?, ?)',
    [lineUserId, reviewText]
  );
  return result;
};

// ดึงรีวิวทั้งหมด
exports.getAllReviews = async () => {
  const [rows] = await db.query('SELECT * FROM reviews ORDER BY created_at DESC');
  return rows;
};
