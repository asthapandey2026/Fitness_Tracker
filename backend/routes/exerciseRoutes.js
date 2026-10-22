const express = require("express");

const {
  getExercises,
  getExercisesByCategory,
} = require("../controllers/exerciseController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getExercises);
router.get("/category/:category", protect, getExercisesByCategory);

module.exports = router;