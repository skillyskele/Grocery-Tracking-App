import React, { useState, useEffect, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./styles/Register.css";
import CustomizedTextField from "./CustomizedTextField";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackMessage, setMessage] = useState("");
  const [messageState, setMessageState] = useState(false);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (feedbackMessage !== "") {
      setIsVisible(true);
    }
    const timer = setTimeout(() => {
      console.log("timed out");
      setIsVisible(false);
    }, 3000); // Hide the message after 5 seconds
    return () => clearTimeout(timer);
  }, [messageState]);

  const handleRegistration = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setMessage("Successful Registration");
        setMessageState(!messageState);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      alert(
        "Unable to connect to the server. Please check your internet connection or try again later."
      );
    }
    setMessageState(!messageState)
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h2 className="register-header">Registration Page</h2>
        <div id="feedback-toast" className={isVisible ? "show" : "none"}>
          {feedbackMessage}
        </div>
        <form onSubmit={handleRegistration} className="register-form">
          <CustomizedTextField
            id="username"
            label="Enter Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="register-textfield"
          />
          <CustomizedTextField
            id="password"
            label="Enter Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-textfield"
          />
          <CustomizedTextField
            id="email"
            label="Enter Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-textfield"
          />
          <Button
            variant="contained"
            type="submit"
            className="register-button"
            // onClick={() => setMessageState(!messageState)}
            sx={{
              fontFamily: "cursive",
              backgroundColor: "#8A9A5B",
              "&:hover": { backgroundColor: "#7B5D40" },
            }}
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Register;
