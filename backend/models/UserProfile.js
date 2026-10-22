const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    height: {
      type: Number,
      default: 0,
      min: 0,
    },

    weight: {
      type: Number,
      default: 0,
      min: 0,
    },

    fitnessGoal: {
      type: String,
      enum: [
        "Weight Loss",
        "Muscle Gain",
        "Maintain Weight",
        "Improve Fitness",
      ],
      default: "Improve Fitness",
    },

    dailyCalorieGoal: {
      type: Number,
      default: 500,
      min: 0,
    },

    dailyWorkoutGoal: {
      type: Number,
      default: 1,
      min: 1,
    },

    dailyDurationGoal: {
      type: Number,
      default: 30,
      min: 1,
    },

    activityLevel: {
      type: String,
      enum: [
        "Sedentary",
        "Lightly Active",
        "Moderately Active",
        "Very Active",
      ],
      default: "Moderately Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "UserProfile",
  userProfileSchema
);