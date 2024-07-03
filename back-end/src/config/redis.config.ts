import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_CLIENT_ORIGIN as string,
});

redisClient.on("error", (err) => console.log(`Redis client error => ${err}`));

export const connectRedis = async () => {
  await redisClient.connect();
};
