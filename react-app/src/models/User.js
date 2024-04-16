// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // You can add additional fields as needed:
  email: {
    type: String,
    required: true,
    unique: true
  },
  groceryList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroceryList',
  },
});



// Create a model from the schema
const User = mongoose.model('User', userSchema);

export default User;
