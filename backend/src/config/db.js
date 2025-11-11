const mysql = require('mysql2/promise');

async function connectDB(retries = 10, delay = 3000) {
  while (retries > 0) {
    try {
      return await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      });
    } catch (err) {
      retries -= 1;
      await new Promise(res => setTimeout(res, delay));
    }
  }
}

module.exports = { connectDB };