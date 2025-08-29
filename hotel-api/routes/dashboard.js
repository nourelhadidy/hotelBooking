// routes/user.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Booking = require("../models/Booking");

// Get user info + bookings
router.get("/:userId", async (req, res) => {
    try {
        // Fetch user info (include name, email, and createdAt)
        const user = await User.findById(req.params.userId).select("name email createdAt");

        // Fetch all bookings for that user
        const bookings = await Booking.find({ userId: req.params.userId });

        // Return combined response
        res.json({ user, bookings });
    } catch (error) {
        console.error("Error fetching user info:", error);
        res.status(500).json({ message: "Error fetching user info", error });
    }
});

module.exports = router;
