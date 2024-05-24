import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { BarChart } from "@mui/x-charts/BarChart";
import { useState } from "react";
// import { Chance } from 'chance';
import "./styles/IngredientBarGraph.css"; // Import the CSS file
import { BarGraphProps } from "./types";

import {
  cheerfulFiestaPalette,
  mangoFusionPalette,
} from "@mui/x-charts/colorPalettes";

const categories = {
  mangoFusion: mangoFusionPalette,
  cheerfulFiesta: cheerfulFiestaPalette,
} as const;

const customPalette = [
  "#FFB6C1", // LightPink
  "#87CEFA", // LightSkyBlue
  "#98FB98", // PaleGreen
  "#FFD700", // Gold
  "#FFA07A", // LightSalmon
];

type PaletteKey = keyof typeof categories;

function IngredientBarGraph({ ingredientData }: BarGraphProps) {
  const theme = useTheme();
  const [colorScheme, setColorScheme] = useState<PaletteKey>("mangoFusion");
  const [colorMode, setColorMode] = useState(theme.palette.mode);

  const newTheme = createTheme({ palette: { mode: colorMode } });
  let dataset = ingredientData;

  console.log("here's dataset", dataset);
  const x = [];
  for (let i = 0; i < dataset.length; i++) {
    x.push(...Object.keys(dataset[i]).filter((key) => key !== "category"));
  }

  const seriesData = x.map((key) => ({
    dataKey: key,
    stack: "A",
    valueFormatter: (v: number) => {
      return `${key} ${v}`;
    },
  }));

  return (
    <ThemeProvider theme={newTheme}>
      <div className="bargraph-container">
        <div className="bargraph">
          <BarChart
            colors={customPalette}
            dataset={dataset}
            xAxis={[{ scaleType: "band", dataKey: "category" }]}
            series={seriesData}
            sx={{
              "& .MuiChartsAxis-tickLabel tspan": { fontFamily: "cursive" },
              "& .MuiChartsLegend-series text": {
                fontFamily: "cursive",
                // color: "rgb(105, 230, 105)",
                fontSize: "12px",
              },
            }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default IngredientBarGraph;
