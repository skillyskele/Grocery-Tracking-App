import React, { useState, useEffect } from "react";
import CategoryModal from "./CategoryModal";
import IngredientBarGraph from "./BarGraph";
import CategoryComponent from "./CategoryComponent";
import setDashboardData from "./setDashboardData";
import { Item, CategoryData } from "./types";
import marcelineImage from "./images/marshall_lee.jpg";
import MacrosPieChart from "./MacrosPieChart";
import "./styles/Dashboard.css"; // Import CSS file for styling

const Dashboard: React.FC = () => {
  const {
    welcomeMessage,
    feedbackColor,
    feedbackMessage,
    processedData,
    barGraphProps,
    pieChartProps,
    feedbackState,
    setFeedbackMessage,
    setFeedbackColor,
    fetchDashboardData,
  } = setDashboardData();

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      console.log("timed out");
      setIsVisible(false);
    }, 3000); // Hide the message after 5 seconds
    return () => clearTimeout(timer);
  }, [feedbackState]);

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
        <div className="app-name">Grocery Tracker</div>
        <img src={marcelineImage} alt="logo" className="grocery-app-logo"></img>
      </header>
      <div className="content">
        <div className="left-half">
          <div className="welcome-message">{welcomeMessage}</div>
          <div id="feedback-toast" className={isVisible ? "show" : "none"}>
            {feedbackMessage}
          </div>
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
        >
          <div className="ingredients-summary">Ingredients Summary</div>
            <div className="graphs-container">
              <div className="bargraph-title">Ingredients Ratio</div>
              <IngredientBarGraph {...barGraphProps} />
              {/* interesting moment when I had to pass in the whole barGraphProps because it kept insisting I was passing in { [ingredient: string]: number } instead of BarGraphProps */}
              <div className="bargraph-title">Macronutrients Summary</div>
              <MacrosPieChart
                {...pieChartProps}
              />
            </div>
        </div>
      </div>
      <div className="addCategoryModal">
        <CategoryModal
          setFeedbackMessage={setFeedbackMessage}
          setFeedbackColor={setFeedbackColor}
          onAddCategory={fetchDashboardData}
        />
      </div>
    </div>
  );
};

export default Dashboard;
