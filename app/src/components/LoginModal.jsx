import React, {useRef, useContext} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { UserContext } from "../App";
import {toast} from "react-toastify";

export default function LoginModal() {
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const closeButtonModal = useRef(null);
  const cookies = new Cookies();
  const {authenticatedUser, setAuthenticatedUser} = useContext(UserContext)
  
  const handleLogin = async () => {
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;

    await axios.get("http://localhost:8000/sanctum/csrf-cookie");

    const loginPromise = axios.post("http://localhost:8000/api/auth/login", {
      email: email,
      password: password
    }, {
      withCredentials: true
    })
    .then(async (response) => {
      closeButtonModal.current.click();
      cookies.set("Authorization", response.data.token);
      return await axios.get("http://localhost:8000/api/auth/user", {
        headers: {
          Authorization: `Bearer ${response.data.token}`
        }
      })
      .then(response => {
        setAuthenticatedUser(response.data.user);
        return response;
      });
    });

    toast.promise(
    loginPromise,
    {
      pending: {
        render(){
          return "Processing..."
        },
        icon: false,
      },
      success: {
        render({data}){
          return `Welcome, ${data.data.user.name}`
        },
        // other options
        icon: "🟢",
      },
      error: {
        render({data}){
          // When the promise reject, data will contains the error
          return `Error : ${data.response.error.message}`;
        }
      }
    }
)
  }

  return (
    <div className="modal fade" id="loginModal" tabIndex="-1">
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
            <button type="button" className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
