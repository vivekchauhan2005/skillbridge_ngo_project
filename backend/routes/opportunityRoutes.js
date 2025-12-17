import express from "express";
import { createOpportunity } from "../controllers/opportunityController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import ngoOnly from "../middleware/ngoOnly.js";
console.log("🔥 OPPORTUNITY ROUTES FILE LOADED");

const router = express.Router();

// NGO creates opportunity
router.post(
  "/",
  authMiddleware,
  ngoOnly,
  createOpportunity
);

export default router;
