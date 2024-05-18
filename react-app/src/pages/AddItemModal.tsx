import React, { FormEvent, useState } from 'react';
import Modal from "@mui/material/Modal";
import { IconButton } from '@mui/material';
import './styles/AddItemModal.css'; // Make sure this path is correct
import AddCircle from '@mui/icons-material/AddCircle';

interface Props {
    category: string;
    setFeedbackMessage: React.Dispatch<React.SetStateAction<string>>;
    setFeedbackColor: React.Dispatch<React.SetStateAction<string>>;
    onItemAdd: () => void;
}

function AddItemModal({ category, setFeedbackMessage, setFeedbackColor, onItemAdd }: Props) {
    const [itemName, setItemName] = useState('');
    const [itemAmount, setItemAmount] = useState('');
    const [itemExpiration, setItemExpiration] = useState('');
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const addItem = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const response = await fetch(`http://localhost:3001/api/groceries/addGroceryItem`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category,
                    name: itemName,
                    amount: itemAmount,
                    expiration: itemExpiration
                })
            });
            const data = await response.json();
            setFeedbackMessage(data.message);
            if (response.ok) {
                setFeedbackColor('green');
                onItemAdd();
            } else {
                setFeedbackColor('red');
            }
        } catch (error) {
            console.error('Client: Error adding item:', error);
            setFeedbackMessage('Error adding item');
            setFeedbackColor('red');
        }
        handleClose();
    };

    return (
        <div>
            <IconButton aria-label="Add item" onClick={handleOpen}><AddCircle /></IconButton>
            <Modal
                onClose={handleClose}
                open={open}
                className="modal-container" // Uses modal-container styles
            >
                <form onSubmit={addItem} className="modal-form">
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
                    <input
                        type="date"
                        placeholder="Enter expiration date"
                        value={itemExpiration}
                        onChange={(e) => setItemExpiration(e.target.value)}
                        required
                    />
                    <button type="submit" className="modal-button modal-button-primary">Add Item</button>
                </form>
            </Modal>
        </div>
    );
}

export default AddItemModal;
