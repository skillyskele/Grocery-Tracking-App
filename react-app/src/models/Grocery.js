import mongoose from 'mongoose';
const macroSchema = new mongoose.Schema({
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fat: { type: Number, default: 0 }
});

const groceryListSchema = new mongoose.Schema({
  groceries: {
    type: Map, // categories, like Meat, Seafood 
    of: [{
      type: {
        name: String,
        amount: String,
        expiration: { type: Date, default: Date.now }, 
        macros: {type: macroSchema, default: {} }
      }
    }],
    default: new Map()
  }
})

const GroceryList = mongoose.model('GroceryList', groceryListSchema);

export default GroceryList;
