import * as argon2 from "argon2";
import * as jose from "jose";
import { prisma } from "./prisma";
import { cookies } from "next/headers";
import { cache } from "react";

interface JWTPayload {
  userId: string;
  [key: string]: string | number | boolean | undefined;
}

export interface UserInput {
  email: string;
  password?: string;
  name: string;
}

const JWT_SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY as string
);
const JWT_EXPERATION = process.env.JWT_EXPERATION as string;
const JWT_ALGORITHM = process.env.JWT_ALGORITHM as string;

export async function hashPassword(password: string) {
  return await argon2.hash(password);
}

export async function verifyPassword(password: string, hash: string) {
  return await argon2.verify(hash, password);
}

export async function createUser(user: UserInput) {
  try {
    let hashedPassword;
    if (user.password) {
      hashedPassword = await hashPassword(user.password);
    }

    return prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
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

export async function createSession(userId: string) {
  try {
    const token = await generateJWT({ userId });
    if (!token) {
      throw new Error("Failed to generate JWT");
    }
    const cookieStore = await cookies();

    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    return true;
  } catch (error) {
    console.error("Error creating session:", error);
    return null;
  }
}

export const getSession = cache(async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) return null;

    const payload = await verifyJWT(token);
    if (!payload) return null;

    return { userId: payload.userId };
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
});

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}
