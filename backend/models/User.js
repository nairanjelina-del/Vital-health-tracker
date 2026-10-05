
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    }
  },
  {
    timestamps: true
  }
);


// Hash password before saving
userSchema.pre("save", async function () {

  // Only hash if password was changed
  if (!this.isModified("password")) {
    return;
  }

  // Hash password once
  this.password = await bcrypt.hash(this.password, 10);
});


// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {

  return await bcrypt.compare(
    enteredPassword,
    this.password
  );
};


const User = mongoose.model("User", userSchema);

export default User;

