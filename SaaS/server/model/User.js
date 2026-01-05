import mongoose from "mongoose";
import bycrypt from 'bcrypt';

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
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);
userSchema.methods.comparePassword = function (password){
  return bycrypt.compareSync(password, this.password)
}

const User = mongoose.Model.User || mongoose.model("User", userSchema);

export default User;
