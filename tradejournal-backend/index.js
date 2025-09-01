const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// --- Routes ---

// 1️⃣ Test route
app.get('/', (req, res) => {
  console.log('GET / called');
  res.send('Server is running!');
});

// 2️⃣ Get all trades
app.get('/trades', (req, res) => {
  db.query('SELECT * FROM trades ORDER BY trade_date DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 3️⃣ Add a new trade
app.post('/trades', (req, res) => {
  const { symbol, trade_type, quantity, price } = req.body;

  if (!symbol || !trade_type || !quantity || !price) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO trades (symbol, trade_type, quantity, price) VALUES (?, ?, ?, ?)';
  db.query(query, [symbol, trade_type, quantity, price], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Trade added successfully', id: result.insertId });
  });
});

// 4️⃣ Delete a trade by ID
app.delete('/trades/:id', (req, res) => {
  const tradeId = req.params.id;
  db.query('DELETE FROM trades WHERE id = ?', [tradeId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Trade not found' });
    res.json({ message: 'Trade deleted successfully' });
  });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Update trade by ID
app.put('/trades/:id', (req, res) => {
  const id = req.params.id;
  const { symbol, trade_type, quantity, price } = req.body;

  const query = 'UPDATE trades SET symbol=?, trade_type=?, quantity=?, price=? WHERE id=?';
  db.query(query, [symbol, trade_type, quantity, price, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Trade not found' });
    res.json({ message: 'Trade updated successfully' });
  });
});
