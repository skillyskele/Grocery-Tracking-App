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
  '#36454F',  // charcoal grey (Font and accents)
  '#98FB98',  // paleGreen (Background or highlight)
  '#3CB371',  // mediumSeaGreen (Background for titles or highlighted areas)
  '#FFFACD',  // lemonChiffon (Highlights and accents)
  '#DAA520',  // goldenrod (Key accents or calls to action)
  '#556B2F'   // darkOliveGreen (Depth and contrast for darker elements)
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
                fontSize: "12px",
                fill: '#36454F'
              },
            }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default IngredientBarGraph;
