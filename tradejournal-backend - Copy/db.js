const mysql = require('mysql2');

// 🔹 Update these credentials
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // or 'root'
  password: 'Amit41446', // your MySQL password
  database: 'tradejournal'
});

// Connect to database
db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL database successfully!');

  // Create 'trades' table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS trades (
      id INT AUTO_INCREMENT PRIMARY KEY,
      symbol VARCHAR(10) NOT NULL,
      trade_type ENUM('BUY','SELL') NOT NULL,
      quantity INT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      trade_date DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('❌ Failed to create table:', err.message);
    } else {
      console.log('✅ Trades table is ready!');
    }
  });
});
module.exports = db;
