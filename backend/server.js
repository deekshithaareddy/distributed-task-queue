import exp from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import "./worker/worker.js";
import taskRouter from "./routes/taskRoute.js";
import authRouter from "./routes/authRoute.js";

dotenv.config();

const app = exp();

connectDB();

app.use(cors());
app.use(exp.json());

app.use("/api/tasks", taskRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Task Queue API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
