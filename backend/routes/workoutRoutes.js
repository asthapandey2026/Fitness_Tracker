const express = require("express");

const {
  addWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
  getWorkoutStats,
} = require("../controllers/workoutController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addWorkout);
router.get("/", protect, getWorkouts);
router.put("/:id", protect, updateWorkout);
router.delete("/:id", protect, deleteWorkout);
router.get("/stats", protect, getWorkoutStats);

module.exports = router;