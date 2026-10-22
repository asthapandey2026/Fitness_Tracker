import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import CuratedWorkoutPlans from "../components/CuratedWorkoutPlans";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showAllHistory, setShowAllHistory] = useState(false);

  const fetchWorkouts = async () => {
    try {
      const response = await API.get("/workouts");
      setWorkouts(response.data.workouts || []);
    } catch (error) {
      console.error("Fetch workouts error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this workout?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await API.delete(`/workouts/${id}`);
      setWorkouts((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout._id !== id)
      );
    } catch (error) {
      console.error("Delete workout error:", error);
      alert(error.response?.data?.message || "Failed to delete workout.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredWorkouts = workouts
    .filter((workout) => {
      const exerciseName = workout.exercise || "";
      const matchesExercise = exerciseName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesDate = selectedDate
        ? new Date(workout.workoutDate).toISOString().split("T")[0] ===
          selectedDate
        : true;

      return matchesExercise && matchesDate;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.workoutDate) - new Date(b.workoutDate);
        case "calories":
          return (b.caloriesBurned || 0) - (a.caloriesBurned || 0);
        case "duration":
          return (b.duration || 0) - (a.duration || 0);
        case "newest":
        default:
          return new Date(b.workoutDate) - new Date(a.workoutDate);
      }
    });

  const recentWorkouts = [...workouts]
    .sort((a, b) => new Date(b.workoutDate) - new Date(a.workoutDate))
    .slice(0, 8);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading workouts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9f7]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-7">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-green-600 uppercase tracking-wider mb-1">
                Activity
              </p>
              <h1 className="text-2xl font-semibold text-gray-900">
                Workout History
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Review your activity and discover exercises for your goals.
              </p>
            </div>

            <Link
              to="/add-workout"
              className="inline-flex items-center justify-center px-3.5 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition"
            >
              + Add Workout
            </Link>
          </div>
        </div>

        {/* Search and filters */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 mb-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_180px_180px_auto] gap-2.5">
            <div className="relative">
              <input
                type="text"
                placeholder="Search exercise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 px-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
                aria-label="Search workouts by exercise"
              />
            </div>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="h-9 px-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
              aria-label="Filter workouts by date"
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-9 px-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
              aria-label="Sort workouts"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="calories">Highest calories</option>
              <option value="duration">Longest duration</option>
            </select>

            {(searchTerm || selectedDate || sortBy !== "newest") && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDate("");
                  setSortBy("newest");
                }}
                className="h-9 px-3 text-sm font-medium text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Recent Workouts: same section switches between carousel and grid */}
        <section className="mb-10">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {showAllHistory ? "All Workouts" : "Recent Exercises"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {showAllHistory
                  ? "Your workout history. Use the filters above to narrow the results."
                  : searchTerm || selectedDate || sortBy !== "newest"
                    ? `${filteredWorkouts.length} matching workout${filteredWorkouts.length === 1 ? "" : "s"}`
                    : "Your latest recorded activities"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAllHistory((visible) => !visible)}
              aria-expanded={showAllHistory}
              className="self-start shrink-0 rounded-lg border border-green-200 bg-white px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-50 transition sm:self-auto"
            >
              {showAllHistory ? "Show recent ↑" : "View all →"}
            </button>
          </div>

          {filteredWorkouts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
              <div className="mb-3 text-3xl">
                {workouts.length === 0 ? "🏋️" : "🔎"}
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                {workouts.length === 0 ? "No workouts yet" : "No workouts found"}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {workouts.length === 0
                  ? "Start recording your workouts to track your progress."
                  : "Try changing your search, date, or sorting options."}
              </p>
              {workouts.length === 0 ? (
                <Link
                  to="/add-workout"
                  className="mt-4 inline-flex rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
                >
                  Add your first workout
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedDate("");
                    setSortBy("newest");
                  }}
                  className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="relative">
              <div
                className={
                  showAllHistory
                    ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    : "flex gap-3 overflow-x-auto hide-scrollbar pb-3 snap-x snap-mandatory"
                }
              >
                {(showAllHistory || searchTerm || selectedDate || sortBy !== "newest"
                  ? filteredWorkouts
                  : filteredWorkouts.slice(0, 8)
                ).map((workout) => (
                  <article
                    key={workout._id}
                    className={
                      showAllHistory
                        ? "min-w-0 rounded-xl border border-gray-200 bg-white px-4 py-4 transition hover:border-gray-300"
                        : "w-[220px] min-w-[220px] shrink-0 snap-start rounded-xl border border-gray-200 bg-white p-4"
                    }
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-base font-semibold text-gray-900">
                          {workout.exercise || "Exercise"}
                        </h3>
                        <p className="mt-1 text-xs text-gray-400">
                          {new Date(workout.workoutDate).toLocaleDateString(
                            "en-IN",
                            { day: "numeric", month: "short", year: "numeric" }
                          )}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-md bg-green-50 px-2 py-1 text-[11px] text-green-700">
                        Completed
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-6">
                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-gray-400">Sets</p>
                        <p className="mt-0.5 text-sm font-medium text-gray-800">{workout.sets}</p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-gray-400">Reps</p>
                        <p className="mt-0.5 text-sm font-medium text-gray-800">{workout.reps}</p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-gray-400">Weight</p>
                        <p className="mt-0.5 text-sm font-medium text-gray-800">{workout.weight ?? 0} kg</p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                      <div>
                        <span className="text-xs text-gray-400">Duration</span>
                        <span className="ml-2 text-xs font-medium text-gray-700">{workout.duration} min</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-400">Calories</span>
                        <span className="ml-2 text-xs font-medium text-gray-700">{workout.caloriesBurned} kcal</span>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                      <Link
                        to={`/edit-workout/${workout._id}`}
                        className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(workout._id)}
                        disabled={deletingId === workout._id}
                        className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50 disabled:text-red-300"
                      >
                        {deletingId === workout._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {!showAllHistory &&
                !searchTerm &&
                !selectedDate &&
                sortBy === "newest" &&
                filteredWorkouts.length > 1 && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 top-0 bottom-3 w-10 bg-gradient-to-l from-[#f8f9f7] via-[#f8f9f7]/70 to-transparent"
                  />
                )}
            </div>
          )}
        </section>

        {/* Curated Workout Plans: replaces only the Exercise Library section */}
        <section className="border-t border-gray-200 pt-8">
          <CuratedWorkoutPlans />
        </section>

      </main>
    </div>
  );
};

export default Workouts;
