import express from "express";

import calculateBmi from "./calculateBmi.ts";

const app = express();
const PORT = 3003;

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  try {
    if (typeof height !== "string" || typeof weight !== "string") {
      throw new Error("Height and weight must be provided as query parameters.");
    }
    if (isNaN(Number(height)) || isNaN(Number(weight))) {
      throw new Error("Height and weight must be valid numbers.");
    }

    const heightNum = Number(height);
    const weightNum = Number(weight);

    const bmiResult = calculateBmi(heightNum, weightNum);
    res.json({ weight: weightNum, height: heightNum, bmi: bmiResult });
  } catch (error: unknown) {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

