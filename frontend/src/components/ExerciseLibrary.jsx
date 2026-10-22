import { useEffect, useState } from "react";
import API from "../services/api";
import ExerciseCard from "./ExerciseCard";

const categories = [
    "Weight Loss",
    "Muscle Gain",
    "Maintain Weight",
    "Improve Fitness",
];

const ExerciseLibrary = ({ onSelectExercise }) => {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchExercises = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await API.get("/exercises");
            setExercises(response.data.exercises || []);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to load exercises. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExercises();
    }, []);

    if (loading) {
        return (
            <div className="py-10 text-center text-sm text-gray-500">
                Loading exercise library...
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-700">{error}</p>
                <button
                    type="button"
                    onClick={fetchExercises}
                    className="mt-2 text-sm font-medium text-red-700 underline"
                >
                    Try again
                </button>
            </div>
        );
    }

    return (
        <section className="space-y-9">
            <div>
                <p className="text-xs font-medium uppercase tracking-wider text-green-600">
                    Find your next move
                </p>
                <h2 className="mt-1 text-xl font-semibold text-gray-900">
                    Exercise Library
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Explore activities grouped by your fitness goals.
                </p>
            </div>

            {categories.map((category) => {
                const categoryExercises = exercises.filter((exercise) =>
                    exercise.categories?.includes(category)
                );

                if (categoryExercises.length === 0) return null;

                return (
                    <section key={category} className="min-w-0">
                        <div className="mb-3 flex items-end justify-between gap-3">
                            <div>
                                <h3 className="text-base font-semibold text-gray-900">
                                    {category}
                                </h3>
                                <p className="mt-1 text-xs text-gray-500">
                                    {categoryExercises.length} exercises
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-3 snap-x snap-mandatory">
                                {categoryExercises.map((exercise) => (
                                    <ExerciseCard
                                        key={exercise._id}
                                        exercise={exercise}
                                        onSelect={onSelectExercise}
                                    />
                                ))}
                            </div>

                            {categoryExercises.length > 1 && (
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute right-0 top-0 bottom-3 w-10 bg-gradient-to-l from-[#f8f9f7] via-[#f8f9f7]/75 to-transparent"
                                />
                            )}
                        </div>
                    </section>
                );
            })}
        </section>
    );
};

export default ExerciseLibrary;
