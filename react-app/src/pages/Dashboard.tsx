import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddItemModal from "./AddItemModal";
import CategoryModal from "./CategoryModal";
import DeleteCategoryModal from "./deleteCategoryModal";
import IngredientBarGraph from "./BarGraph";
import "./styles/Dashboard.css"; // Import CSS file for styling

interface Item {
  name: string;
  expiration: string;
  amount: number;
}

interface ProcessedData {
  category: string;
  items: Item[];
}

interface IngredientData {
  ingredient: string;
  quantity: number;
}

interface BarGraphProps {
  ingredientData: IngredientData[]
}

const Dashboard: React.FC = () => {
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const [feedbackColor, setFeedbackColor] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [processedData, setProcessedData] = useState<ProcessedData[]>([]);
  const [barGraphProps, setBarGraphProps] = useState<BarGraphProps>({ ingredientData: [] });

  // [
  //   { ingredient: 'Flour', quantity: 100 },
  //   { ingredient: 'Sugar', quantity: 200 },
  //   { ingredient: 'Milk', quantity: 150 },
  //   // Add more ingredient data as needed
  // ];

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

  const fetchDashboardData = async (): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) return;

    try {
      const response: Response = await fetch(
        "http://localhost:3001/api/users/dashboard",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: { message: string; groceryList: Record<string, Item[]> } =
        await response.json();

      if (response.ok) {
        const processedData: ProcessedData[] = Object.entries(
          data.groceryList
        ).map(([category, items]) => ({
          category,
          items,
        }));
        setProcessedData(processedData); // Update state with processed data

        const allIngredients: BarGraphProps = { ingredientData: []};
        processedData.forEach(({ items }) => {
          items.forEach((item) => {
            allIngredients.ingredientData.push({
              ingredient: item.name,
              quantity: item.amount,
            });
          });
        });
        setBarGraphProps(allIngredients);
        const barGraphData = allIngredients.ingredientData.map(({ ingredient, quantity }) => ({
          data: quantity, // Assuming quantity is a numerical value
          label: ingredient,
        }));
        console.log("hi", barGraphData);
        setWelcomeMessage(data.message);
        console.log(processedData);
      } else {
        throw new Error(data.message || "Failed to fetch dashboard data");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
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
                  <AddItemModal
                    category={entries.category}
                    setFeedbackMessage={setFeedbackMessage}
                    setFeedbackColor={setFeedbackColor}
                    onItemAdd={fetchDashboardData}
                  />
                </div>
              </div>
              <ul className="item-list">
                {entries.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="item">
                    <div className="item-details">
                      <div className="item-name">{item.name}</div>
                      <div className="item-expiration">
                        Expiration Date: {item.expiration}
                      </div>
                      <div className="item-amount">Amount: {item.amount}</div>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteItem(entries.category, item)}
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
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
