import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js'; // Added 'src/' here
import authRoutes from './src/routes/authRoutes.js'; // Update if imported here
import analyticsRoutes from './src/routes/analyticsRoutes.js'; // Update if imported here
import healthRoutes from './src/routes/healthRoutes.js'

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/health',healthRoutes)

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'API is running successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});