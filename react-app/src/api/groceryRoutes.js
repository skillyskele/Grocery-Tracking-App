import express from 'express';
import groceryController from './groceryController.js';
import authenticateToken
 from "../middleware/authenticateToken.js";

const router = express.Router();

router.post('/groceries/addCategory', authenticateToken, groceryController.addCategory);
router.post('/groceries/addGroceryItem', authenticateToken, groceryController.addGroceryItem);
router.delete('/groceries/deleteCategory', authenticateToken, groceryController.deleteCategory);
router.delete('/groceries/deleteGroceryItem', authenticateToken, groceryController.deleteGroceryItem); // Updated route for deleting grocery items


export default router

