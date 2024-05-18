export interface Item {
    name: string;
    expiration: string;
    amount: number;
  }
  
  export interface CategoryData {
    category: string;
    items: Item[];
  }
  
  export interface IngredientData {
    ingredient: string;
    quantity: number;
  }
  
  export interface BarGraphProps {
    ingredientData: IngredientData[];
  }
  