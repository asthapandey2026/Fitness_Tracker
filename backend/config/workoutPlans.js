const ALLOWED_DURATIONS = [15, 30, 45, 60];
const ALLOWED_DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];
const ALLOWED_GOALS = ["Weight Loss", "Muscle Gain", "Maintain Weight", "Improve Fitness"];

/*
 * Curated starter templates. MET values are intentionally not hard-coded here:
 * they are read from the matching Exercise document in MongoDB.
 * Phase weights determine how the selected total active time is allocated.
 */
const TEMPLATES = {
  "Improve Fitness": {
    Beginner: { title: "Total Fitness · Beginner", description: "A gentle mix of movement, basic strength, and mobility.", phases: [
      { exerciseName: "Walking", role: "Warm-up", weight: 5 },
      { exerciseName: "Bodyweight Training", role: "Strength basics", weight: 8 },
      { exerciseName: "Moderate Circuit Training", role: "Full-body conditioning", weight: 7 },
      { exerciseName: "Hatha Yoga", role: "Mobility and breathing", weight: 5 },
      { exerciseName: "Walking", role: "Cool-down", weight: 5 },
    ]},
    Intermediate: { title: "Total Fitness · Intermediate", description: "A balanced session combining cardio, resistance, and mobility.", phases: [
      { exerciseName: "Brisk Walking", role: "Warm-up", weight: 5 },
      { exerciseName: "Resistance Training", role: "Strength", weight: 8 },
      { exerciseName: "Moderate Circuit Training", role: "Conditioning", weight: 7 },
      { exerciseName: "Power Yoga", role: "Mobility", weight: 5 },
      { exerciseName: "Walking", role: "Cool-down", weight: 5 },
    ]},
    Advanced: { title: "Total Fitness · Advanced", description: "A more demanding mix of conditioning, strength, and mobility.", phases: [
      { exerciseName: "Brisk Walking", role: "Warm-up", weight: 4 },
      { exerciseName: "Resistance Training", role: "Strength", weight: 8 },
      { exerciseName: "HIIT", role: "Interval conditioning", weight: 8 },
      { exerciseName: "Power Yoga", role: "Mobility", weight: 4 },
      { exerciseName: "Walking", role: "Cool-down", weight: 6 },
    ]},
  },
  "Weight Loss": {
    Beginner: { title: "Cardio & Energy · Beginner", description: "Manageable cardio with a gradual warm-up and cool-down.", phases: [
      { exerciseName: "Walking", role: "Warm-up", weight: 5 },
      { exerciseName: "Brisk Walking", role: "Steady cardio", weight: 8 },
      { exerciseName: "Cycling - Easy Pace", role: "Low-impact cardio", weight: 7 },
      { exerciseName: "Hatha Yoga", role: "Mobility", weight: 4 },
      { exerciseName: "Walking", role: "Cool-down", weight: 6 },
    ]},
    Intermediate: { title: "Cardio & Energy · Intermediate", description: "Moderate cardio with a short conditioning block.", phases: [
      { exerciseName: "Walking", role: "Warm-up", weight: 4 },
      { exerciseName: "Brisk Walking", role: "Steady cardio", weight: 8 },
      { exerciseName: "Cycling", role: "Cardio endurance", weight: 8 },
      { exerciseName: "Moderate Circuit Training", role: "Conditioning", weight: 5 },
      { exerciseName: "Walking", role: "Cool-down", weight: 5 },
    ]},
    Advanced: { title: "Cardio & Energy · Advanced", description: "Higher-effort cardio; reduce intensity if form or breathing suffers.", phases: [
      { exerciseName: "Brisk Walking", role: "Warm-up", weight: 4 },
      { exerciseName: "Cycling", role: "Cardio endurance", weight: 8 },
      { exerciseName: "HIIT", role: "Interval conditioning", weight: 8 },
      { exerciseName: "Moderate Circuit Training", role: "Conditioning", weight: 5 },
      { exerciseName: "Walking", role: "Cool-down", weight: 5 },
    ]},
  },
  "Muscle Gain": {
    Beginner: { title: "Strength Builder · Beginner", description: "Basic full-body strength with manageable transitions.", phases: [
      { exerciseName: "Walking", role: "Warm-up", weight: 5 },
      { exerciseName: "Bodyweight Training", role: "Movement practice", weight: 7 },
      { exerciseName: "Squats", role: "Lower-body strength", weight: 7 },
      { exerciseName: "Push-ups", role: "Upper-body strength", weight: 6 },
      { exerciseName: "Walking", role: "Cool-down", weight: 5 },
    ]},
    Intermediate: { title: "Strength Builder · Intermediate", description: "A full-body strength session with multiple resistance movements.", phases: [
      { exerciseName: "Walking", role: "Warm-up", weight: 4 },
      { exerciseName: "Resistance Training", role: "Strength", weight: 8 },
      { exerciseName: "Squats", role: "Lower-body strength", weight: 7 },
      { exerciseName: "Push-ups", role: "Upper-body strength", weight: 6 },
      { exerciseName: "Walking", role: "Cool-down", weight: 5 },
    ]},
    Advanced: { title: "Strength Builder · Advanced", description: "A more challenging resistance session; prioritize safe technique.", phases: [
      { exerciseName: "Brisk Walking", role: "Warm-up", weight: 4 },
      { exerciseName: "Resistance Training", role: "Strength", weight: 8 },
      { exerciseName: "Squats", role: "Lower-body strength", weight: 7 },
      { exerciseName: "Deadlifts", role: "Posterior-chain strength", weight: 7 },
      { exerciseName: "Walking", role: "Cool-down", weight: 4 },
    ]},
  },
  "Maintain Weight": {
    Beginner: { title: "Balanced Movement · Beginner", description: "Easy cardio, bodyweight movement, and mobility.", phases: [
      { exerciseName: "Walking", role: "Warm-up", weight: 5 },
      { exerciseName: "Cycling - Easy Pace", role: "Easy cardio", weight: 7 },
      { exerciseName: "Bodyweight Training", role: "Strength basics", weight: 7 },
      { exerciseName: "Hatha Yoga", role: "Mobility", weight: 5 },
      { exerciseName: "Walking", role: "Cool-down", weight: 5 },
    ]},
    Intermediate: { title: "Balanced Movement · Intermediate", description: "Moderate cardio, strength, and flexibility.", phases: [
      { exerciseName: "Walking", role: "Warm-up", weight: 4 },
      { exerciseName: "Cycling", role: "Cardio", weight: 8 },
      { exerciseName: "Bodyweight Training", role: "Strength", weight: 7 },
      { exerciseName: "Power Yoga", role: "Mobility", weight: 6 },
      { exerciseName: "Walking", role: "Cool-down", weight: 4 },
    ]},
    Advanced: { title: "Balanced Movement · Advanced", description: "Cardio endurance, conditioning, and mobility.", phases: [
      { exerciseName: "Brisk Walking", role: "Warm-up", weight: 4 },
      { exerciseName: "Cycling", role: "Cardio endurance", weight: 8 },
      { exerciseName: "Moderate Circuit Training", role: "Conditioning", weight: 8 },
      { exerciseName: "Power Yoga", role: "Mobility", weight: 5 },
      { exerciseName: "Walking", role: "Cool-down", weight: 4 },
    ]},
  },
};

function allocateMinutes(phases, totalMinutes) {
  const minPerPhase = 2;
  if (totalMinutes < phases.length * minPerPhase) throw new Error("Duration too short for this plan.");
  const remaining = totalMinutes - phases.length * minPerPhase;
  const weightTotal = phases.reduce((sum, phase) => sum + phase.weight, 0);
  const shares = phases.map((phase, index) => {
    const raw = remaining * phase.weight / weightTotal;
    return { index, whole: Math.floor(raw), fraction: raw - Math.floor(raw) };
  });
  let leftover = remaining - shares.reduce((sum, share) => sum + share.whole, 0);
  shares.slice().sort((a, b) => b.fraction - a.fraction || a.index - b.index)
    .slice(0, leftover).forEach((share) => { shares[share.index].whole += 1; });
  return phases.map((phase, index) => ({ ...phase, durationMinutes: minPerPhase + shares[index].whole }));
}

function calculateEstimatedCalories(met, weightKg, durationMinutes) {
  if (!Number.isFinite(weightKg) || weightKg <= 0 || !Number.isFinite(met) || met <= 0) return null;
  return Math.round((met * 3.5 * weightKg * durationMinutes) / 200);
}

function buildWorkoutPlan({ goal, duration, difficulty, exercises, weightKg }) {
  const template = TEMPLATES[goal]?.[difficulty];
  if (!template) return null;
  const exerciseByName = new Map(exercises.map((exercise) => [exercise.name, exercise]));
  const phases = allocateMinutes(template.phases, duration);
  const planExercises = phases.map((phase, index) => {
    const exercise = exerciseByName.get(phase.exerciseName);
    if (!exercise) throw new Error(`Required exercise "${phase.exerciseName}" is missing from the Exercise collection.`);
    const estimatedCalories = calculateEstimatedCalories(Number(exercise.met), weightKg, phase.durationMinutes);
    return {
      order: index + 1,
      exerciseId: exercise._id,
      name: exercise.name,
      role: phase.role,
      type: exercise.type,
      met: exercise.met,
      durationMinutes: phase.durationMinutes,
      estimatedCalories,
      caloriesLabel: estimatedCalories === null ? "Add weight to estimate" : "Estimated kcal",
      description: exercise.description,
      isCustom: Boolean(exercise.isCustom),
    };
  });
  const caloriesAvailable = planExercises.every((item) => Number.isFinite(item.estimatedCalories));
  return {
    goal,
    difficulty,
    title: template.title,
    description: template.description,
    totalDurationMinutes: planExercises.reduce((sum, item) => sum + item.durationMinutes, 0),
    estimatedCalories: caloriesAvailable ? planExercises.reduce((sum, item) => sum + item.estimatedCalories, 0) : null,
    caloriesLabel: "Estimated active calories",
    weightUsedKg: Number.isFinite(weightKg) && weightKg > 0 ? weightKg : null,
    exercises: planExercises,
    restGuidance: "Rest briefly between strength sets as needed. Rest time is not included in active exercise minutes or calorie estimates.",
    note: "Calories are estimates, not measurements. MET values come from the stored activity record and are not changed by plan duration or difficulty.",
  };
}

module.exports = { ALLOWED_DURATIONS, ALLOWED_DIFFICULTIES, ALLOWED_GOALS, TEMPLATES, allocateMinutes, calculateEstimatedCalories, buildWorkoutPlan };
