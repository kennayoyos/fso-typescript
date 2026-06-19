import express from "express";

import { calculateBmi } from "./calculateBmi.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/hello", (_req, res) => res.status(200).send("Hello Full Stack!"));

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  try {
    if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight)))
      res.status(400).json({ error: "malformatted parameters" });

    const heightNum = Number(height);
    const weightNum = Number(weight);

    const bmiResult = calculateBmi(heightNum, weightNum);
    res.json({ weight: weightNum, height: heightNum, bmi: bmiResult });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!target || !daily_exercises || !Array.isArray(daily_exercises))
    res.status(400).send({ error: "parameters missing" });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  if (isNaN(Number(target)) || daily_exercises.some((ex: number) => isNaN(Number(ex))))
    res.status(400).send({ error: "malformatted parameters" });

  try {
    const result = calculateExercises(daily_exercises as number[], Number(target));

    res.send(result);
  } catch (error: unknown) {
    if (error instanceof Error) res.status(400).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

