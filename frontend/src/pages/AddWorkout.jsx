import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AddWorkout = () => {
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

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

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
      setLoading(true);

      await API.post("/workouts", formData);

      setMessage("Workout added successfully!");

      setFormData({
        exercise: "",
        sets: "",
        reps: "",
        weight: "",
        duration: "",
        caloriesBurned: "",
        workoutDate: "",
      });

      setTimeout(() => {
        navigate("/workouts");
      }, 1000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to add workout."
      );
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen bg-[#f8f9f7]">
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-7">

      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-medium text-green-600 uppercase tracking-wider mb-1">
          Activity
        </p>

        <h1 className="text-2xl font-semibold text-gray-900">
          Add Workout
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Record your workout to keep your activity history up to date.
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
              placeholder="e.g. Squats"
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
                placeholder="3"
                value={formData.sets}
                onChange={handleChange}
                className="w-full h-10 px-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
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
                placeholder="12"
                value={formData.reps}
                onChange={handleChange}
                className="w-full h-10 px-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
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
                  placeholder="40"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full h-10 px-3 pr-10 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
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
                  placeholder="30"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full h-10 px-3 pr-12 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
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
                  placeholder="200"
                  value={formData.caloriesBurned}
                  onChange={handleChange}
                  className="w-full h-10 px-3 pr-12 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
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

          {/* Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-green-300 rounded-lg transition"
            >
              {loading ? "Adding..." : "Add Workout"}
            </button>
          </div>

        </form>
      </div>
    </main>
  </div>
);
};
export default AddWorkout;