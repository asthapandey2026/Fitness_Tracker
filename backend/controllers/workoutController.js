const Workout = require("../models/Workout");
const UserProfile = require("../models/UserProfile");

// ADD WORKOUT
const addWorkout = async (req, res) => {
    try {
        const {
            exercise,
            sets,
            reps,
            weight,
            duration,
            caloriesBurned,
            workoutDate,
        } = req.body;

        if (!exercise || !sets || !reps || !duration) {
            return res.status(400).json({
                message: "Please provide exercise, sets, reps and duration",
            });
        }

        const workout = await Workout.create({
            user: req.userId,
            exercise,
            sets,
            reps,
            weight: weight || 0,
            duration,
            caloriesBurned: caloriesBurned || 0,
            workoutDate: workoutDate || Date.now(),
        });

        res.status(201).json({
            message: "Workout added successfully",
            workout,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};


// GET MY WORKOUTS
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({
            user: req.userId,
        }).sort({ workoutDate: -1 });

        res.status(200).json({
            workouts,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};


// UPDATE WORKOUT
const updateWorkout = async (req, res) => {
    try {
        const workout = await Workout.findOne({
            _id: req.params.id,
            user: req.userId,
        });

        if (!workout) {
            return res.status(404).json({
                message: "Workout not found",
            });
        }

        const {
            exercise,
            sets,
            reps,
            weight,
            duration,
            caloriesBurned,
            workoutDate,
        } = req.body;

        workout.exercise = exercise ?? workout.exercise;
        workout.sets = sets ?? workout.sets;
        workout.reps = reps ?? workout.reps;
        workout.weight = weight ?? workout.weight;
        workout.duration = duration ?? workout.duration;
        workout.caloriesBurned =
            caloriesBurned ?? workout.caloriesBurned;
        workout.workoutDate =
            workoutDate ?? workout.workoutDate;

        await workout.save();

        res.status(200).json({
            message: "Workout updated successfully",
            workout,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};


// DELETE WORKOUT
const deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findOne({
            _id: req.params.id,
            user: req.userId,
        });

        if (!workout) {
            return res.status(404).json({
                message: "Workout not found",
            });
        }

        await workout.deleteOne();

        res.status(200).json({
            message: "Workout deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

// GET WORKOUT STATISTICS
const getWorkoutStats = async (req, res) => {
    try {
        const workouts = await Workout.find({
            user: req.userId,
        }).sort({ workoutDate: -1 });

        const profile = await UserProfile.findOne({
            user: req.userId,
        });

        // -----------------------------
        // LIFETIME STATISTICS
        // -----------------------------

        const totalWorkouts = workouts.length;

        const totalCalories = workouts.reduce(
            (total, workout) => total + workout.caloriesBurned,
            0
        );

        const totalDuration = workouts.reduce(
            (total, workout) => total + workout.duration,
            0
        );


        // -----------------------------
        // TODAY'S STATISTICS
        // -----------------------------

        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);

        const todaysWorkouts = workouts.filter((workout) => {
            const workoutDate = new Date(workout.workoutDate);

            return (
                workoutDate >= startOfToday &&
                workoutDate <= endOfToday
            );
        });

        const todayWorkouts = todaysWorkouts.length;

        const todayCalories = todaysWorkouts.reduce(
            (total, workout) => total + workout.caloriesBurned,
            0
        );

        const todayDuration = todaysWorkouts.reduce(
            (total, workout) => total + workout.duration,
            0
        );


        // -----------------------------
        // DAILY GOALS
        // -----------------------------

        const dailyCalorieGoal =
            profile?.dailyCalorieGoal || 0;

        const dailyWorkoutGoal =
            profile?.dailyWorkoutGoal || 0;

        const dailyDurationGoal =
            profile?.dailyDurationGoal || 0;


        // -----------------------------
        // GOAL PROGRESS
        // -----------------------------

        const calorieProgress =
            dailyCalorieGoal > 0
                ? Math.min(
                    Math.round(
                        (todayCalories / dailyCalorieGoal) * 100
                    ),
                    100
                )
                : 0;

        const workoutProgress =
            dailyWorkoutGoal > 0
                ? Math.min(
                    Math.round(
                        (todayWorkouts / dailyWorkoutGoal) * 100
                    ),
                    100
                )
                : 0;

        const durationProgress =
            dailyDurationGoal > 0
                ? Math.min(
                    Math.round(
                        (todayDuration / dailyDurationGoal) * 100
                    ),
                    100
                )
                : 0;


        // -----------------------------
        // WEEKLY CALORIES
        // Monday → Sunday
        // -----------------------------

        const today = new Date();

        const dayOfWeek = today.getDay();

        const daysFromMonday =
            dayOfWeek === 0 ? 6 : dayOfWeek - 1;

        const startOfWeek = new Date(today);

        startOfWeek.setDate(
            today.getDate() - daysFromMonday
        );

        startOfWeek.setHours(0, 0, 0, 0);

        const weeklyCalories = [
            0, 0, 0, 0, 0, 0, 0
        ];

        workouts.forEach((workout) => {
            const workoutDate = new Date(
                workout.workoutDate
            );

            if (
                workoutDate >= startOfWeek &&
                workoutDate <= today
            ) {
                const day = workoutDate.getDay();

                const mondayBasedDay =
                    day === 0 ? 6 : day - 1;

                weeklyCalories[mondayBasedDay] +=
                    workout.caloriesBurned;
            }
        });


        // -----------------------------
        // MONTHLY CALORIES
        // -----------------------------

        const monthlyCalories = [];

        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();

        const daysInMonth = new Date(
            currentYear,
            currentMonth + 1,
            0
        ).getDate();

        for (
            let day = 1;
            day <= daysInMonth;
            day++
        ) {
            monthlyCalories.push({
                day,
                calories: 0,
            });
        }

        workouts.forEach((workout) => {
            const workoutDate = new Date(
                workout.workoutDate
            );

            if (
                workoutDate.getFullYear() === currentYear &&
                workoutDate.getMonth() === currentMonth
            ) {
                const day = workoutDate.getDate();

                monthlyCalories[day - 1].calories +=
                    workout.caloriesBurned;
            }
        });


        // -----------------------------
        // RECENT WORKOUTS
        // -----------------------------

        const recentWorkouts = workouts.slice(0, 3);


        // -----------------------------
        // RESPONSE
        // -----------------------------

        res.status(200).json({
            totalWorkouts,
            totalCalories,
            totalDuration,

            todayWorkouts,
            todayCalories,
            todayDuration,

            dailyCalorieGoal,
            dailyWorkoutGoal,
            dailyDurationGoal,

            calorieProgress,
            workoutProgress,
            durationProgress,

            weeklyCalories,
            monthlyCalories,
            recentWorkouts,
        });

    } catch (error) {
        console.error("Workout Stats Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

module.exports = {
    addWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout,
    getWorkoutStats,
};