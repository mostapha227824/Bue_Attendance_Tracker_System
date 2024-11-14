// controllers/students.js
const Student = require('../models/Students.js');


// Fetch all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching students');
  }
};

// Add a new student
const addStudent = async (req, res) => {
  const { name, rollNumber, attendance } = req.body;
  const student = new Student({ name, rollNumber, attendance });

  try {
    await student.save();
    res.send('Student added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding student');
  }
};

module.exports = {
  getAllStudents,
  addStudent
};
