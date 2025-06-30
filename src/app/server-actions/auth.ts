"use server";

import { ActionResponse } from "@/lib/types";
import { UserRegistrationSchema, UserLoginSchema } from "@/lib/schemas/user";
import { prisma } from "@/lib/prisma";
import {
  createUser,
  verifyPassword,
  createSession,
  deleteSession,
} from "@/lib/auth";

export async function register(formData: FormData): Promise<ActionResponse> {
  try {
    const data = Object.fromEntries(formData.entries());
    const parsed = UserRegistrationSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }
    const { username, email, password } = parsed.data;
    const user = await createUser({ email, password, name: username });
    if (!user) {
      return {
        success: false,
        message: "User creation failed",
        error: "User already exists or DB error",
      };
    }
    await createSession(user.id);
    return {
      success: true,
      message: "Registration successful",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "Registration failed",
      error: "An unexpected error occurred",
    };
  }
}

export async function login(formData: FormData): Promise<ActionResponse> {
  try {
    const data = Object.fromEntries(formData.entries());
    const parsed = UserLoginSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }
    const { email, password } = parsed.data;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return {
        success: false,
        message: "Invalid credentials",
        error: "User not found",
      };
    }

    if (user.password) {
      const valid = await verifyPassword(password, user.password);
      if (!valid) {
        return {
          success: false,
          message: "Invalid credentials",
          error: "Incorrect password",
        };
      }
    }

    await createSession(user.id);
    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Login failed",
      error: "An unexpected error occurred",
    };
  }
}

export async function logout(): Promise<void> {
  await deleteSession();
}
