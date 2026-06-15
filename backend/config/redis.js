import dotenv from "dotenv";
import IORedis from "ioredis";

dotenv.config();

const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

export default connection;