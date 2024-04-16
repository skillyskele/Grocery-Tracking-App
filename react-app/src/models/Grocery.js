import mongoose from 'mongoose';

const groceryListSchema = new mongoose.Schema({
  groceries: {
    type: Map, // categories, like Meat, Seafood 
    of: [{
      type: {
        name: String,
        amount: String,
        expiration: { type: Date, default: Date.now }
      }
    }],
    default: new Map()
  }
})

const GroceryList = mongoose.model('GroceryList', groceryListSchema);

export default GroceryList;
