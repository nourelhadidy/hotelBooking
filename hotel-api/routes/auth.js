const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { auth } = require('../middleware/Authmiddleware'); // ✅ add auth middleware

const router = express.Router();

/**
 * Register admin
 */
router.post('/register-admin', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ ok: false, error: "All fields required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ ok: false, error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            role: 'admin',
            passwordHash: hashedPassword
        });

        await user.save();

        // ✅ return token so admin can login immediately
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ ok: true, message: "Admin created successfully", token, user });
    } catch (err) {
        console.error('Register admin error:', err.message);
        res.status(500).json({ ok: false, error: "Server error" });
    }
});

/**
 * Login
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ ok: false, error: "All fields required" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ ok: false, error: "User not found" });

        const validPass = await bcrypt.compare(password, user.passwordHash);
        if (!validPass) return res.status(400).json({ ok: false, error: 'Invalid password' });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            ok: true,
            message: 'Login successful',
            data: { token, user },
            redirectTo: '/home' // 👈 so frontend knows where to go
        });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ ok: false, error: "Server error" });
    }
});

/**
 * Register normal user
 */
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ ok: false, error: 'All fields required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ ok: false, error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            passwordHash: hashedPassword,
            role: role || 'customer'
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            ok: true,
            message: 'User registered successfully',
            token,
            redirectTo: '/home'
        });
    } catch (err) {
        console.error('Register error:', err.message);
        res.status(500).json({ ok: false, error: 'Server error' });
    }
});

/**
 * Protected home route (any logged-in user)
 */
router.get('/home', auth, (req, res) => {
    res.json({
        ok: true,
        message: `Welcome ${req.user.role}, you are logged in!`,
        user: req.user
    });
});

module.exports = router;
