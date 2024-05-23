import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import "./styles/IngredientBarGraph.css"; // Import the CSS file
import { BarGraphProps } from "./types";
import { Hidden } from "@mui/material";
//xAxis={[{scaleType: 'band', dataKey: category}]}
//series={[data: [amt 1], label: 'ingredient1'

function IngredientBarGraph({ ingredientData }: BarGraphProps) {
  // Create arrays for the chart
  const ingredientNames = Object.keys(ingredientData);
  const ingredientQuantities = Object.values(ingredientData);

  const dataset = [
    {
      jellybeans: 5,
      taffy: 4,
      taro: 9,
      pizza: 0,
      john: 2,
      billy: 2,
      gyoza: 3,
      lolli: 1,
      j:2,
      a:4,
      n:7,
      jo:5,
      category: "Candy",
    },
    {
      pizza: 1,
      category: "Frozen Food",
    },
  ];
  const x = [];
  for (let i = 0; i < dataset.length; i++) {
    x.push(...Object.keys(dataset[i]).filter((key) => key !== "category"));
  }

  const seriesData = x.map((key) => ({
    dataKey: key,
    // label: key,
    stack: "A",
  }));

  console.log(seriesData);

  return (
    <div className="bargraph-container">
      <div className="bargraph">
        <BarChart
          // margin={{ top: 100, bottom: 10, left: 10, right:120 }}

          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "category" }]}
          series={seriesData}
          sx={{
            "& .MuiChartsAxis-tickLabel tspan": { fontFamily: "cursive" },
            "& .MuiCharsLegend-series text": {
              fontFamily: "cursive",
              // color: "rgb(105, 230, 105)",
              fontSize: "12px",
            },
            
          }}
          // slotProps={{
          //   legend: {
          //     labelStyle: {
          //       fontFamily: 'cursive',
          //       fontSize: 14,
          //       fill: 'green',
          //     },
          //     direction: 'column',
          //     position: {
          //       vertical: 'middle',
          //       horizontal:'right'
          //     },
          //   }
          // }}
        />
      </div>
    </div>
  );
}

export default IngredientBarGraph;
