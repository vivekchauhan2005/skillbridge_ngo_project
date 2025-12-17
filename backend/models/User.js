
 import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  fullName: { type: String, required: true },

  role: {
    type: String,
    enum: ["Volunteer", "NGO"],
    required: true,
  },

  // OPTIONAL — added later via profile edit
  skills: { type: [String], default: [] },
  bio: { type: String, default: "" },
  location: { type: String, default: "" },
  website: { type: String, default: "" },

  organizationDescription: { type: String, default: "" },

}, { timestamps: true });
export default mongoose.model("User", userSchema);