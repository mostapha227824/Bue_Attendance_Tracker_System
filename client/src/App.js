import React, { useState, useEffect } from 'react';
import './App.css';

function StudentsList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students from the backend
    fetch('http://localhost:3000/students')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  return (
    <div className="App">
      <h2 className="App-header">Students List</h2>
      {students.length > 0 ? (
        <ul className="App-list">
          {students.map(student => (
            <li key={student._id} className="App-list-item">
              {student.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
}

export default StudentsList;
