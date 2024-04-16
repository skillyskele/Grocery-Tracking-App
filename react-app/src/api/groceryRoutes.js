import express from 'express';
import groceryController from './groceryController.js';
import authenticateToken
 from "../middleware/authenticateToken.js";

const router = express.Router();

router.post('/groceries/addCategory', authenticateToken, groceryController.addCategory);
router.post('/groceries/addGroceryItem', authenticateToken, groceryController.addGroceryItem);


export default router

