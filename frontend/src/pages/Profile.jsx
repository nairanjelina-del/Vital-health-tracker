import { useState, useEffect } from "react";
import API from "../services/api";

<<<<<<< HEAD
function Profile() {
 const [profile, setProfile] = useState({
=======
const emptyProfile = {
>>>>>>> 3e94284 (Changes made to frontend)
  age: "",
  gender: "",
  height: "",
  currentWeight: "",
  goalWeight: "",
  goal: "",
  diet: "",
<<<<<<< HEAD
});
useEffect(() => {
  const savedProfile = localStorage.getItem("vitalProfile");
=======
};

function Profile() {
  const [profile, setProfile] = useState(emptyProfile);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load the saved profile from the database
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        const data = res.data;
        setProfile({
          age: data.age ?? "",
          gender: data.gender ?? "",
          height: data.height ?? "",
          currentWeight: data.currentWeight ?? "",
          goalWeight: data.goalWeight ?? "",
          goal: data.goal ?? "",
          diet: data.diet ?? "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Could not load profile");
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await API.put("/auth/profile", profile);

      // Keep the stored user object in sync with the database
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Profile saved successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Could not save profile");
    }
  };
>>>>>>> 3e94284 (Changes made to frontend)

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>Set Up Your Profile</h1>

        <p>Tell us a little about yourself.</p>

        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={profile.age}
            onChange={handleChange}
          />

          <select name="gender" value={profile.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={profile.height}
            onChange={handleChange}
          />

          <input
            type="number"
            name="currentWeight"
            placeholder="Current Weight (kg)"
            step="0.1"
            value={profile.currentWeight}
            onChange={handleChange}
          />

          <input
            type="number"
            name="goalWeight"
            placeholder="Goal Weight (kg)"
            step="0.1"
            value={profile.goalWeight}
            onChange={handleChange}
          />

<<<<<<< HEAD
          <select
  name="goal"
  value={profile.goal}
  onChange={(e) =>
    setProfile({ ...profile, goal: e.target.value })
  }
>
  <option value="">Select Goal</option>
  <option value="loss">Weight Loss</option>
  <option value="gain">Weight Gain</option>
  <option value="maintenance">Weight Maintenance</option>
</select>
<select
  name="diet"
  value={profile.diet}
  onChange={(e) =>
    setProfile({ ...profile, diet: e.target.value })
  }
>
  <option value="">Select Diet Preference</option>
  <option value="vegetarian">Vegetarian</option>
  <option value="eggetarian">Eggetarian</option>
  <option value="non-vegetarian">Non-Vegetarian</option>
</select>
          
=======
          <select name="goal" value={profile.goal} onChange={handleChange}>
            <option value="">Select Goal</option>
            <option value="loss">Weight Loss</option>
            <option value="gain">Weight Gain</option>
            <option value="maintenance">Weight Maintenance</option>
          </select>
>>>>>>> 3e94284 (Changes made to frontend)

          <select name="diet" value={profile.diet} onChange={handleChange}>
            <option value="">Select Diet Preference</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="eggetarian">Eggetarian</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
          </select>

          <button type="submit">Save Profile</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;