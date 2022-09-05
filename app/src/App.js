import React, {useState, useEffect} from "react";
import axios from "axios";
import Student from "./components/Student";
import Navbar from "./components/Navbar";
import "./assets/css/style.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserContext = React.createContext();

function App() {
  const [students, setStudents] = useState(null);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(function () {
    axios.get("http://localhost:8000/api/students").then(function (response) {
      const students = response.data.data;
      setStudents(students);
    });
  }, []);

  return (
    <>
      <UserContext.Provider value={{authenticatedUser, setAuthenticatedUser}}>
        <div className="App">
          <Navbar setStudents={setStudents}/>
          <div className="container-fluid card-container d-flex justify-content-center align-items-center gap-3 flex-wrap">{students && students.map((student) => <Student student={student} />)}</div>
        </div>
      </UserContext.Provider>

      <ToastContainer/>
    </>
  );
}

export default App;
