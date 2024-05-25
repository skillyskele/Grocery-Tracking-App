import User from '../models/User.js'; // This is your User model
import GroceryList from '../models/Grocery.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const saltRounds = 10;

const createEmptyGroceryList = async () => {
    try {
        const groceryList = await GroceryList.create({});
        console.log("created empty list:");
        return groceryList;
    } catch (error) {
        console.error(error);
        throw new Error("Error creating empty grocery list");
    }
};

class UserController {
    static async registerUser(req, res) {//differentiatesby username
        try {
            const { username, password, email } = req.body;
            const passwordHash = await bcrypt.hash(password, saltRounds);
            const groceryList = await createEmptyGroceryList();
            await User.create({ username, password: passwordHash, email, groceryList: groceryList._id });
            res.status(201).json({ message: "User registered successfully!" });
        } catch (error) {
            if (error.code === 11000) {
                // 409 Conflict: Duplicate key error
                res.status(409).json({ message: "User already exists." });
            } else {
                // 500 Internal Server Error: Any other error
                res.status(500).json({ message: "Error registering user", error: error.message });
            }
        }
    }
    
    static async loginUser(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username }); // Find the user in the database
            const match = await bcrypt.compare(password, user.password);
            if (user && match) {
                const token = jwt.sign(
                    { userId: user._id, username}, //this user information comes from User.findOne returning a user with user id created by mongoose and username, which i made
                    process.env.JWT_SECRET,
                    { expiresIn: '2h'}
                );
                console.log({username, password}) //delete later
                res.status(200).json({ message: "Login successful!", token });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error logging in", error: error.message });
        }
    }

    static async fetchGroceries(req, res) { //turn this into user/:id or something...
        // `req.user` contains the data from the JWT, such as userId
        const userId = req.user.userId;
        console.log("here's the userId: ", userId);
        
        try {
            // Fetch user-specific data from the database using `userId`
            const userData = await User.findById(userId)
            if (!userData) {
                return res.status(404).json({ message: 'User not found' });
            }
            let groceryData = await GroceryList.findById(userData.groceryList) //document
            let groceryList = groceryData.groceries //map

            console.log("fetchGroceries from userController:", groceryList)            
            // Send the groceryList back in JSON format
            res.json({
                message: `Welcome to your dashboard, user ${userData.username}.`,
                groceryList
            });
        } catch (error) {
            console.log("Error fetching groceries, in userController");
            res.status(500).json({ message: "Error fetching user data" });
        }
    };
}

export default UserController;