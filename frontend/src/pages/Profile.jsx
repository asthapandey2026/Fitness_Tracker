import { useEffect, useState } from "react";
import { EditOutlined, Person } from "@mui/icons-material";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    fitnessGoal: "Improve Fitness",
    dailyCalorieGoal: 500,
    dailyWorkoutGoal: 1,
    dailyDurationGoal: 30,
    activityLevel: "Moderately Active",
  });

  const [bmi, setBmi] = useState(0);
  const [bmiCategory, setBmiCategory] =
    useState("Not available");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get("/profile");

        const profile = response.data.profile;

        setFormData({
          height: profile.height || "",
          weight: profile.weight || "",
          fitnessGoal: profile.fitnessGoal,
          dailyCalorieGoal: profile.dailyCalorieGoal,
          dailyWorkoutGoal: profile.dailyWorkoutGoal,
          dailyDurationGoal: profile.dailyDurationGoal,
          activityLevel: profile.activityLevel,
        });

        setBmi(response.data.bmi);
        setBmiCategory(response.data.bmiCategory);
      } catch (error) {
        setError(
          error.response?.data?.message ||
          "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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

    try {
      setSaving(true);

      const response = await API.put(
        "/profile",
        formData
      );

      setMessage(response.data.message);

      // Refresh BMI after saving
      const profileResponse = await API.get("/profile");

      setBmi(profileResponse.data.bmi);
      setBmiCategory(
        profileResponse.data.bmiCategory
      );

      setFormData({
        height: profileResponse.data.profile.height || "",
        weight: profileResponse.data.profile.weight || "",
        fitnessGoal:
          profileResponse.data.profile.fitnessGoal,
        dailyCalorieGoal:
          profileResponse.data.profile.dailyCalorieGoal,
        dailyWorkoutGoal:
          profileResponse.data.profile.dailyWorkoutGoal,
        dailyDurationGoal:
          profileResponse.data.profile.dailyDurationGoal,
        activityLevel:
          profileResponse.data.profile.activityLevel,
      });

      setIsEditing(false);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f8f6] flex items-center justify-center">
        <p className="text-gray-500 text-sm">
          Loading profile...
        </p>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-[#f8f9f7]">
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-7">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">

        <div>
          <p className="text-xs font-medium text-green-600 uppercase tracking-wider mb-1">
            Your account
          </p>

          <h1 className="text-2xl font-semibold text-gray-900">
            Profile
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Your personal fitness information and targets.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => {
              setMessage("");
              setError("");
              setIsEditing(true);
            }}
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition"
          >
            <EditOutlined fontSize="small" />
            Edit Profile
          </button>
        )}

      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 px-3 py-2.5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
          {error}
        </div>
      )}

      {/* ================= VIEW MODE ================= */}
      {!isEditing && (
        <div className="space-y-4">

          {/* Account */}
          <section className="bg-white border border-gray-200 rounded-xl px-5 py-5">

            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-4">
              Account
            </p>

            <div className="flex items-center gap-3.5">

              <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <Person fontSize="small" />
              </div>

              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-gray-900">
                  {user?.name || "Fitness User"}
                </h2>

                <p className="text-xs text-gray-500 mt-0.5 truncate">
                  {user?.email || "No email available"}
                </p>
              </div>

            </div>
          </section>

          {/* Body Metrics */}
          <section className="bg-white border border-gray-200 rounded-xl px-5 py-5">

            <div className="mb-4">
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                Body metrics
              </p>

              <h2 className="text-base font-semibold text-gray-900 mt-1">
                Current stats
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">

              <div className="py-3 sm:py-1 sm:pr-6">
                <p className="text-xs text-gray-400">
                  Height
                </p>

                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {formData.height || "--"}
                  <span className="text-xs font-normal text-gray-400 ml-1">
                    cm
                  </span>
                </p>
              </div>

              <div className="py-3 sm:py-1 sm:px-6">
                <p className="text-xs text-gray-400">
                  Weight
                </p>

                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {formData.weight || "--"}
                  <span className="text-xs font-normal text-gray-400 ml-1">
                    kg
                  </span>
                </p>
              </div>

              <div className="py-3 sm:py-1 sm:pl-6">
                <p className="text-xs text-gray-400">
                  BMI
                </p>

                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-lg font-semibold text-gray-900">
                    {bmi > 0 ? bmi : "--"}
                  </p>

                  {bmi > 0 && (
                    <span className="text-xs font-medium text-green-600">
                      {bmiCategory}
                    </span>
                  )}
                </div>
              </div>

            </div>
          </section>

          {/* Fitness */}
          <section className="bg-white border border-gray-200 rounded-xl px-5 py-5">

            <div className="mb-4">
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                Fitness
              </p>

              <h2 className="text-base font-semibold text-gray-900 mt-1">
                Preferences
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div>
                <p className="text-xs text-gray-400">
                  Fitness goal
                </p>

                <p className="text-sm font-medium text-gray-900 mt-1">
                  {formData.fitnessGoal}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Activity level
                </p>

                <p className="text-sm font-medium text-gray-900 mt-1">
                  {formData.activityLevel}
                </p>
              </div>

            </div>
          </section>

          {/* Daily Targets */}
          <section className="bg-white border border-gray-200 rounded-xl px-5 py-5">

            <div className="mb-4">
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                Daily targets
              </p>

              <h2 className="text-base font-semibold text-gray-900 mt-1">
                Your goals
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <div className="border-l-2 border-green-500 pl-3">
                <p className="text-xs text-gray-400">
                  Calories
                </p>

                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {formData.dailyCalorieGoal}
                  <span className="text-xs font-normal text-gray-400 ml-1">
                    kcal
                  </span>
                </p>
              </div>

              <div className="border-l-2 border-green-500 pl-3">
                <p className="text-xs text-gray-400">
                  Workouts
                </p>

                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {formData.dailyWorkoutGoal}
                  <span className="text-xs font-normal text-gray-400 ml-1">
                    / day
                  </span>
                </p>
              </div>

              <div className="border-l-2 border-green-500 pl-3">
                <p className="text-xs text-gray-400">
                  Duration
                </p>

                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {formData.dailyDurationGoal}
                  <span className="text-xs font-normal text-gray-400 ml-1">
                    min
                  </span>
                </p>
              </div>

            </div>
          </section>

        </div>
      )}

      {/* ================= EDIT MODE ================= */}
      {isEditing && (
        <section className="bg-white border border-gray-200 rounded-xl px-5 py-5 sm:px-6">

          <div className="flex items-start justify-between gap-4 mb-6">

            <div>
              <p className="text-[11px] font-medium text-green-600 uppercase tracking-wider">
                Edit details
              </p>

              <h2 className="text-lg font-semibold text-gray-900 mt-1">
                Update your profile
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Keep your fitness information and targets up to date.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setMessage("");
                setError("");
              }}
              className="text-xs font-medium text-gray-500 hover:text-gray-900 transition"
            >
              Cancel
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Body Measurements */}
            <div>

              <p className="text-sm font-medium text-gray-900 mb-3">
                Body measurements
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Height
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      name="height"
                      min="0"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="e.g. 165"
                      className="w-full h-10 px-3 pr-10 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                      cm
                    </span>
                  </div>
                </div>

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
                      placeholder="e.g. 60"
                      className="w-full h-10 px-3 pr-10 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                      kg
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Fitness Preferences */}
            <div className="border-t border-gray-100 pt-5">

              <p className="text-sm font-medium text-gray-900 mb-3">
                Fitness preferences
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Fitness goal
                  </label>

                  <select
                    name="fitnessGoal"
                    value={formData.fitnessGoal}
                    onChange={handleChange}
                    className="w-full h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
                  >
                    <option value="Weight Loss">
                      Weight Loss
                    </option>

                    <option value="Muscle Gain">
                      Muscle Gain
                    </option>

                    <option value="Maintain Weight">
                      Maintain Weight
                    </option>

                    <option value="Improve Fitness">
                      Improve Fitness
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Activity level
                  </label>

                  <select
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleChange}
                    className="w-full h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
                  >
                    <option value="Sedentary">
                      Sedentary
                    </option>

                    <option value="Lightly Active">
                      Lightly Active
                    </option>

                    <option value="Moderately Active">
                      Moderately Active
                    </option>

                    <option value="Very Active">
                      Very Active
                    </option>
                  </select>
                </div>

              </div>
            </div>

            {/* Daily Targets */}
            <div className="border-t border-gray-100 pt-5">

              <p className="text-sm font-medium text-gray-900 mb-3">
                Daily targets
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Calories
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      name="dailyCalorieGoal"
                      min="0"
                      value={formData.dailyCalorieGoal}
                      onChange={handleChange}
                      className="w-full h-10 px-3 pr-12 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                      kcal
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Workouts
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      name="dailyWorkoutGoal"
                      min="1"
                      value={formData.dailyWorkoutGoal}
                      onChange={handleChange}
                      className="w-full h-10 px-3 pr-12 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                      / day
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Duration
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      name="dailyDurationGoal"
                      min="1"
                      value={formData.dailyDurationGoal}
                      onChange={handleChange}
                      className="w-full h-10 px-3 pr-10 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-green-500 transition"
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                      min
                    </span>
                  </div>
                </div>

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

            {/* Actions */}
            <div className="border-t border-gray-100 pt-5 flex justify-end gap-2">

              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setMessage("");
                  setError("");
                }}
                className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 rounded-lg transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-green-300 rounded-lg transition"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </form>
        </section>
      )}

    </main>
  </div>
);
};

export default Profile;