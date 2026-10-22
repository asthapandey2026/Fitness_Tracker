const Exercise = require("../models/Exercise");

// GET ALL EXERCISES
const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find({
      isActive: true,
    }).sort({
      name: 1,
    });

    res.status(200).json({
      count: exercises.length,
      exercises,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch exercises.",
      error: error.message,
    });
  }
};

// GET EXERCISES BY CATEGORY
const getExercisesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const exercises = await Exercise.find({
      categories: category,
      isActive: true,
    }).sort({
      name: 1,
    });

    res.status(200).json({
      category,
      count: exercises.length,
      exercises,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch exercises by category.",
      error: error.message,
    });
  }
};

module.exports = {
  getExercises,
  getExercisesByCategory,
};