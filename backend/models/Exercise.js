const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    categories: [
      {
        type: String,
        enum: [
          "Weight Loss",
          "Muscle Gain",
          "Maintain Weight",
          "Improve Fitness",
        ],
      },
    ],

    type: {
      type: String,
      enum: [
        "Cardio",
        "Strength",
        "Bodyweight",
        "Conditioning",
        "Flexibility",
      ],
      required: true,
    },

    met: {
      type: Number,
      required: true,
      min: 1,
    },

    defaultDurationMinutes: {
      type: Number,
      required: true,
      min: 1,
      default: 30,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    source: {
      name: {
        type: String,
        default: "2024 Adult Compendium of Physical Activities",
      },

      activityCode: {
        type: String,
        default: "",
      },
    },

    isCustom: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Exercise",
  exerciseSchema
);