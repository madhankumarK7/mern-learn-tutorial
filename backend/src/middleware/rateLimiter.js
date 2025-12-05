const ratelimit = require('../config/upstash.js');

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key");
    if (!success) {
      return res.status(429).json({ message: "Rate limit exceeded" });
    }
    next();
  } catch (error) {
    console.error("Error in rate limiter:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

module.exports = rateLimiter;
