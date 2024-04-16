import express from 'express';
import userRoutes from './api/userRoutes.js';
import groceryRoutes from './api/groceryRoutes.js';
import cors from "cors";

const app = express();
// const cors = require('cors');

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', userRoutes);
app.use('/api/', groceryRoutes);

export default app