// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis"; 

const Redis = require("@upstash/redis").Redis;
const { Ratelimit } = require("@upstash/ratelimit");
const dotenv = require('dotenv');
dotenv.config();

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "20 s"),
});

module.exports = ratelimit;
