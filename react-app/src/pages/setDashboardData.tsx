import { useState, useEffect } from "react";
import {
  CategoryData,
  BarGraphProps,
  Item,
  Macros,
  BarGraphEntry,
  PieChartProps,
} from "./types";

const setDashboardData = () => {
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const [feedbackColor, setFeedbackColor] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [processedData, setProcessedData] = useState<CategoryData[]>([]);
  const [barGraphProps, setBarGraphProps] = useState<BarGraphProps>({ ingredientData: [] });
  const [feedbackState, setFeedbackState] = useState<boolean>(false);
  const [pieChartProps, setPieChartProps] = useState<PieChartProps>({
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
  });

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
        const processedData: CategoryData[] = Object.entries(
          data.groceryList
        ).map(([category, items]) => ({
          category,
          items,
        }));
        setProcessedData(processedData);
        console.log("hello!", processedData);

        const allMacros: PieChartProps = {
          totalProtein: 0,
          totalCarbs: 0,
          totalFat: 0,
        };
        processedData.forEach(({ items }) => {
          items.forEach((item) => {
            //note the reduce() function could be used in this scenario

            allMacros.totalProtein += item.macros.protein;
            allMacros.totalCarbs += item.macros.carbs;
            allMacros.totalFat += item.macros.fat;
          });
        });

        let allIngredients = processedData.map((category) => {
          let categoryObject: BarGraphEntry = { category: category.category };
          category.items.forEach((item) => {
            categoryObject[item.name] = parseInt(item.amount.split(" ")[0], 10);
          });
          return categoryObject;
        });
        console.log("here is all ingredients", allIngredients);
        setPieChartProps(allMacros);
        setBarGraphProps({ingredientData: allIngredients});
        setWelcomeMessage(data.message);
        setFeedbackState(!feedbackState);
        console.log(feedbackState);
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
    pieChartProps,
    feedbackState,
    setFeedbackMessage,
    setFeedbackColor,
    fetchDashboardData,
  };
};

export default setDashboardData;
