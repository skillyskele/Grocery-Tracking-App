import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";


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
    <div style={{ width: "100vh", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h4>Registration Page</h4>
      <div id="message-container" style={{ color: messageColor }}>
        {message}
      </div>
      <form id="registration" onSubmit={handleRegistration}>
        <TextField 
          id="username" 
          label="Enter Username" 
          variant="outlined" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <TextField 
          id="password" 
          label="Enter Password" 
          type="password" 
          variant="outlined" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <TextField 
          id="email" 
          label="Enter Email" 
          variant="outlined" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <Button variant="contained" type="submit">Register</Button>
      </form>
    </div>
  );
}

export default Register;
