// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let bookings = [];

app.get('/bookings', (req, res) => {
    res.json(bookings);
});

app.post('/bookings', (req, res) => {
    const booking = req.body;
    bookings.push(booking);
    res.status(201).json(booking);
});

app.delete('/bookings/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < bookings.length) {
        const canceledBooking = bookings.splice(index, 1);
        res.json(canceledBooking);
    } else {
        res.status(404).json({ error: 'Booking not found' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
