import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Shape of the user object sent to the frontend (never includes password)
const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  age: user.age,
  gender: user.gender,
  height: user.height,
  currentWeight: user.currentWeight,
  goalWeight: user.goalWeight,
  goal: user.goal,
  diet: user.diet
});

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide name, email and password" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      message: "Registration successful",
      user: formatUser(user),
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

// LOGIN
export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: formatUser(user),
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// GET PROFILE
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(formatUser(user));
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PROFILE
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, age, gender, height, currentWeight, goalWeight, goal, diet, password } = req.body;

    // Empty string from a form means "not set" -> store as undefined for numbers
    const num = (v, old) => (v === undefined ? old : v === "" ? undefined : Number(v));

    if (name) user.name = name;
    user.age = num(age, user.age);
    user.height = num(height, user.height);
    user.currentWeight = num(currentWeight, user.currentWeight);
    user.goalWeight = num(goalWeight, user.goalWeight);
    if (gender !== undefined) user.gender = gender;
    if (goal !== undefined) user.goal = goal;
    if (diet !== undefined) user.diet = diet;
    if (password) user.password = password; // hashed by pre-save hook

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: formatUser(updatedUser)
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};