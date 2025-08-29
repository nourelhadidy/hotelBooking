const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/user', require('./routes/user'));
app.use("/api/rooms", require("./routes/roomRoutes")); // Add room routes
app.use("/api/bookings", require("./routes/bookings")); // Add booking routes
app.use("/api/dashboard", require("./routes/dashboard")); // Add dashboard routes
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/booking')
.then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ DB connection error:', err));

app.listen(process.env.PORT || 5000, () => {
    console.log(`✅ Server running at http://localhost:${process.env.PORT || 5000}`);
});


