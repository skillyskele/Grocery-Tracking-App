import React, { useState } from 'react';
import Modal from "@mui/material/Modal";
import Button from '@mui/material/Button';

function CategoryModal({setFeedbackMessage, setFeedbackColor}) {
    const [category, setCategoryName] = useState('');
    const [open, setOpen] = useState(false);

    const handleSubmit= async (event) => {
        event.preventDefault()
        console.log(category);
        const token = localStorage.getItem('token'); // Retrieve the stored token
        if (!token) return; // If no token, perhaps redirect to login page
        
        try {
            console.log("adding category...")
        const response = await fetch('http://localhost:3001/api/groceries/addCategory', {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}`, //this will go to authenticateToken.js first, which will pass its results to the rest of the router function
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({category}),
            });
            const data = await response.json();
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
    }

    const handleClose = () => {
        setOpen(false);
    };
 
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            
            <Button variant="contained" type="submit" onClick={handleOpen}>Add Category</Button>
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
                <>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter category name"
                        value={category}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                    />
                    <Button variant="contained" type="submit">Confirm</Button>
                </form>
                </>
            </Modal>
        </div>
    );
}

export default CategoryModal
