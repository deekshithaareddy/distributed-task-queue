import dotenv from "dotenv";
import connection from "./config/redis.js";

dotenv.config();

await connection.set("hello", "world");

const value = await connection.get("hello");

console.log(value);

process.exit(0);