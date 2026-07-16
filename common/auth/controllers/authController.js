const authService = require('../services/authService');

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days
const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
};

async function register(req, res) {
  const { email, password } = req.body;
  try {
    const user = await authService.register(email, password);
    res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'Email already registered' });
    }
    throw err;
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  if (result.error === 'not_accepted') {
    return res.status(403).json({ error: 'Account is awaiting approval' });
  }
  if (result.error) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.cookie('token', result.token, { ...COOKIE_OPTIONS, maxAge: COOKIE_MAX_AGE });
  res.json({ message: 'Logged in' });
}

function logout(req, res) {
  res.clearCookie('token', COOKIE_OPTIONS);
  res.json({ message: 'Logged out' });
}

async function me(req, res) {
  const user = await authService.getMe(req.userId);
  res.json(user);
}

async function listUsers(req, res) {
  const users = await authService.listUsers();
  res.json(users);
}

async function setAccept(req, res) {
  const user = await authService.setAccept(req.params.id, req.body.isAccept);
  res.json(user);
}

module.exports = { register, login, logout, me, listUsers, setAccept };
