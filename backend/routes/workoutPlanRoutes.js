const express = require("express");
const router = express.Router();
const { getWorkoutPlans } = require("../controllers/workoutPlanController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getWorkoutPlans);

module.exports = router;

