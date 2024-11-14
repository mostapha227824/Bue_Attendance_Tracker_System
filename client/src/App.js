import React, { useEffect, useState } from 'react';

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students from the backend API
    fetch('/students')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching students:', error));
  }, []);

  return (
    <div className="App">
      <h1>Student List</h1>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} (Roll Number: {student.rollNumber}, Attendance: {student.attendance ? 'Present' : 'Absent'})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
