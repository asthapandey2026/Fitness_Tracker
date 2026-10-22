const UserProfile = require("../models/UserProfile");

// GET PROFILE
const getProfile = async (req, res) => {
  try {
    let profile = await UserProfile.findOne({
      user: req.userId,
    });

    if (!profile) {
      profile = await UserProfile.create({
        user: req.userId,
      });
    }

    // Calculate BMI
    let bmi = 0;

    if (profile.height > 0 && profile.weight > 0) {
      const heightInMeters = profile.height / 100;

      bmi =
        profile.weight /
        (heightInMeters * heightInMeters);

      bmi = Number(bmi.toFixed(1));
    }

    // Determine BMI category
    let bmiCategory = "Not available";

    if (bmi > 0 && bmi < 18.5) {
      bmiCategory = "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
      bmiCategory = "Normal";
    } else if (bmi >= 25 && bmi < 30) {
      bmiCategory = "Overweight";
    } else if (bmi >= 30) {
      bmiCategory = "Obesity";
    }

    res.status(200).json({
      profile,
      bmi,
      bmiCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const {
      height,
      weight,
      fitnessGoal,
      dailyCalorieGoal,
      dailyWorkoutGoal,
      dailyDurationGoal,
      activityLevel,
    } = req.body;

    const profile = await UserProfile.findOneAndUpdate(
      { user: req.userId },
      {
        height,
        weight,
        fitnessGoal,
        dailyCalorieGoal,
        dailyWorkoutGoal,
        dailyDurationGoal,
        activityLevel,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};