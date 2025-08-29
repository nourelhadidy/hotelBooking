const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// GET /api/bookings - Fetches all bookings
router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find({});
        res.status(200).json(bookings);
    } catch (err) {
        console.error("Error fetching bookings:", err);
        res.status(500).json({ ok: false, error: "Server error" });
    }
});

// POST /api/bookings - Creates a new booking
router.post("/", async (req, res) => {
    try {
        const { userId, roomId, checkIn, checkOut, price } = req.body;
        if (!userId || !roomId || !checkIn || !checkOut) {
            return res.status(400).json({ ok: false, error: "All fields required" });
        }
        const booking = new Booking({ ...req.body });
        await booking.save();
        res.status(201).json({ ok: true, message: "Booking created", booking });
    } catch (err) {
        console.error("Error creating booking:", err);
        res.status(500).json({ ok: false, error: err.message });
    }
});

// ✅ --- NEW CODE STARTS HERE ---

/**
 * PUT /api/bookings/:id - Updates a specific booking
 * This route handles the "Update" button click from your admin dashboard.
 */
router.put("/:id", async (req, res) => {
    try {
        const bookingId = req.params.id;
        const updatedData = req.body;

        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updatedData, { new: true });

        if (!updatedBooking) {
            return res.status(404).json({ ok: false, error: "Booking not found" });
        }

        res.status(200).json({ ok: true, message: "Booking updated successfully", booking: updatedBooking });

    } catch (err) {
        console.error("Error updating booking:", err);
        res.status(500).json({ ok: false, error: "Server error while updating booking" });
    }
});

/**
 * DELETE /api/bookings/:id - Deletes a specific booking
 * This route handles the "Delete" button click from your admin dashboard.
 */
router.delete("/:id", async (req, res) => {
    try {
        const bookingId = req.params.id;
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);

        if (!deletedBooking) {
            return res.status(404).json({ ok: false, error: "Booking not found" });
        }

        res.status(200).json({ ok: true, message: "Booking deleted successfully" });

    } catch (err) {
        console.error("Error deleting booking:", err);
        res.status(500).json({ ok: false, error: "Server error while deleting booking" });
    }
});

// ✅ --- NEW CODE ENDS HERE ---


module.exports = router;
