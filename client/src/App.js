import React, { useState, useEffect } from 'react';

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
    <div>
      <h2>Students List</h2>
      {students.length > 0 ? (
        <ul>
          {students.map(student => (
            <li key={student._id}>{student.name}</li> // Adjust to match your data format
          ))}
        </ul>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
}

export default StudentsList;
