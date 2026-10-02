import { useState, useEffect } from "react";

function Profile() {
 const [profile, setProfile] = useState({
  age: "",
  gender: "",
  height: "",
  currentWeight: "",
  goalWeight: "",
  goal: "",
  diet: "",
});
useEffect(() => {
  const savedProfile = localStorage.getItem("vitalProfile");

  if (savedProfile) {
    setProfile(JSON.parse(savedProfile));
  }
}, []);
  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>Set Up Your Profile</h1>

        <p>Tell us a little about yourself.</p>

        <form
  onSubmit={(e) => {
    e.preventDefault();

    localStorage.setItem("vitalProfile", JSON.stringify(profile));

    alert("Profile saved successfully!");
  }}
>
          <input
  type="number"
  name="age"
  placeholder="Age"
  value={profile.age}
  onChange={(e) =>
    setProfile({ ...profile, age: e.target.value })
  }
/>

          <select
  name="gender"
  value={profile.gender}
  onChange={(e) =>
    setProfile({ ...profile, gender: e.target.value })
  }
>
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
  onChange={(e) =>
    setProfile({ ...profile, height: e.target.value })
  }
/>

<input
  type="number"
  name="currentWeight"
  placeholder="Current Weight (kg)"
  value={profile.currentWeight}
  onChange={(e) =>
    setProfile({ ...profile, currentWeight: e.target.value })
  }
/>

<input
  type="number"
  name="goalWeight"
  placeholder="Goal Weight (kg)"
  value={profile.goalWeight}
  onChange={(e) =>
    setProfile({ ...profile, goalWeight: e.target.value })
  }
/>

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
          

          <button type="submit">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;