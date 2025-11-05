import IORedis, {Redis} from "ioredis";
import APP_CONFIG from "./APP_CONFIG";

const redis = new IORedis(APP_CONFIG.REDIS_URL);

redis.on("connect", () => {
  console.log("Redis connected successfully");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err.message);
});

const TTL = APP_CONFIG.REDIS_TTL;

export default { redis, TTL };
