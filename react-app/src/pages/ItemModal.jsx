import React, { useState } from 'react';
import Modal from "@mui/material/Modal";
import Button from '@mui/material/Button';

function AddItemModal({category, setFeedbackMessage, setFeedbackColor}) {
  const [itemName, setItemName] = useState('');
  const [itemAmount, setItemAmount] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const addItem = async (event) => {
    event.preventDefault()
    console.log('Adding item:', category, itemName, itemAmount);
    const token = localStorage.getItem('token'); // Retrieve the stored token
    if (!token) return; // If no token, perhaps redirect to login page
    try {
        const response = await fetch(`http://localhost:3001/api/groceries/addGroceryItem`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, //this will go to authenticateToken.js first, which will pass its results to the rest of the router function
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            category: category,
            name: itemName,
            amount: itemAmount
            })
        });
        const data = await response.json()
        setFeedbackMessage(data.message);
        if (response.ok) {
            setFeedbackColor('green');
        } else {
            setFeedbackColor('red');
        }
    } catch (error) {  
        console.error('Client: Error adding item:', error);
        setFeedbackMessage('Error adding item');
        setFeedbackColor('red');
      }          
};

  return (
    <div>
    <Button variant="contained" type="submit" onClick={handleOpen}>Add Item</Button>
    <Modal
      onClose={handleClose}
      open={open}
      style={{
          position: "absolute",
          border: "2px solid #000",
          backgroundColor: "lightgray",
          boxShadow: "2px solid black",
          height: 150,
          width: 240,
          margin: "auto",
          padding: "2%",
          color: "white",
      }}
      >
      <form onSubmit={addItem}>
        <input
          type="text"
          placeholder="Enter item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter item amount"
          value={itemAmount}
          onChange={(e) => setItemAmount(e.target.value)}
          required
        />
        <button type="submit">Add Item</button>
      </form>
    </Modal>
    </div>
  );
}

export default AddItemModal;
