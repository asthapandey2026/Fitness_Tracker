import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Link } from "react-router-dom";

import API from "../services/api";
import StatCard from "../components/StatCard";

import {
  LocalFireDepartment,
  FitnessCenter,
  Timer,
} from "@mui/icons-material";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalCalories: 0,
    totalDuration: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await API.get("/workouts/stats");

        setStats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9f7]">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-7">

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-medium text-green-600 uppercase tracking-wider mb-1">
            Today's Progress
          </p>

          <h1 className="text-2xl font-semibold text-gray-900">
            Fitness Dashboard
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            See how much you've moved today and keep building
            your fitness streak.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <StatCard
            title="Today's Calories"
            value={stats.todayCalories || 0}
            unit="kcal"
            icon={<LocalFireDepartment fontSize="small" />}
            goal={stats.dailyCalorieGoal}
            progress={stats.calorieProgress}
          />

          <StatCard
            title="Today's Workouts"
            value={stats.todayWorkouts || 0}
            unit="workouts"
            icon={<FitnessCenter fontSize="small" />}
            goal={stats.dailyWorkoutGoal}
            progress={stats.workoutProgress}
          />

          <StatCard
            title="Today's Duration"
            value={stats.todayDuration || 0}
            unit="minutes"
            icon={<Timer fontSize="small" />}
            goal={stats.dailyDurationGoal}
            progress={stats.durationProgress}
          />

        </div>

        {/* Weekly Calories */}
        <section className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 mt-6">

          <div className="mb-3">
            <h2 className="text-base font-semibold text-gray-900">
              Weekly Calories
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Calories burned from Monday to Sunday.
            </p>
          </div>

          <div className="w-full overflow-x-auto">
            <LineChart
              xAxis={[
                {
                  scaleType: "point",
                  data: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun",
                  ],
                },
              ]}
              series={[
                {
                  data: stats.weeklyCalories || [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                  ],
                  label: "Calories Burned",
                },
              ]}
              height={300}
            />
          </div>

        </section>

        {/* Monthly Calories */}
        <section className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 mt-4">

          <div className="mb-3">
            <h2 className="text-base font-semibold text-gray-900">
              Monthly Calories
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Daily calorie-burning activity this month.
            </p>
          </div>

          <div className="w-full overflow-x-auto">
            <LineChart
              xAxis={[
                {
                  scaleType: "point",
                  data:
                    stats.monthlyCalories?.map(
                      (item) => item.day
                    ) || [],
                },
              ]}
              series={[
                {
                  data:
                    stats.monthlyCalories?.map(
                      (item) => item.calories
                    ) || [],
                  label: "Calories Burned",
                },
              ]}
              height={300}
            />
          </div>

        </section>

        {/* Recent Workouts */}
        <section className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 mt-4">

          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Recent Workouts
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Your latest workout activity.
              </p>
            </div>

            <Link
              to="/workouts"
              className="text-xs font-medium text-green-600 hover:text-green-700"
            >
              View all
            </Link>
          </div>

          {stats.recentWorkouts?.length > 0 ? (
            <div className="divide-y divide-gray-100">

              {stats.recentWorkouts.map((workout) => (
                <div
                  key={workout._id}
                  className="py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    {/* Workout */}
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {workout.exercise}
                      </h3>

                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(
                          workout.workoutDate
                        ).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}

                        <span className="mx-1.5">
                          ·
                        </span>

                        {workout.sets} sets × {workout.reps} reps
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 sm:shrink-0">

                      <div>
                        <p className="text-[11px] text-gray-400">
                          Duration
                        </p>

                        <p className="text-xs font-medium text-gray-700 mt-0.5">
                          {workout.duration} min
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] text-gray-400">
                          Calories
                        </p>

                        <p className="text-xs font-medium text-gray-700 mt-0.5">
                          {workout.caloriesBurned} kcal
                        </p>
                      </div>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          ) : (
            <div className="text-center py-8">

              <p className="text-sm text-gray-500">
                No workouts recorded yet.
              </p>

              <Link
                to="/add-workout"
                className="inline-flex mt-3 px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition"
              >
                Add your first workout
              </Link>

            </div>
          )}

        </section>

      </main>
    </div>
  );
};

export default Dashboard;