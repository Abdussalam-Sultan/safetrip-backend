// src/config/cache.js
import IORedis from "ioredis";
import config from "./index.js";

// ✅ Create Redis instance properly
const redis = new IORedis(config.REDIS_URL);

// ✅ Add helpful connection logs
redis.on("connect", () => {
  console.log("✅ Redis connected successfully");
});

redis.on("error", (err) => {
  console.error("❌ Redis connection error:", err.message);
});

const TTL = config.REDIS_TTL;

// ✅ Export the actual instance and value correctly
export default { redis, TTL };



// import IORedis from "ioredis";
// import config from "./index.js"


// //setup redis as an instance
 
// const redis = new IORedis(config.REDIS_URL);
// const TTL =  config.REDIS_TTL

// export default{redis, TTL};