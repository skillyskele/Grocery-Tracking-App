export interface Item {
    name: string;
    expiration: string;
    amount: string;
    macros: Macros;
  }

export interface Macros {
  protein:string| number
  carbs:string|number
  fat:string| number
}
  
  export interface CategoryData {
    category: string;
    items: Item[];
  }
  
 export interface FeedbackMessageProps {
  message: string;
  color: string;
  feedbackstate: number;
 }
  
  export interface BarGraphProps {
    ingredientData: BarGraphEntry[];
  }

  export interface BarGraphEntry {
    category: string;
    [key: string]: number | string;
}
  
  export interface PieChartProps {
    totalProtein: number
    totalCarbs: number
    totalFat: number
  }