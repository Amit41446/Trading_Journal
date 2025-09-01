// ======================= GLOBAL DATA =======================
let trades = [
  { date: "26 Aug 2025", symbol: "INFY", type: "BUY", qty: 10, price: 1520.50, pnl: 240 },
  { date: "22 Aug 2025", symbol: "RELIANCE", type: "SELL", qty: 5, price: 2500.00, pnl: 125 },
  { date: "21 Aug 2025", symbol: "TCS", type: "SELL", qty: 15, price: 3150.00, pnl: 150 },
  { date: "20 Aug 2025", symbol: "HDFC", type: "BUY", qty: 20, price: 1600.00, pnl: -310 },
];

// ======================= FUNCTIONS =======================

// Populate trades table
function populateTrades() {
  const tbody = document.querySelector("#tradeTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  trades.forEach(trade => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${trade.date}</td>
      <td>${trade.symbol}</td>
      <td>${trade.type}</td>
      <td>${trade.qty}</td>
      <td>₹${trade.price.toFixed(2)}</td>
      <td class="${trade.pnl >= 0 ? 'profit' : 'loss'}">
        ${trade.pnl >= 0 ? '+' : ''}${trade.pnl}
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Update summary cards
function updateSummary() {
  const dailyPLEl = document.getElementById("dailyPL");
  const investedEl = document.getElementById("invested");
  const netPLEl = document.getElementById("netPL");
  const winRateEl = document.getElementById("winRate");

  if (!dailyPLEl) return;

  if (trades.length === 0) {
    dailyPLEl.textContent = "₹0";
    investedEl.textContent = "₹0";
    netPLEl.textContent = "₹0";
    winRateEl.textContent = "0%";
    return;
  }

  const dailyPL = trades.reduce((sum, t) => sum + t.pnl, 0);
  const invested = trades.reduce((sum, t) => sum + (t.qty * t.price), 0);
  const netPL = dailyPL;
  const wins = trades.filter(t => t.pnl > 0).length;
  const winRate = Math.round((wins / trades.length) * 100);

  dailyPLEl.textContent = `₹${dailyPL >= 0 ? '+' : ''}${dailyPL}`;
  investedEl.textContent = `₹${invested.toFixed(2)}`;
  netPLEl.textContent = `₹${netPL >= 0 ? '+' : ''}${netPL}`;
  winRateEl.textContent = `${winRate}%`;
}

// Add new trade
function handleAddTrade(event) {
  event.preventDefault();

  const symbolEl = document.getElementById("symbol");
  const typeEl = document.getElementById("type");
  const qtyEl = document.getElementById("quantity");
  const priceEl = document.getElementById("price");

  if (!symbolEl || !qtyEl || !priceEl || !typeEl) return;

  const symbol = symbolEl.value.trim().toUpperCase();
  const type = typeEl.value;
  const qty = parseInt(qtyEl.value);
  const price = parseFloat(priceEl.value);

  if (!symbol || !qty || !price) return;

  const pnl = Math.round(Math.random() * 200 - 100); // example P&L
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  trades.push({ date, symbol, type, qty, price, pnl });

  populateTrades();
  updateSummary();

  document.getElementById("tradeForm").reset();
}

// Reset journal
function resetJournal() {
  const confirmReset = confirm("Are you sure you want to reset the journal? All trades will be lost?");
  if (!confirmReset) return;

  trades = [];

  if (document.querySelector("#tradeTable")) populateTrades();
  updateSummary();

  alert("Journal has been reset to default!");

  window.location.href = "index.html"; // redirect to dashboard
}

// ======================= INIT =======================
document.addEventListener("DOMContentLoaded", () => {
  populateTrades();
  updateSummary();

  const tradeForm = document.getElementById("tradeForm");
  if (tradeForm) tradeForm.addEventListener("submit", handleAddTrade);
});
