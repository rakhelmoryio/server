const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();
const Booking = require('./model/bookingSchema');
const PORT = process.env.PORT || 3000
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));




app.use(bodyParser.json());
app.use(cors());

app.get('/',(req , res)=>{
  res.json({message:"Welcome"})
})

app.post('/bookings', async (req, res) => {
  try {
    const newPassenger = new Booking(req.body);
    const savedPassenger = await newPassenger.save();
    res.status(201).json(savedPassenger);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/bookings/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const booking = await Booking.findOne({ Booking_Id: id });
    if (!booking) {
      return res.status(404).send();
    }
    res.send(booking);
  } catch (error) {
    console.log(error);
  }
});

app.get('/auth12/update/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const booking = await Booking.findOne({ Booking_Id: id });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


app.put('/auth12/update/:id', async (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  try {
    const updatedBooking = await Booking.findOneAndUpdate(
      { Booking_Id: id },
      newData,
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen( PORT , () => console.log('Server listening'));
