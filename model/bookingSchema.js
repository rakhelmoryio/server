const mongoose = require("mongoose");


const passengerSchema = new mongoose.Schema({
  name: String,
  age: String,
  gender: String,
  aadharNumber: String
});

const bookingSchema = new mongoose.Schema({
  Date_of_Booking: {
    type: Date,
  },
  Date_of_Journey: {
    type: Date,
  },
  Journey_Location: {
    type: String,
  },
  Booking_Id: {
    type: String,
    unique: true,
  },
  Booking_Status: {
    type: String,
  },
  Payment_Amount: {
    type: String,
  },
  Payment_Mode: {
    type: String,
  },
  Aadhar_Number: {
    type: Number,
  },
  Age: {
    type: String,
  },
  name: {
    type: String,
  },
  Gender: {
    type: String,
  },
  email: {
    type: String,
  },
  Phone_Number: {
    type: String,
  },
  passengers: [passengerSchema] //
});

module.exports = mongoose.model("Booking", bookingSchema);
