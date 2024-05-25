import React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import "./styles/MacrosPieChart.css";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { PieChartProps } from "./types";

import {
  mangoFusionPalette
} from '@mui/x-charts/colorPalettes';

const customPalette = [
  '#36454F',  // charcoal grey (Font and accents)
  '#98FB98',  // paleGreen (Background or highlight)
  '#3CB371',  // mediumSeaGreen (Background for titles or highlighted areas)
  '#FFFACD',  // lemonChiffon (Highlights and accents)
  '#DAA520',  // goldenrod (Key accents or calls to action)
  '#556B2F'   // darkOliveGreen (Depth and contrast for darker elements)
];



function MacrosPieChart({ totalProtein, totalCarbs, totalFat }: PieChartProps) {
  function macrosPercentageFinder(x: number, y: number, z: number): number[] {
    const total = x + y + z;

    const proteinPercentage = parseFloat(((x / total) * 100).toFixed(2));
    const fatPercentage = parseFloat(((y / total) * 100).toFixed(2));
    const carbsPercentage = parseFloat(((z / total) * 100).toFixed(2));

    return [proteinPercentage, fatPercentage, carbsPercentage];
  }

  const percentages = macrosPercentageFinder(totalProtein, totalCarbs, totalFat);
  const theme = useTheme();
  const [colorMode, setColorMode] = React.useState(theme.palette.mode);
  const newTheme = createTheme({ palette: { mode: colorMode } });

  return (
    <ThemeProvider theme={newTheme}>

    <div className="macro-piechart-container">
      <div className="piechart">
        <PieChart
        colors={customPalette}
          series={[
            {
              innerRadius: 30,
              outerRadius: 120,
              paddingAngle: percentages.includes(100) ? 0 : 4,
              cornerRadius: 5,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              arcLabel: (item) => `${item.label} (${item.value}%)`,
              arcLabelMinAngle: 55,
              data: [
                { id: 0, value: percentages[0], label: "Protein" },
                { id: 1, value: percentages[1], label: "Carbs" },
                { id: 2, value: percentages[2], label: "Fats" },
              ],
        
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
              fontSize: 11,
              fontWeight: 'bold',
              fontFamily: 'inherit'
            },
          }}
          slotProps={{
            legend: {
              labelStyle: {
                fontFamily: 'cursive',
                fontSize: 14,
                fill: '#4CAF50',
              },
            },
          }}
          width={400}
          height={240}
        />
      </div>
    </div>
    </ThemeProvider>
  );
}

export default MacrosPieChart;
