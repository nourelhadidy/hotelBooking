const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/Authmiddleware');

// ✅ Home route for all logged-in users
router.get('/home', auth, (req, res) => {
    res.json({
        ok: true,
        message: `Welcome ${req.user.role} (ID: ${req.user.id}) 🎉`
    });
});

module.exports = router;
