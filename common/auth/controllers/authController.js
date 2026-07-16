const authService = require('../services/authService');

async function register(req, res) {
  const { email, password } = req.body;
  const user = await authService.register(email, password);
  res.status(201).json({ id: user.id, email: user.email });
}

async function login(req, res) {
  const { email, password } = req.body;
  const token = await authService.login(email, password);
  if (!token) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ token });
}

module.exports = { register, login };
