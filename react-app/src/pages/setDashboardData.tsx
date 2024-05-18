import { useState, useEffect } from "react";
import { CategoryData, BarGraphProps, Item } from "./types";

const setDashboardData = () => {
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const [feedbackColor, setFeedbackColor] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [processedData, setProcessedData] = useState<CategoryData[]>([]);
  const [barGraphProps, setBarGraphProps] = useState<BarGraphProps>({ ingredientData: [] });

  const fetchDashboardData = async (): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) return;

    try {
      const response: Response = await fetch("http://localhost:3001/api/users/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data: { message: string; groceryList: Record<string, Item[]> } = await response.json();

      if (response.ok) {
        const processedData: CategoryData[] = Object.entries(data.groceryList).map(([category, items]) => ({
          category,
          items,
        }));
        setProcessedData(processedData);

        const allIngredients: BarGraphProps = { ingredientData: [] };
        processedData.forEach(({ items }) => {
          items.forEach((item) => {
            allIngredients.ingredientData.push({
              ingredient: item.name,
              quantity: item.amount,
            });
          });
        });
        setBarGraphProps(allIngredients);
        setWelcomeMessage(data.message);
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

  return {
    welcomeMessage,
    feedbackColor,
    feedbackMessage,
    processedData,
    barGraphProps,
    setFeedbackMessage,
    setFeedbackColor,
    fetchDashboardData,
  };
};

export default setDashboardData;
