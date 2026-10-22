import { useState } from "react";
import API from "../services/api";

const GOALS = [
  "Improve Fitness",
  "Weight Loss",
  "Muscle Gain",
  "Maintain Weight",
];
const DURATIONS = [15, 30, 45, 60];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

const fieldClass =
  "mt-1.5 h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100";

const CuratedWorkoutPlans = () => {
  const [goal, setGoal] = useState("Improve Fitness");
  const [duration, setDuration] = useState(30);
  const [difficulty, setDifficulty] = useState("Beginner");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generatePlan = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await API.get("/workout-plans", {
        params: { goal, duration, difficulty },
      });
      // Supports either a directly returned plan or a wrapped API response.
      const returnedPlan =
        response.data?.plan || response.data?.workoutPlan || response.data;
      setPlan(returnedPlan);
    } catch (err) {
      setPlan(null);
      setError(
        err.response?.data?.message ||
        "Could not generate a plan. Check that the backend is running and you are logged in."
      );
    } finally {
      setLoading(false);
    }
  };

  const planExercises = Array.isArray(plan?.exercises) ? plan.exercises : [];
  const caloriesLabel =
    plan?.caloriesLabel ??
    (Number.isFinite(plan?.estimatedCalories)
      ? `~${plan.estimatedCalories} kcal`
      : "Not available");

  return (
    <div>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-green-600">
            Your next session
          </p>
          <h2 className="text-xl font-semibold text-gray-900">
            Curated Workout Plans
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Build a ready-to-follow routine around your goal, available time, and experience level.
          </p>
        </div>
        <span className="w-fit rounded-full border border-green-100 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
          Personalized estimate
        </span>
      </div>

      <form
        onSubmit={generatePlan}
        className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <label className="text-xs font-medium text-gray-600">
            Fitness goal
            <select
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              className={fieldClass}
            >
              {GOALS.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="text-xs font-medium text-gray-600">
            Workout duration
            <select
              value={duration}
              onChange={(event) => setDuration(Number(event.target.value))}
              className={fieldClass}
            >
              {DURATIONS.map((minutes) => (
                <option key={minutes} value={minutes}>{minutes} minutes</option>
              ))}
            </select>
          </label>

          <label className="text-xs font-medium text-gray-600">
            Difficulty
            <select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
              className={fieldClass}
            >
              {DIFFICULTIES.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-gray-500">
            Calories are estimates based on the saved profile weight and each exercise’s stored MET value.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating plan..." : plan ? "Regenerate plan" : "Generate workout plan"}
          </button>
        </div>
      </form>

      {error && (
        <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!plan && !loading && !error && (
        <div className="mt-4 rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center">
          <div className="mb-2 text-3xl" aria-hidden="true">🏃</div>
          <p className="text-sm font-medium text-gray-800">Your routine is one click away</p>
          <p className="mt-1 text-sm text-gray-500">Choose your preferences and generate a plan to see the exercises here.</p>
        </div>
      )}

      {plan && (
        <div className="mt-5 space-y-4">
          <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-green-700">{plan.goal || goal}</p>
                <h3 className="mt-1 text-xl font-semibold text-gray-900">
                  {plan.title || `${goal} · ${difficulty}`}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                  {plan.description || "Follow the exercises in order and adjust intensity to your comfort level."}
                </p>
              </div>
              <span className="w-fit shrink-0 rounded-lg border border-green-100 bg-white px-3 py-2 text-xs font-medium text-green-700">
                {plan.difficulty || difficulty}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white bg-white/90 p-3">
                <p className="text-xs text-gray-500">Total duration</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {plan.totalDurationMinutes ?? duration} <span className="text-sm font-normal text-gray-500">min</span>
                </p>
              </div>
              <div className="rounded-xl border border-white bg-white/90 p-3">
                <p className="text-xs text-gray-500">Estimated calories</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">{caloriesLabel}</p>
              </div>
              <div className="col-span-2 rounded-xl border border-white bg-white/90 p-3 sm:col-span-1">
                <p className="text-xs text-gray-500">Exercises</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">{planExercises.length}</p>
              </div>
            </div>
            {plan.weightUsedKg != null && (
              <p className="mt-3 text-xs text-gray-500">Estimate calculated using profile weight of {plan.weightUsedKg} kg.</p>
            )}
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-4 py-4 sm:px-5">
              <h3 className="font-semibold text-gray-900">Your workout sequence</h3>
              <p className="mt-1 text-xs text-gray-500">Complete the activities in the order shown.</p>
            </div>

            {planExercises.length > 0 ? (
              <ol className="divide-y divide-gray-100">
                {planExercises.map((exercise, index) => (
                  <li
                    key={`${exercise.exerciseId || exercise.name}-${exercise.role || "phase"}-${index}`} className="flex gap-3 p-4 sm:gap-4 sm:px-5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-sm font-semibold text-green-700">
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">{exercise.name || "Exercise"}</h4>
                          <p className="mt-0.5 text-xs text-gray-500">{exercise.role || exercise.type || "Activity"}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs">
                          {exercise.met != null && <span className="rounded-md bg-gray-50 px-2 py-1 text-gray-600">{exercise.met} MET</span>}
                          <span className="rounded-md bg-green-50 px-2 py-1 font-medium text-green-700">{exercise.durationMinutes ?? 0} min</span>
                          {exercise.estimatedCalories != null && <span className="rounded-md bg-orange-50 px-2 py-1 text-orange-700">~{exercise.estimatedCalories} kcal</span>}
                        </div>
                      </div>
                      {exercise.description && <p className="mt-2 text-xs leading-5 text-gray-500">{exercise.description}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="p-5 text-sm text-gray-500">The API returned a plan but no exercise list. Check the response shape in your backend.</p>
            )}
          </div>

          {plan.restGuidance && (
            <p className="rounded-xl border border-gray-200 bg-white p-4 text-sm leading-6 text-gray-600">
              <span className="font-medium text-gray-800">Rest guidance: </span>{plan.restGuidance}
            </p>
          )}
          {plan.note && <p className="text-xs leading-5 text-gray-500">{plan.note}</p>}
          <p className="text-xs leading-5 text-gray-400">Calorie values are estimates, not exact measurements. Stop if you feel pain, dizziness, or unusual discomfort.</p>
        </div>
      )}
    </div>
  );
};

export default CuratedWorkoutPlans;
