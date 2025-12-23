const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,

  ssl: {
    rejectUnauthorized: true,
  },

  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0
});

pool.getConnection((err, conn) => {
  if (err) {
    console.error("❌ DB CONNECTION FAILED:", err);
  } else {
    console.log("✅ DB CONNECTED SUCCESSFULLY");
    conn.release();
  }
});

module.exports = pool;
