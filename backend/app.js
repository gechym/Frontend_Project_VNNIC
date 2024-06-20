import express from 'express';
import dbConnect from './dbConnect.js';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//console.log('Environment Variables:', process.env);

// Log
console.log('Attempting to connect to MongoDB...');

// Execute database connection
dbConnect();

// Middleware
app.use(express.json());
app.use(cors()); // Use cors middleware to allow all origins

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api', authRoutes); // Mount authentication routes

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
