import { useState, useEffect } from "react";
import axios from "axios";
import Student from "./components/Student";
import "./assets/css/style.css";

function App() {
  const [students, setStudents] = useState(null);

  useEffect(function() {
    axios.get("http://localhost:8000/api/students")
    .then(function(response) {
      const students = response.data.data;
      setStudents(students);
    });
  }, []);

  return (
    <div className="App p-3">
      <div className="container-fluid card-container d-flex justify-content-center align-items-center gap-3 flex-wrap">
        {
          students && students.map(student => <Student student={student}/>)
        }
      </div>
    </div>
  );
}

export default App;
