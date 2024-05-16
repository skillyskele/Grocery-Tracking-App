import React, { useState, MouseEvent } from 'react';
import Modal from "@mui/material/Modal";
import Button from '@mui/material/Button';

interface Props {
    category: string;
    setFeedbackMessage: React.Dispatch<React.SetStateAction<string>>;
    setFeedbackColor: React.Dispatch<React.SetStateAction<string>>;
    onDeleteCategory: () => void;
}

function DeleteCategoryModal({ category, setFeedbackMessage, setFeedbackColor, onDeleteCategory }: Props) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleConfirmDelete = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Prevent form submission
        console.log('Deleting category:', category);
        // Call the onDeleteCategory function to delete the category
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch(`http://localhost:3001/api/groceries/deleteCategory`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category: category
                })
            });

            const data = await response.json();
            setFeedbackMessage(data.message);
            if (response.ok) {
                setFeedbackColor('green');
                onDeleteCategory(); // Refresh the dashboard data after deletion
            } else {
                setFeedbackColor('red');
            }
        } catch (error) {
            console.error('Client: Error deleting category:', error);
            setFeedbackMessage('Error deleting category');
            setFeedbackColor('red');
        }
        handleClose();
    };

    return (
        <div>
            <Button variant="text" onClick={handleOpen}>Delete {category}</Button>
            <Modal
                onClose={handleClose}
                open={open}
                style={{
                    position: "absolute",
                    border: "2px solid #000",
                    backgroundColor: "lightgray",
                    boxShadow: "2px solid black",
                    height: 200,
                    width: 240,
                    margin: "auto",
                    padding: "2%",
                    color: "white",
                }}
            >
                <div>
                    <p>Deleting this category will delete all of its items. Confirm?</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleConfirmDelete}>Confirm</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default DeleteCategoryModal;
