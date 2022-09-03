import React, {useRef, useContext} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { UserContext } from "../App";
import {toast} from "react-toastify";

export default function RegisterModal({setStudents}) {
  const inputName = useRef(null);
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const inputUsername = useRef(null);
  const closeButtonModal = useRef(null);
  
  const handleRegister = async () => {
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    const username = inputUsername.current.value;
    const name = inputName.current.value;

    axios.post("http://localhost:8000/api/students", {
      email: email,
      password: password,
      username: username,
      name: name
    }, {
      withCredentials: true
    }).then(response => {
      console.log(response);
      axios.get("http://localhost:8000/api/students")
      .then(response => {
        setStudents(response.data.data);
        toast.success("Mahasiswa berhasil ditambahkan!");
      })
    });
  }

  return (
    <div className="modal fade" id="registerModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Login
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form action="">
              <div className="mb-3">
                <label htmlFor="input-name" className="form-label">
                  Nama
                </label>
                <input ref={inputName} type="text" className="form-control" id="input-name" />
              </div>
              
              <div className="mb-3">
                <label htmlFor="input-username" className="form-label">
                  Username
                </label>
                <input ref={inputUsername} type="text" className="form-control" id="input-username" />
              </div>

              <div className="mb-3">
                <label htmlFor="input-email" className="form-label">
                  Email address
                </label>
                <input ref={inputEmail} type="email" className="form-control" id="input-email" />
              </div>

              <div className="mb-3">
                <label htmlFor="input-password" className="form-label">
                  Password
                </label>
                <input ref={inputPassword} type="password" className="form-control" id="input-password" />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeButtonModal}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
