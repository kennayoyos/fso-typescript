import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => res.send("pong"));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

