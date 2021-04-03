const mongoose = require('mongoose');

const { Schema } = mongoose;

const warehouseSchema = new Schema({
  description: String,
  location: {
    address: String,
    longitude: Number,
    latitude: Number,
  },
  storage: Number,
  staffDetails: [
    {
      staffId: String,
      firstName: String,
      lastName: String,
      salary: Number,
      role: String,
      mobile: String,
    },
  ],
});

module.exports = mongoose.model('Warehouse', warehouseSchema);