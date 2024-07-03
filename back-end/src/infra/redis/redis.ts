import { redisClient } from "../../config/redis.config";
import { generateJWTtoken } from "../../utils/jwt/generateToken";
import { getPayloadWithToken } from "../../utils/jwt/getPayloadwithToken";

export class RedisManagement {
  async storeVerficationToken(data: {
    email: string;
    password: string;
    name: string;
  }) {
    try {
      const token = generateJWTtoken(data.email);
      const fullPayloadToken = generateJWTtoken(data);

      const VERIFICATION_TOKEN_EXPIRY = 60 * 60 * 24 * 2; // 2 days in seconds
      await redisClient.setEx(
        `${process.env.REDIS_AUTH_GLOBAL_PREFIX as string}:${token}`,
        VERIFICATION_TOKEN_EXPIRY,
        fullPayloadToken
      );
      const verificationLink = `${process.env.CLIENT_ORIGIN}?vr=${token}`;
      return verificationLink;
    } catch (error) {
      console.log(`Error in redis insertion ${error}`);
    }
  }
  async getUserDetails(token: string) {
    try {
      const fullPayloadToken = await redisClient.get(
        `${process.env.REDIS_AUTH_GLOBAL_PREFIX as string}:${token}`
      );
      if (!fullPayloadToken) {
        return null;
      }
      const userDetail = getPayloadWithToken(fullPayloadToken);
      return userDetail;
    } catch (error) {
      console.log(`Error in redis reading ${error}`);
    }
  }
}
