import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export function signJWT(payload: any) {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64");

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64"
  );

  const jwtSecret = process.env.JWT_SECRET || "binhbinh";

  const signature = crypto
    .createHmac("sha256", jwtSecret)
    .update(encodedHeader + "." + encodedPayload)
    .digest("base64");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// console.log(signJWT({ username: "Tom", _id: "user_123" }));
// console.log(signJWT({ username: "Tom ", _id: "user_123" }));
