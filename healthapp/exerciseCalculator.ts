interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exerciseHours: number[], target: number): Result => {
  // Edge cases
  if (exerciseHours.length === 0) throw new Error("No exercise hours provided");
  if (target <= 0) throw new Error("Target must be greater than 0");

  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((hours) => hours > 0).length;
  const average = exerciseHours.reduce((sum, hours) => sum + hours, 0) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average >= target / 2 ? 2 : 1;
  const ratingDescription =
    rating === 1
      ? "You need to work harder"
      : rating === 2
        ? "Not too bad but could be better"
        : "Great job, you met your target!";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

