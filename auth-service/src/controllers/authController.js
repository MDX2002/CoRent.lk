const db = require('../config/db'); // now it's a pool with .promise()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

// --- Register ---
exports.register = async (req, res) => {
  try {
    const { name, email, contact_number, password } = req.body;

    if (!name || !email || !password || !contact_number) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.query(
      'INSERT INTO users (name, email, contact_number, password_hash) VALUES (?, ?, ?, ?)',
      [name, email, contact_number, hashedPassword]
    );





    // Create email verification token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    //const verifyURL = `${process.env.BACKEND_URL}/api/auth/verify/${token}`;
    const verifyURL = `${process.env.FRONTEND_URL}/verify/${token}`;
    
    // Send verification email
    sendEmail(email, 'Verify your email', `Click to verify: ${verifyURL}`);
    

    res.status(201).json({ message: 'Registration successful. Check your email to verify.' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message });
  }
};

// --- Login ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email & password required' });

    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(400).json({ message: 'User not found' });

    const user = users[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Check verification
    if (!user.is_verified) return res.status(400).json({ message: 'Email not verified' });

    // Create JWT access token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

// --- Verify Email ---
exports.verifyEmail = async (req, res) => {
  const { token } = req.params;
  if (!token) return res.status(400).send('Invalid token');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    await db.query('UPDATE users SET is_verified = 1 WHERE email = ?', [email]);
    res.send('Email verified successfully!');
  } catch (error) {
    res.status(400).send('Invalid or expired token');
  }
};

// --- Get User By ID ---
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [users] = await db.query('SELECT id, name, contact_number, email FROM users WHERE id = ?', [id]);

    if (users.length === 0) return res.status(404).json({ message: 'User not found' });

    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// --- Forgot Password ---
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = users[0];
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '15m' } // expires in 15 minutes
    );

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await sendEmail(
      user.email,
      'Reset Your Password',
      `Click the link to reset your password: ${resetURL}`
    );

    res.json({ message: 'Password reset link sent to your email.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send reset link' });
  }
};

// --- Reset Password ---
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token) return res.status(400).json({ message: 'Invalid token' });
  if (!password) return res.status(400).json({ message: 'Password is required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query('UPDATE users SET password_hash = ? WHERE id = ?', [hashedPassword, userId]);

    res.json({ message: 'Password has been reset successfully!' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};
