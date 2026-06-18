interface BMIValues {
  height: number;
  weight: number;
}

const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0) throw new Error("Height and weight must be positive numbers.");
  if (height < 10) throw new Error("Height must be in centimeters");

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 16.0) return "Underweight (Severe thinness)";
  else if (bmi < 17.0) return "Underweight (Moderate thinness)";
  else if (bmi < 18.5) return "Underweight (Mild thinness)";
  else if (bmi < 25.0) return "Normal range";
  else if (bmi < 30.0) return "Overweight (Pre-obese)";
  else if (bmi < 35.0) return "Obese (Class I)";
  else if (bmi < 40.0) return "Obese (Class II)";
  else return "Obese (Class III)";
};

const parseBMIArguments = (args: string[]): BMIValues => {
  if (args.length !== 4) {
    throw new Error("Invalid number of arguments. Please provide height and weight.");
  }

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) throw new Error("Provided values are not valid numbers.");

  return { height, weight };
};

try {
  const { height, weight } = parseBMIArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.error(errorMessage);
}

