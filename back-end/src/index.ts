import { connectRedis } from "./config/redis.config";
import app from "./presentation/app";
(() => {
  connectRedis().then(() => {
    console.log(`Redis connected`);
  });
})();
app;
