import express from 'express';
import dbConnect from './dbConnect.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

console.log('Environment Variables:', process.env);

// Log to ensure this line is being executed
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

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
