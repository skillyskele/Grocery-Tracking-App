import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddItemModal from './ItemModal';
import CategoryModal from './CategoryModal';
import DeleteCategoryModal from './deleteCategoryModal';
import './styles/Dashboard.css'; // Import CSS file for styling

function Dashboard() {
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [feedbackColor, setFeedbackColor] = useState(''); 
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [processedData, setProcessedData] = useState([]);

    const handleDeleteItem = async (category, item) => {
        console.log(`Deleting item: ${item.name}, category: ${category}`);
        const token = localStorage.getItem('token');
        if (!token) return;
    
        try {
            const response = await fetch(`http://localhost:3001/api/groceries/deleteGroceryItem`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category: category,
                    item: item.name
                })
            });
            const data = await response.json();
            setFeedbackMessage(data.message);
            if (response.ok) {
                setFeedbackColor('green');
                fetchDashboardData(); // Refresh dashboard data after successful deletion
            } else {
                setFeedbackColor('red');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            setFeedbackMessage('Error deleting item');
            setFeedbackColor('red');
        }
    };
    
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
                const processedData = Object.entries(data.groceryList).map(([category, items]) => ({
                    category,
                    items
                }));
                setProcessedData(processedData); // Update state with processed data
                setWelcomeMessage(data.message);
                console.log(processedData);
            } else {
                throw new Error(data.message || 'Failed to fetch dashboard data');
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <div className="dashboard-container">
            <header className="header">
                <div className="app-name">[Name of App]</div>
                <div className="logo">[Logo]</div>
            </header>
            <div className="content">
                <div className="left-half">
                    <p>{welcomeMessage}</p>
                    <p style={{ color: feedbackColor }}>{feedbackMessage}</p>
                    {processedData.length === 0 && <p>No groceries in stock</p>}
                    {processedData.map((entries, index) => (
                        <div key={index} className="category-container">
                            <div className="category-header">
                                <h2>{entries.category}</h2>
                                <div className="action-buttons">
                                    <DeleteCategoryModal
                                        category={entries.category}
                                        setFeedbackMessage={setFeedbackMessage}
                                        setFeedbackColor={setFeedbackColor}
                                        onDeleteCategory={fetchDashboardData}
                                    />
                                    <Button variant="outlined" color="primary" onClick={() => handleAddItem(entries.category)}>Add Item</Button>
                                </div>
                            </div>
                            <ul className="item-list">
                                {entries.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="item">
                                        <div className="item-details">
                                            <div className="item-name">{item.name}</div>
                                            <div className="item-expiration">Expiration Date: {item.expiration}</div>
                                            <div className="item-amount">Amount: {item.amount}</div>
                                            <Button variant="outlined" color="error" size="small" onClick={() => handleDeleteItem(entries.category, item)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="right-half">
                    <div>Hello, we'll be using this space soon</div>
                </div>
            </div>
            <CategoryModal
                setFeedbackMessage={setFeedbackMessage}
                setFeedbackColor={setFeedbackColor}
                onAddCategory={fetchDashboardData}
            />
        </div>
    );
    
}

export default Dashboard;
