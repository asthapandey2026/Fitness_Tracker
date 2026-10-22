const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = require("../config/db");
const Exercise = require("../models/Exercise");

dotenv.config();

const exercises = [
    // =====================================================
    // WEIGHT LOSS
    // =====================================================

    {
        name: "Brisk Walking",
        categories: ["Weight Loss", "Maintain Weight"],
        type: "Cardio",
        met: 4.8,
        defaultDurationMinutes: 30,
        description:
            "Brisk walking performed at a moderate-to-fast pace.",
        source: {
            activityCode: "17200",
        },
    },

    {
        name: "Jogging",
        categories: ["Weight Loss", "Maintain Weight", "Improve Fitness"],
        type: "Cardio",
        met: 7.5,
        defaultDurationMinutes: 30,
        description:
            "Jogging at a self-selected general pace.",
        source: {
            activityCode: "12020",
        },
    },

    {
        name: "Running",
        categories: ["Weight Loss", "Improve Fitness"],
        type: "Cardio",
        met: 9.3,
        defaultDurationMinutes: 30,
        description:
            "Running at approximately 6 to 6.3 mph.",
        source: {
            activityCode: "12050",
        },
    },

    {
        name: "Jump Rope",
        categories: ["Weight Loss", "Improve Fitness"],
        type: "Cardio",
        met: 11.0,
        defaultDurationMinutes: 20,
        description:
            "General rope skipping exercise.",
        source: {
            activityCode: "02068",
        },
    },

    {
        name: "Cycling",
        categories: ["Weight Loss", "Maintain Weight", "Improve Fitness"],
        type: "Cardio",
        met: 7.0,
        defaultDurationMinutes: 30,
        description:
            "General cycling activity.",
        source: {
            activityCode: "01014",
        },
    },

    {
        name: "Rowing",
        categories: ["Weight Loss", "Improve Fitness"],
        type: "Cardio",
        met: 5.0,
        defaultDurationMinutes: 30,
        description:
            "Stationary rowing at moderate effort.",
        source: {
            activityCode: "02071",
        },
    },

    {
        name: "Stair Training",
        categories: ["Weight Loss", "Improve Fitness"],
        type: "Cardio",
        met: 9.3,
        defaultDurationMinutes: 20,
        description:
            "Stair treadmill or similar stair-based training.",
        source: {
            activityCode: "02065",
        },
    },

    // =====================================================
    // MUSCLE GAIN
    // =====================================================

    {
        name: "Squats",
        categories: ["Muscle Gain", "Improve Fitness"],
        type: "Strength",
        met: 5.0,
        defaultDurationMinutes: 30,
        description:
            "Resistance training involving squats.",
        source: {
            activityCode: "02052",
        },
    },

    {
        name: "Deadlifts",
        categories: ["Muscle Gain", "Improve Fitness"],
        type: "Strength",
        met: 5.0,
        defaultDurationMinutes: 30,
        description:
            "Resistance training involving deadlift movements.",
        source: {
            activityCode: "02052",
        },
    },

    {
        name: "Push-ups",
        categories: ["Muscle Gain", "Improve Fitness"],
        type: "Bodyweight",
        met: 3.8,
        defaultDurationMinutes: 20,
        description:
            "Push-ups performed at moderate effort.",
        source: {
            activityCode: "02022",
        },
    },

    {
        name: "Pull-ups",
        categories: ["Muscle Gain", "Improve Fitness"],
        type: "Bodyweight",
        met: 3.8,
        defaultDurationMinutes: 20,
        description:
            "Pull-ups performed at moderate effort.",
        source: {
            activityCode: "02022",
        },
    },

    {
        name: "Lunges",
        categories: ["Muscle Gain", "Improve Fitness"],
        type: "Bodyweight",
        met: 3.8,
        defaultDurationMinutes: 20,
        description:
            "Lunges performed at moderate effort.",
        source: {
            activityCode: "02022",
        },
    },

    {
        name: "Resistance Training",
        categories: ["Muscle Gain", "Improve Fitness"],
        type: "Strength",
        met: 3.5,
        defaultDurationMinutes: 30,
        description:
            "Multiple resistance exercises using varied resistance.",
        source: {
            activityCode: "02054",
        },
    },

    {
        name: "Kettlebell Swings",
        categories: ["Muscle Gain", "Weight Loss", "Improve Fitness"],
        type: "Conditioning",
        met: 9.8,
        defaultDurationMinutes: 20,
        description:
            "Kettlebell swing training.",
        source: {
            activityCode: "02058",
        },
    },

    // =====================================================
    // MAINTAIN WEIGHT
    // =====================================================

    {
        name: "Walking",
        categories: ["Maintain Weight", "Weight Loss"],
        type: "Cardio",
        met: 3.8,
        defaultDurationMinutes: 30,
        description:
            "Walking at a moderate pace.",
        source: {
            activityCode: "17200",
        },
    },

    {
        name: "Swimming",
        categories: ["Maintain Weight", "Weight Loss", "Improve Fitness"],
        type: "Cardio",
        met: 5.8,
        defaultDurationMinutes: 30,
        description:
            "Recreational or slow freestyle swimming.",
        source: {
            activityCode: "18240",
        },
    },

    {
        name: "Bodyweight Training",
        categories: ["Maintain Weight", "Muscle Gain", "Improve Fitness"],
        type: "Bodyweight",
        met: 3.0,
        defaultDurationMinutes: 30,
        description:
            "General bodyweight resistance exercises.",
        source: {
            activityCode: "02056",
        },
    },

    {
        name: "Moderate Circuit Training",
        categories: ["Maintain Weight", "Weight Loss", "Improve Fitness"],
        type: "Conditioning",
        met: 5.0,
        defaultDurationMinutes: 30,
        description:
            "Circuit training performed at moderate effort.",
        source: {
            activityCode: "02035",
        },
    },

    {
        name: "Hatha Yoga",
        categories: ["Maintain Weight", "Improve Fitness"],
        type: "Flexibility",
        met: 2.3,
        defaultDurationMinutes: 30,
        description:
            "Hatha yoga practice.",
        source: {
            activityCode: "02150",
        },
    },

    {
        name: "Cycling - Easy Pace",
        categories: ["Maintain Weight"],
        type: "Cardio",
        met: 4.3,
        defaultDurationMinutes: 30,
        description:
            "Cycling at an easy self-selected pace.",
        source: {
            activityCode: "01015",
        },
    },

    {
        name: "Brisk Walking - Transportation Pace",
        categories: ["Maintain Weight"],
        type: "Cardio",
        met: 3.5,
        defaultDurationMinutes: 30,
        description:
            "Walking at approximately 2.8 to 3.2 mph.",
        source: {
            activityCode: "16060",
        },
    },

    // =====================================================
    // IMPROVE FITNESS
    // =====================================================

    {
        name: "HIIT",
        categories: ["Improve Fitness", "Weight Loss"],
        type: "Conditioning",
        met: 7.0,
        defaultDurationMinutes: 20,
        description:
            "High-intensity interval exercise at moderate effort.",
        source: {
            activityCode: "02210",
        },
    },

    {
        name: "Burpees",
        categories: ["Improve Fitness", "Weight Loss"],
        type: "Conditioning",
        met: 11.0,
        defaultDurationMinutes: 15,
        description:
            "Vigorous high-intensity exercise involving burpees.",
        source: {
            activityCode: "02214",
        },
    },

    {
        name: "Plank",
        categories: ["Improve Fitness", "Muscle Gain"],
        type: "Bodyweight",
        met: 2.8,
        defaultDurationMinutes: 15,
        description:
            "Plank and light abdominal calisthenics.",
        source: {
            activityCode: "02024",
        },
    },

    {
        name: "Vigorous Calisthenics",
        categories: ["Improve Fitness", "Weight Loss"],
        type: "Conditioning",
        met: 7.5,
        defaultDurationMinutes: 20,
        description:
            "Vigorous calisthenics such as push-ups, sit-ups, pull-ups, jumping jacks and burpees.",
        source: {
            activityCode: "02020",
        },
    },

    {
        name: "Elliptical Trainer",
        categories: ["Improve Fitness", "Weight Loss"],
        type: "Cardio",
        met: 5.0,
        defaultDurationMinutes: 30,
        description:
            "Elliptical trainer at moderate effort.",
        source: {
            activityCode: "02048",
        },
    },

    {
        name: "Rowing - Vigorous",
        categories: ["Improve Fitness", "Weight Loss"],
        type: "Cardio",
        met: 7.3,
        defaultDurationMinutes: 20,
        description:
            "Stationary rowing at vigorous effort.",
        source: {
            activityCode: "02070",
        },
    },

    {
        name: "Power Yoga",
        categories: ["Improve Fitness", "Maintain Weight"],
        type: "Flexibility",
        met: 4.0,
        defaultDurationMinutes: 30,
        description:
            "Power yoga practice.",
        source: {
            activityCode: "02160",
        },
    },
];

const seedExercises = async () => {
    try {
        await connectDB();

        await Exercise.deleteMany({});

        await Exercise.insertMany(exercises);

        console.log(
            `Successfully inserted ${exercises.length} exercises.`
        );

        process.exit(0);
    } catch (error) {
        console.error(
            "Exercise seed error:",
            error.message
        );

        process.exit(1);
    }
};

seedExercises();