import { Worker } from "bullmq";
import connection from "../config/redis.js";
import { taskModel } from "../models/taskModel.js";
import connectDB from "../config/db.js";

await connectDB();

new Worker(
  "tasks",
  async (job) => {
    const { taskId } = job.data;

    try {
      console.log("Processing:", taskId);

      await taskModel.findByIdAndUpdate(taskId, {
        status: "processing",
        startedAt: new Date(),
      });

      await new Promise((resolve) =>
        setTimeout(resolve, 5000)
      );

      await taskModel.findByIdAndUpdate(taskId, {
        status: "completed",
        completedAt: new Date(),
        result: "Task completed successfully",
      });

      console.log("Completed:", taskId);
    } catch (error) {
      console.error("Worker Error:", error);

      await taskModel.findByIdAndUpdate(taskId, {
        status: "failed",
        failedReason: error.message,
      });
    }
  },
  {
    connection,
  }
);

console.log("Worker started...");