const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  attendance: Boolean,
});

module.exports = mongoose.model('Student', studentSchema);
