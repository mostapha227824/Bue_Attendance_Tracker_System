// Import express, mongoose, dotenv, cors, and path
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Configure environment variables
dotenv.config({ path: './config/.env' });

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/attendanceDB';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB', err);
  });

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON data from request body
app.use(express.json());

// Define a simple schema for the student
const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  attendance: Boolean
});

// Create a model for the student
const Student = mongoose.model('Student', studentSchema);

// API Routes

// Get attendance route
app.get('/attendance', (req, res) => {
  res.send('Attendance page');
});

// Get all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);  // Send students as JSON to React
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching students');
  }
});

// Add a student
app.post('/addStudent', async (req, res) => {
  const { name, rollNumber, attendance } = req.body;
  const student = new Student({ name, rollNumber, attendance });

  try {
    await student.save();
    res.send('Student added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding student');
  }
});

// Serve React App in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

// 500 error handler for server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
