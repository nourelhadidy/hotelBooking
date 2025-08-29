const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// GET available rooms first to avoid :id catching 'available'
router.get("/available", async (req, res) => {
    try {
        const { checkIn, checkOut, guests } = req.query;
        const availableRooms = await Room.find({ maxGuests: { $gte: guests } });
        res.json(availableRooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET all rooms
router.get("/", async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single room details
router.get("/:id", async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: "Room not found" });
        res.json(room);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
