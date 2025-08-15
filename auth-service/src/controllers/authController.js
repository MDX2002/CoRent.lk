const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res) => {
  try {
    const { name, email, contact_number, password } = req.body;

    if (!name || !email || !password || !contact_number) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      if (results.length > 0) return res.status(400).json({ message: 'User already exists' });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      db.query(
        'INSERT INTO users (name, email, contact_number, password_hash) VALUES (?, ?, ?, ?)',
        [name, email, contact_number, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json({ message: err.message });

          // Create email verification token
          const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
          const verifyURL = `${process.env.FRONTEND_URL}/verify/${token}`;

          // Send verification email
          sendEmail(email, 'Verify your email', `Click to verify: ${verifyURL}`);

          return res.status(201).json({
            message: 'Registration successful. Check your email to verify.',
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email & password required' });

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      if (results.length === 0) return res.status(400).json({ message: 'User not found' });

      const user = results[0];

      // Check password
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      // Check verification
      if (!user.is_verified) return res.status(400).json({ message: 'Email not verified' });

      // Create JWT access token
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ message: 'Login successful', token });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyEmail = (req, res) => {
  const { token } = req.params;
  if (!token) return res.status(400).send('Invalid token');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    db.query('UPDATE users SET is_verified = 1 WHERE email = ?', [email], (err, result) => {
      if (err) return res.status(500).send('DB error');
      res.send('Email verified successfully!');
    });
  } catch (error) {
    res.status(400).send('Invalid or expired token');
  }
};
