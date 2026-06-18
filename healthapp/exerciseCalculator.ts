interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  exerciseHours: number[];
  target: number;
}

const calculateExercises = (exerciseHours: number[], target: number): Result => {
  // Edge cases
  if (exerciseHours.length === 0) throw new Error("No exercise hours provided");
  if (target <= 0) throw new Error("Target must be greater than 0");

  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((hours) => hours > 0).length;
  const average = exerciseHours.reduce((sum, hours) => sum + hours, 0) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average >= target * 0.5 ? 2 : 1;
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

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4)
    throw new Error("Invalid number of arguments. Please provide exercise hours and target.");

  const exerciseHours = args.slice(3).map((arg) => Number(arg));
  const target = Number(args[2]);

  if (exerciseHours.some((hours) => isNaN(hours)) || isNaN(target))
    throw new Error("Provided values are not valid numbers.");

  return { exerciseHours, target };
};

try {
  const { exerciseHours, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(exerciseHours, target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.error(errorMessage);
}

