import * as jose from "jose";

const JWT_SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY as string
);
const JWT_EXPERATION = process.env.JWT_EXPERATION as string;
const JWT_ALGORITHM = process.env.JWT_ALGORITHM as string;

interface JWTPayload {
  userId: string;
  [key: string]: string | number | boolean | undefined;
}

export async function generateJWT(payload: JWTPayload) {
  try {
    const jwt = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPERATION)
      .sign(JWT_SECRET_KEY);
    return jwt;
  } catch (error) {
    console.error("Error generating JWT:", error);
    return null;
  }
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET_KEY, {
      algorithms: [JWT_ALGORITHM],
    });
    return payload as JWTPayload;
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return null;
  }
}
