function Profile() {
  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>Set Up Your Profile</h1>

        <p>Tell us a little about yourself.</p>

        <form>
          <input
            type="number"
            placeholder="Age"
          />

          <select>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="number"
            placeholder="Height (cm)"
          />

          <input
            type="number"
            placeholder="Current Weight (kg)"
          />

          <input
            type="number"
            placeholder="Goal Weight (kg)"
          />

          <select>
            <option value="">Select Goal</option>
            <option value="loss">Weight Loss</option>
            <option value="gain">Weight Gain</option>
            <option value="maintenance">Weight Maintenance</option>
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