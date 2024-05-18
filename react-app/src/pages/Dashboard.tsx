import React, { useState, useEffect } from "react";
import CategoryModal from "./CategoryModal";
import IngredientBarGraph from "./BarGraph";
import CategoryComponent from "./CategoryComponent";
import setDashboardData from "./setDashboardData";
import { Item, CategoryData } from "./types";
import "./styles/Dashboard.css"; // Import CSS file for styling

const Dashboard: React.FC = () => {
  const {
    welcomeMessage,
    feedbackColor,
    feedbackMessage,
    processedData,
    barGraphProps,
    setFeedbackMessage,
    setFeedbackColor,
    fetchDashboardData,
  } = setDashboardData();

  const handleDeleteItem = async (
    category: string,
    item: Item
  ): Promise<void> => {
    console.log(`Deleting item: ${item.name}, category: ${category}`);
    const token: string | null = localStorage.getItem("token");
    if (!token) return;

    try {
      const response: Response = await fetch(
        `http://localhost:3001/api/groceries/deleteGroceryItem`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: category,
            item: item.name,
          }),
        }
      );
      const data: { message: string } = await response.json();
      setFeedbackMessage(data.message);
      if (response.ok) {
        setFeedbackColor("green");
        fetchDashboardData(); // Refresh dashboard data after successful deletion
      } else {
        setFeedbackColor("red");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      setFeedbackMessage("Error deleting item");
      setFeedbackColor("red");
    }
  };

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
          {processedData.map((categoryData, index) => (
            <div key={index} className="category-container">
              <CategoryComponent
                categoryData={categoryData}
                onDeleteItem={handleDeleteItem}
                onCategoryAction={fetchDashboardData}
                setFeedbackMessage={setFeedbackMessage}
                setFeedbackColor={setFeedbackColor}
              ></CategoryComponent>
            </div>
          ))}
        </div>
        <div
          className="right-half"
          style={{ width: "50%", height: "100%", padding: "20px" }}
        >
          <div>Hello, we'll be using this space soon</div>
          <IngredientBarGraph ingredientData={barGraphProps.ingredientData} />
        </div>
      </div>
      <CategoryModal
        setFeedbackMessage={setFeedbackMessage}
        setFeedbackColor={setFeedbackColor}
        onAddCategory={fetchDashboardData}
      />
    </div>
  );
};

export default Dashboard;
