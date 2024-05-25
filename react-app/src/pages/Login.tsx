import React, { useState, useEffect, MouseEvent, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";
import CustomizedTextField from "./CustomizedTextField";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        console.log(
          `Here is the token achieved from the server: ${data.token}`
        );
        setMessage("Successful Login");
        navigate("dashboard");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      alert(
        "Unable to connect to the server. Please check your internet connection or try again later."
      );
    }
  };

  const handleRegister = (e: MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault();
    navigate("register");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sign in</h2>
        <form onSubmit={handleLogin} className="login-form">
          <CustomizedTextField
            id="username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="MuiTextField-root"
          />
          <CustomizedTextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="MuiTextField-root"
            sx={{
              fontFamily: "cursive",
            }}
          />
          <Button
            variant="contained"
            type="submit"
            className="MuiButton-contained"
            onClick={() => setMessageState(!messageState)}
            sx={{
              fontFamily: "cursive",
              backgroundColor: "#6DAE81",
              "&:hover": { backgroundColor: "#40826D" },
            }}
          >
            Login
          </Button>
        </form>
        <p className="login-register">
          Don't have an account?{" "}
          <span className="sign-up" onClick={handleRegister}>
            Sign up
          </span>
        </p>
        <div id="feedback-toast" className={isVisible ? "show" : "none"}>
          {feedbackMessage}
        </div>
      </div>
    </div>
  );
}

export default Login;
