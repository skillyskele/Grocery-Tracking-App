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
        const itemInfo = { name: req.body.name, amount: req.body.amount, expiration: req.body.expiration };
        
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

    static async deleteCategory(req, res) {
        const userId = req.user.userId;
        const category = req.body.category;
        console.log(category);
        try {
            // Fetch the user data from the database
            let userData = await User.findById(userId);
            let groceryData = await GroceryList.findById(userData.groceryList);
            let groceryList = groceryData.groceries;
    
            // Check if the category exists in the user's grocery list
            if (groceryList.has(category)) {
                // If the category exists, delete it from the user's grocery list
                groceryList.delete(category);
                await groceryData.save();
                return res.status(200).json({ message: 'Category deleted successfully' });
            } else {
                // If the category doesn't exist, return a JSON response with an appropriate message
                return res.status(400).json({ message: 'Category does not exist' });
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    static async deleteGroceryItem(req, res) {
        const userId = req.user.userId;
        const category = req.body.category;
        const itemName = req.body.item; // Assuming you're passing the item name to delete

        try {
            // Fetch the user data from the database
            let userData = await User.findById(userId);
            let groceryData = await GroceryList.findById(userData.groceryList);
            let groceryList = groceryData.groceries;
            console.log(groceryList);
            console.log(category);
            // Check if the category exists in the user's grocery list
            if (groceryList.has(category)) {
                // If the category exists, find the item in the category and remove it
                let itemArray = groceryList.get(category);
                const index = itemArray.findIndex(item => item.name === itemName);

                if (index !== -1) {
                    // Remove the item from the array
                    itemArray.splice(index, 1);
                    groceryList.set(category, itemArray);
                    await groceryData.save();
                    return res.status(200).json({ message: 'Item deleted successfully' });
                } else {
                    return res.status(404).json({ message: 'Item not found in the category' });
                }
            } else {
                // If the category doesn't exist, return a JSON response with an appropriate message
                return res.status(400).json({ message: 'Item: Category does not exist' });
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
