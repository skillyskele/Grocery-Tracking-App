export interface Item {
    name: string;
    expiration: string;
    amount: number;
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
    ingredientData: { [ingredient: string]: number };
  }
  