// Import express and mongoose
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Configure environment variables
dotenv.config({ path: './config/.env' });

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/attendanceDB';

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB', err);
  });

const app = express();

// Define a simple schema for the student
const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  attendance: Boolean
});

// Create a model for the student
const Student = mongoose.model('Student', studentSchema);

// Middleware to parse JSON data from request body
app.use(express.json());

// Middleware to serve static files like CSS, JS
app.use(express.static('public'));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Route to home page 
app.get('/', (req, res) => {
  res.send('Hello, Attendance Tracker System!');
});

// A route to track attendance
app.get('/attendance', (req, res) => {
  res.send('Attendance page');
});

// A route to manage student data
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.render('students', { students });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching students');
  }
});

// A route to add a student
app.post('/addStudent', async (req, res) => {
  const { name, rollNumber, attendance } = req.body;

  const student = new Student({ name, rollNumber, attendance });

  try {
    await student.save();
    res.send('Student added successfully');
  } catch (err) {
    res.status(500).send('Error adding student');
  }
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

// 500 server error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
