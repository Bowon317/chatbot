const mysql = require('mysql2');
require('dotenv').config();

// สร้าง Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'chatbot_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ใช้ Promise wrapper
const db = pool.promise();

module.exports = db;
