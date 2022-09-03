import React, {useContext} from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal"
import {UserContext} from "../App";
import axios from "axios";
import Cookies from "universal-cookie";
import {toast} from "react-toastify";

export default function Navbar({setStudents}) {
  const {authenticatedUser, setAuthenticatedUser} = useContext(UserContext);

  const handleLogout = () => {
    toast.success("Logout Berhasil!");
    
    setAuthenticatedUser(null);

    axios.post("http://localhost:8000/api/auth/logout", {}, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${new Cookies().get("Authorization")}`
      }
    })
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
            </ul>

            <div className="dropdown">
              <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Authentication
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {!authenticatedUser ? (
                  <>
                    <li>
                      <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">
                        Login
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#registerModal">
                        Register
                      </a>
                    </li>
                  </>
                ) : (
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <LoginModal></LoginModal>
      <RegisterModal setStudents={setStudents}></RegisterModal>
    </>
  );
}
