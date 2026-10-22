const Exercise = require("../models/Exercise");
const UserProfile = require("../models/UserProfile");
const {
  ALLOWED_DURATIONS,
  ALLOWED_DIFFICULTIES,
  ALLOWED_GOALS,
  buildWorkoutPlan,
} = require("../config/workoutPlans");

const getWorkoutPlans = async (req, res) => {
  try {
    const goal = req.query.goal || "Improve Fitness";
    const duration = Number(req.query.duration || 30);
    const difficulty = req.query.difficulty || "Beginner";

    if (!ALLOWED_GOALS.includes(goal)) {
      return res.status(400).json({ message: `Invalid goal. Choose: ${ALLOWED_GOALS.join(", ")}.` });
    }
    if (!ALLOWED_DURATIONS.includes(duration)) {
      return res.status(400).json({ message: "Duration must be 15, 30, 45, or 60 minutes." });
    }
    if (!ALLOWED_DIFFICULTIES.includes(difficulty)) {
      return res.status(400).json({ message: `Invalid difficulty. Choose: ${ALLOWED_DIFFICULTIES.join(", ")}.` });
    }

    // Assumption: UserProfile owner field is `user`; `weight` is in kilograms.
    // Change this query if your actual UserProfile schema uses a different owner field.
    const profile = await UserProfile.findOne({ user: req.userId }).select("weight").lean();
    const parsedWeight = Number(profile?.weight);
    const weightKg = Number.isFinite(parsedWeight) && parsedWeight > 0 ? parsedWeight : null;

    // MET values are read from the stored Exercise records and never overridden here.
    const exercises = await Exercise.find({ isActive: true, isCustom: false })
      .select("_id name categories type met description isCustom source")
      .lean();

    const plan = buildWorkoutPlan({ goal, duration, difficulty, exercises, weightKg });
    if (!plan) return res.status(400).json({ message: "Could not create a plan for those settings." });
    return res.status(200).json({ plan });
  } catch (error) {
    console.error("getWorkoutPlans error:", error);
    if (error.message?.startsWith("Required exercise")) {
      return res.status(500).json({
        message: error.message,
        hint: "Check that names in config/workoutPlans.js exactly match the Exercise collection.",
      });
    }
    return res.status(500).json({ message: "Could not generate the workout plan." });
  }
};

module.exports = { getWorkoutPlans };
