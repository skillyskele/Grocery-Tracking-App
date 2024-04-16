import 'dotenv/config'
import app from "./server.js";
//import UserDAO from "../dao/UserDAO.js";
import mongoose from 'mongoose';

const username = encodeURIComponent(process.env.DB_USERNAME); 
const password = encodeURIComponent(process.env.DB_PASSWORD);
const host = process.env.DB_HOST;

// Check if the variables are defined
console.log({ username, password, host });

const uri = `mongodb+srv://${username}:${password}@${host}/?retryWrites=true&w=majority&appName=Cluster0`;
const port = 3001

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
.catch(err => {
  console.error(err.stack)
  process.exit(1)
})
.then(async () => {
  console.log("We're connected to the database!");
  //await UserDAO.injectDB(client)
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});

// app.listen(port, ()=> {
//   console.log('listening on port 3001');
// })