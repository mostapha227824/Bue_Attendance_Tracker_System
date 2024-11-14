// routes/students.js
const express = require('express');
const router = express.Router();
const { getAllStudents, addStudent } = require('../controllers/students');

router.get('/students', getAllStudents);
router.post('/addStudent', addStudent);

module.exports = router;
