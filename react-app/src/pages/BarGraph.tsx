import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

interface IngredientData {
    ingredient: string;
    quantity: number;
  }

interface BarGraphProps {
    ingredientData: IngredientData[]
}

function IngredientBarGraph({ ingredientData } : BarGraphProps) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <BarChart
        series={ingredientData.map(({ ingredient, quantity }) => ({
          data: [quantity], // Assuming quantity is a numerical value
          label: ingredient,
        }))}
        width={600}
        height={350}
      />
    </div>
  );
}

export default IngredientBarGraph;
