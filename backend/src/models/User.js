import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: { type: String, required: true, minlength: 6 },

    // Profile fields (match Profile.jsx)
    age: { type: Number },
    gender: { type: String, enum: ["male", "female", "other", ""], default: "" },
    height: { type: Number },        // cm
    currentWeight: { type: Number }, // kg
    goalWeight: { type: Number },    // kg
    goal: { type: String, enum: ["loss", "gain", "maintenance", ""], default: "" },
    diet: {
      type: String,
      enum: ["vegetarian", "eggetarian", "non-vegetarian", ""],
      default: ""
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;