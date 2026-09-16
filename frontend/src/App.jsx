import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Progress from "./pages/Progress";
import FoodLog from "./pages/FoodLog";
import ExerciseLog from "./pages/ExerciseLog";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <Profile />
            </>
          }
        />

        <Route
          path="/progress"
          element={
            <>
              <Navbar />
              <Progress />
            </>
          }
        />

        <Route
          path="/food-log"
          element={
            <>
              <Navbar />
              <FoodLog />
            </>
          }
        />

<Route
  path="/exercise-log"
  element={
    <>
      <Navbar />
      <ExerciseLog />
    </>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;