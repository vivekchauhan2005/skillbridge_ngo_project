import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user","admin","volunteer"], default: "user" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
