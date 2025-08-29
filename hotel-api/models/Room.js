const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Single", "Double", "Suite"],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    maxGuests: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.models.Room || mongoose.model("Room", RoomSchema);
