import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Check if model already exists (to avoid overwrite error in dev)
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
