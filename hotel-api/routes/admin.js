const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Room = require("../models/room");
const Booking = require("../models/Booking"); // Import Booking model
const { auth, isAdmin } = require("../middleware/Authmiddleware");

// GET all users
router.get("/users", auth, isAdmin, async (req, res) => {
    try {
        const users = await User.find().select("-passwordHash");
        res.json({ ok: true, data: users });
    } catch (err) {
        console.error("Admin GET users error:", err.message);
        res.status(500).json({ ok: false, error: "Server error" });
    }
});

// ADD a new user
router.post("/users", auth, isAdmin, async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ ok: false, error: "All fields required" });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ ok: false, error: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, role: role || "customer", passwordHash: hashedPassword });
        await user.save();
        res.json({ ok: true, message: "User created successfully", data: user });
    } catch (err) {
        console.error("Admin ADD user error:", err.message);
        res.status(500).json({ ok: false, error: "Server error" });
    }
});

// UPDATE user
router.put("/users/:id", auth, isAdmin, async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { name, email, role }, { new: true });
        res.json({ ok: true, data: user });
    } catch (err) {
        console.error("Admin UPDATE user error:", err.message);
        res.status(500).json({ ok: false, error: "Server error" });
    }
});

// DELETE user
router.delete("/users/:id", auth, isAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ ok: true, message: "User deleted successfully" });
    } catch (err) {
        console.error("Admin DELETE user error:", err.message);
        res.status(500).json({ ok: false, error: "Server error" });
    }
});

// Admin: List all bookings
router.get("/bookings", auth, isAdmin, async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin: Update booking status
router.put("/bookings/:id", auth, isAdmin, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        if (req.body.status) booking.status = req.body.status;

        const updatedBooking = await booking.save();
        res.json(updatedBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Admin: Reports API
router.get("/stats", auth, isAdmin, async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments();
        const paidBookings = await Booking.find({ paymentStatus: "paid" });
        const totalRevenue = paidBookings.reduce((acc, booking) => acc + booking.price, 0);

        res.json({
            totalBookings,
            occupancyRate: "N/A (requires full booking data)",
            totalRevenue,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin: Add new room
router.post("/rooms", auth, isAdmin, async (req, res) => {
    const room = new Room({
        type: req.body.type,
        price: req.body.price,
        maxGuests: req.body.maxGuests,
        description: req.body.description,
        images: req.body.images,
    });

    try {
        const newRoom = await room.save();
        res.status(201).json(newRoom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Admin: Edit room details
router.put("/rooms/:id", auth, isAdmin, async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: "Room not found" });

        if (req.body.type) room.type = req.body.type;
        if (req.body.price) room.price = req.body.price;
        if (req.body.maxGuests) room.maxGuests = req.body.maxGuests;
        if (req.body.description) room.description = req.body.description;
        if (req.body.images) room.images = req.body.images;

        const updatedRoom = await room.save();
        res.json(updatedRoom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Admin: Remove room
router.delete("/rooms/:id", auth, isAdmin, async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: "Room not found" });

        await room.deleteOne();
        res.json({ message: "Room deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;


