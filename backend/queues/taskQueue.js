import { Queue } from "bullmq";
import connection from "../config/redis.js";

export const taskQueue = new Queue("tasks", {
  connection,
});