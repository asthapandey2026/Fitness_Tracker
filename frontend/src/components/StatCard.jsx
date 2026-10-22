const StatCard = ({
  title,
  value,
  unit,
  icon,
  goal,
  progress,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-4 py-4">

      {/* Top */}
      <div className="flex items-start justify-between gap-3">

        <div>
          <p className="text-xs text-gray-500">
            {title}
          </p>

          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-2xl font-semibold text-gray-900">
              {value}
            </span>

            <span className="text-xs text-gray-400">
              {unit}
            </span>
          </div>
        </div>

        <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
          {icon}
        </div>

      </div>

      {/* Goal */}
      {goal > 0 && (
        <div className="mt-4">

          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-gray-400">
              Daily goal
            </span>

            <span className="text-[11px] font-medium text-gray-600">
              {progress}%
            </span>
          </div>

          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <p className="text-[11px] text-gray-400 mt-1.5">
            {value} / {goal} {unit}
          </p>

        </div>
      )}

    </div>
  );
};

export default StatCard;