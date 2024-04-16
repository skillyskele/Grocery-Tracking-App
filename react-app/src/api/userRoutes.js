import express from "express"
import userController from './userController.js';
import User from "../models/User.js";
import authenticateToken
 from "../middleware/authenticateToken.js";

const router = express.Router();

router.post("/users/register", userController.registerUser);
router.post("/users/login", userController.loginUser)

// Protected routes
router.get('/users/dashboard', authenticateToken, userController.fetchGroceries);



export default router

