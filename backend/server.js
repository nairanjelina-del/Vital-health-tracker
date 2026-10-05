import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import analyticsRoutes from "./src/routes/analyticsRoutes.js";
import healthRoutes from "./src/routes/healthRoutes.js";
import userRoutes from './src/routes/authRoutes.js';




dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/health", healthRoutes);
app.use('/api/users', userRoutes);



// Root route
app.get("/", (req, res) => {
  res.json({
    message: "API is running successfully"
  });
});


// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {

    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {

    console.error("Failed to start server:", error.message);

    process.exit(1);
  }
};

startServer();