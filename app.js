// app.js

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const studentRoutes = require('./routes/students');

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

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Use the student routes
app.use(studentRoutes);

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
