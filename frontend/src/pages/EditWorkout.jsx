import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

const EditWorkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    exercise: "",
    sets: "",
    reps: "",
    weight: "",
    duration: "",
    caloriesBurned: "",
    workoutDate: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch workout
  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await API.get("/workouts");

        const workout = response.data.workouts.find(
          (item) => item._id === id
        );

        if (!workout) {
          setError("Workout not found.");
          return;
        }

        setFormData({
          exercise: workout.exercise,
          sets: workout.sets,
          reps: workout.reps,
          weight: workout.weight,
          duration: workout.duration,
          caloriesBurned: workout.caloriesBurned,
          workoutDate: workout.workoutDate
            ? workout.workoutDate.split("T")[0]
            : "",
        });
      } catch (error) {
        setError(
          error.response?.data?.message ||
          "Failed to load workout."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (
      !formData.exercise ||
      !formData.sets ||
      !formData.reps ||
      !formData.duration
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setSaving(true);

      await API.put(`/workouts/${id}`, formData);

      setMessage("Workout updated successfully! 🎉");

      setTimeout(() => {
        navigate("/workouts");
      }, 1000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to update workout."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-lg">
          Loading workout...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9f7]">
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-7">

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-medium text-green-600 uppercase tracking-wider mb-1">
            Activity
          </p>

          <h1 className="text-2xl font-semibold text-gray-900">
            Edit Workout
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Update the details of your recorded workout.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Exercise */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Exercise <span className="text-green-600">*</span>
              </label>

              <input
                type="text"
                name="exercise"
                value={formData.exercise}
                onChange={handleChange}
                className="w-full h-10 px-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
              />
            </div>

            {/* Sets + Reps */}
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Sets <span className="text-green-600">*</span>
                </label>

                <input
                  type="number"
                  name="sets"
                  min="1"
                  value={formData.sets}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Reps <span className="text-green-600">*</span>
                </label>

                <input
                  type="number"
                  name="reps"
                  min="1"
                  value={formData.reps}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
                />
              </div>

            </div>

            {/* Weight + Duration */}
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Weight
                </label>

                <div className="relative">
                  <input
                    type="number"
                    name="weight"
                    min="0"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full h-10 px-3 pr-10 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
                  />

                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                    kg
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Duration <span className="text-green-600">*</span>
                </label>

                <div className="relative">
                  <input
                    type="number"
                    name="duration"
                    min="1"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full h-10 px-3 pr-12 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
                  />

                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                    min
                  </span>
                </div>
              </div>

            </div>

            {/* Calories + Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Calories Burned
                </label>

                <div className="relative">
                  <input
                    type="number"
                    name="caloriesBurned"
                    min="0"
                    value={formData.caloriesBurned}
                    onChange={handleChange}
                    className="w-full h-10 px-3 pr-12 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
                  />

                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                    kcal
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Workout Date
                </label>

                <input
                  type="date"
                  name="workoutDate"
                  value={formData.workoutDate}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
                />
              </div>

            </div>

            {/* Messages */}
            {error && (
              <div className="px-3 py-2.5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
                {error}
              </div>
            )}

            {message && (
              <div className="px-3 py-2.5 text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg">
                {message}
              </div>
            )}

            {/* Divider */}
            <div className="pt-1 border-t border-gray-100" />

            {/* Actions */}
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => navigate("/workouts")}
                className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 rounded-lg transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-green-300 rounded-lg transition"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
};

export default EditWorkout;