
const express = require('express');
const app = express();
const PORT = 3000;

const { accounts, users } = require('./data');
const { verifyToken } = require('./middleware');

app.use(express.json());


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful", token: user.token });
});


app.get('/accounts', verifyToken, (req, res) => {
  res.json(accounts);
});


app.post('/accounts/:id/status', verifyToken, (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  const account = accounts.find(acc => acc.id === id);
  if (!account) {
    return res.status(404).json({ message: "Company not found" });
  }

  account.accountStatus = status;
  res.json({ message: "Status updated" });
});


app.listen(PORT, () => {
  console.log(`✅ API running on http://localhost:${PORT}`);
});
