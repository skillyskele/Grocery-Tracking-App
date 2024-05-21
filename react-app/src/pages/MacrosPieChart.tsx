import React from "react";
import { PieChart, PieArcLabel } from "@mui/x-charts/PieChart";
import "./styles/MacrosPieChartContainer.css";
import { PieChartProps } from "./types";

function MacrosPieChart({ totalProtein, totalCarbs, totalFat }: PieChartProps) {
  function macrosPercentageFinder(x: number, y: number, z: number): number[] {
    const total = x + y + z;

    // Calculate the percentages
    const proteinPercentage = parseFloat(((x / total) * 100).toFixed(2));
    const fatPercentage = parseFloat(((y / total) * 100).toFixed(2));
    const carbsPercentage = parseFloat(((z / total) * 100).toFixed(2));

    // Store the percentages in an array
    const percentages = [proteinPercentage, fatPercentage, carbsPercentage];

    return percentages;
  }

  const percentages = macrosPercentageFinder(
    totalProtein,
    totalCarbs,
    totalFat
  );

  return (
    <div className="macro-piechart-container">
      <div className="piechart">
        <PieChart
          series={[
            {
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: percentages.includes(100) ? 0 : 4,
              cornerRadius: 5,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              arcLabel: (item) => `${item.label} (${item.value}%)`,
              arcLabelMinAngle: 45,
              // startAngle:-90,
              // endAngle:180,
              data: [
                { id: 0, value: percentages[0], label: "Protein" },
                { id: 1, value: percentages[1], label: "Carbs" },
                { id: 2, value: percentages[2], label: "Fats" },
              ],
            },
          ]}
          width={400}
          height={200}
        />
      </div>
    </div>
  );
}

export default MacrosPieChart;
