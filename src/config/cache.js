import IORedis, {Redis} from "ioredis";
import APP_CONFIG from "./APP_CONFIG";

//Setup redis as an instance

const redis = IORedis(APP_CONFIG.REDIS_URL)
const TTL = APP_CONFIG.REDIS_TTL


export default {redis, TTL};