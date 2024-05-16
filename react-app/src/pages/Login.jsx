import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem('token', data.token);
        console.log(`Here is the token achieved from the server: ${data.token}`)
        setMessage("Successful Login");
        setMessageColor('green');
        navigate("dashboard");
      } else {
        setMessage(data.message);
        setMessageColor('red');
      }
    } catch (error) {
      alert('Unable to connect to the server. Please check your internet connection or try again later.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("register");
  };

  return (
    <div style={{ 
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    }}>
      <div style={{ 
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}>
        <h2 style={{ fontFamily: "Arial", marginBottom: "20px" }}>Sign in</h2>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: "15px" }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "15px" }}
          />
          <Button variant="contained" type="submit" style={{ marginBottom: "15px", backgroundColor: "#4caf50", color: "white" }}>Login</Button>
        </form>
        <p style={{ marginTop: "10px", cursor: "pointer" }} onClick={handleRegister}>Don't have an account? Sign up</p>
      </div>
    </div>
  );
}

export default Login;
