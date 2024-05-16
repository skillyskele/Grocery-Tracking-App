import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email })
      });

      const data = await response.json();

      if (response.status === 201) {
        navigate("/");
        setMessage("Successful Registration");
        setMessageColor('green');
      } else {
        setMessage(data.message);
        setMessageColor('red');
      }
    } catch (error) {
      alert('Unable to connect to the server. Please check your internet connection or try again later.');
    }
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
        <h2 style={{ fontFamily: "Arial", marginBottom: "20px" }}>Registration Page</h2>
        <div style={{ marginBottom: "20px", color: messageColor }}>
          {message}
        </div>
        <form onSubmit={handleRegistration} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <TextField
            id="username"
            label="Enter Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: "15px", width: "100%" }}
          />
          <TextField
            id="password"
            label="Enter Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "15px", width: "100%" }}
          />
          <TextField
            id="email"
            label="Enter Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "15px", width: "100%" }}
          />
          <Button variant="contained" type="submit" style={{ marginBottom: "15px", backgroundColor: "#4caf50", color: "white", width: "100%" }}>Register</Button>
        </form>
      </div>
    </div>
  );
}

export default Register;
