import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddItemModal from './ItemModal';
import CategoryModal from './CategoryModal';

function Dashboard() {
    const [groceryList, setGroceryList] = useState([]);
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [feedbackColor, setFeedbackColor] = useState(''); 
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [itemModalOpen, setItemModal] = useState(false);
    const [categoryModalOpen, setCategoryModal] = useState(false);
 
    const closeCategoryModal = () => {
        setCategoryModal(false);
    };
 
    const openCategoryModal = () => {
        setCategoryModal(true);
    };
    const openAddItemModal = (category) => {
        setItemModal(true);
    };
    
    const closeAddItemModal = () => {
        setItemModal(false);
    };      

    useEffect(() => {
        const fetchDashboardData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await fetch('http://localhost:3001/api/users/dashboard', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    //setGroceryList(format_groceryList(data.groceryList));
                    setWelcomeMessage(data.message);
                    console.log("Here's the groceries now, from fetch: ", data.groceryList);
                } else {
                    throw new Error(data.message || 'Failed to fetch dashboard data');
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <> 
            <p>{welcomeMessage}</p>
            <p style={{ color: feedbackColor }}>{feedbackMessage}</p>
            {groceryList.length === 0 && <p>No groceries in stock</p>}
            <ul className="list-group">
                {groceryList.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <AddItemModal
                category="Meat"
                setFeedbackMessage={setFeedbackMessage}
                setFeedbackColor={setFeedbackColor}
            />
            <CategoryModal
                setFeedbackMessage={setFeedbackMessage}
                setFeedbackColor={setFeedbackColor}
            />
        </>
    );
}

export default Dashboard;
