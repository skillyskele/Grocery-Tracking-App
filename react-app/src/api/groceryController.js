import User from '../models/User.js';
import GroceryList from '../models/Grocery.js';

export default class groceryController {
    static async addCategory(req, res) {
        const userId = req.user.userId;
        const category = req.body.category; 
        console.log(userId)
        try {
            // Fetch the user data from the database
            let userData = await User.findById(userId); //populate will make it fill up with the default veggies meats flavour. 
            let groceryData = await GroceryList.findById(userData.groceryList) //document
            let groceryList = groceryData.groceries //map
            console.log("from addCategory of grocerycontrolloer: ", groceryList);
            const categoryExists = groceryList.has(category); 
    
            if (!categoryExists) {
                // If the category doesn't exist, add it to the user's grocery list
                groceryList.set(category, []); //here's thenew grocerylist: [ feelins: [] ] i think it's sumn like this
                await groceryData.save();

                return res.status(200).json({ message: 'Category added successfully' });
            } else {
                return res.status(400).json({ message: 'Category already exists' });
            }
        } catch (error) {
            console.error('Error adding category:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async addGroceryItem(req, res) {
        const userId = req.user.userId;
        const category = req.body.category;
        const itemInfo = { name: req.body.name, amount: req.body.amount, timestamp: new Date() };

        try {
            // Fetch the user data from the database
            let userData = await User.findById(userId);
            let groceryData = await GroceryList.findById(userData.groceryList) //document
            let groceryList = groceryData.groceries //map
            console.log("here's the groceryList", groceryList)
            const categoryExists = groceryList.has(category); 

            // Check if the category exists in the user's grocery list
            if (categoryExists) {
                // Add the item to the specified category
                console.log(`here's the map for ${category} `, groceryList.get(category)) //general item map
                let itemArray = groceryList.get(category)
                itemArray.push(itemInfo)
                groceryList.set(category, itemArray)
                console.log("here's the new list ", groceryList.get(category))
                await groceryData.save();
            
                return res.status(200).json({ message: 'Item added successfully' });
            } else {
                // If the category doesn't exist, return a JSON response with an appropriate message
                return res.status(400).json({ message: 'Category does not exist' });
            }
        } catch (error) {
            console.error('Error adding item:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
