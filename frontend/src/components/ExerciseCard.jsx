const ExerciseCard = ({ exercise, onSelect }) => {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(exercise)}
      className="w-[210px] min-w-[210px] shrink-0 snap-start text-left bg-white border border-gray-200 rounded-xl p-4 hover:border-green-400 hover:shadow-sm transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="w-9 h-9 rounded-lg bg-green-50 text-green-700 flex items-center justify-center text-sm font-semibold">
          {exercise.name.charAt(0)}
        </div>

        <span className="text-[11px] text-gray-500 bg-gray-50 border border-gray-100 rounded-md px-2 py-1">
          {exercise.type}
        </span>
      </div>

      <h3 className="text-sm font-semibold text-gray-900 mt-4 truncate">
        {exercise.name}
      </h3>

      <p className="text-xs text-gray-500 mt-1 line-clamp-2 min-h-8">
        {exercise.description || "Explore this activity and its intensity."}
      </p>

      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">{exercise.met} MET</span>
        <span className="text-xs text-gray-500">
          {exercise.defaultDurationMinutes} min
        </span>
      </div>
    </button>
  );
};

export default ExerciseCard;
