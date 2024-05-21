import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import "./styles/IngredientBarGraph.css"; // Import the CSS file
import { BarGraphProps } from "./types"
//xAxis={[{scaleType: 'band', dataKey: category}]}
//series={[data: [amt 1], label: 'ingredient1'




function IngredientBarGraph({ ingredientData }: BarGraphProps) {

  // Create arrays for the chart
  const ingredientNames = Object.keys(ingredientData);
  const ingredientQuantities = Object.values(ingredientData);

  return (
    <div className="bargraph-container">
      <div className="bargraph">
        <BarChart
          xAxis={[{scaleType: 'band', data: ingredientNames}]}
          series={[{data: ingredientQuantities}]}
          borderRadius={5}
        />
      </div>
    </div>
  );
}

export default IngredientBarGraph;
