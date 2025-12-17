import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    skillsRequired: { type: String },
    duration: { type: String },
    location: { type: String },
    status: {
      type: String,
      enum: ["Open", "Closed", "In Progress"],
      default: "Open",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Opportunity", opportunitySchema);
