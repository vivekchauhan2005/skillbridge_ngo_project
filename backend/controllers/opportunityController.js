import Opportunity from "../models/Opportunity.js";

export const createOpportunity = async (req, res) => {
  try {
    const opportunity = new Opportunity({
      ...req.body,
      createdBy: req.user.id,
    });

    await opportunity.save();

    res.status(201).json({
      message: "Opportunity created successfully",
      opportunity,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create opportunity" });
  }
};
