"use server";

import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { createSession, createUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { success: false, message: "Authorization code is missing" },
        { status: 400 }
      );
    }

    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    const ticket = await oAuth2Client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return NextResponse.json(
        { success: false, message: "Failed to get user info" },
        { status: 400 }
      );
    }

    const { email, name, sub: googleId, picture } = payload;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email not provided by Google" },
        { status: 400 }
      );
    }

    let user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { googleId }],
      },
    });

    if (user) {
      if (!user.googleId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            googleId,
            picture,
          },
        });
      }
    } else {
      user = await createUser({
        email,
        name: name || email.split("@")[0],
        googleId,
        picture,
      });

      if (!user) {
        return NextResponse.json(
          { success: false, message: "Failed to create user" },
          { status: 500 }
        );
      }
    }

    await createSession(user.id);

    return NextResponse.json({
      success: true,
      message: "Google authentication successful",
    });
  } catch (error) {
    console.error("Google auth error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Authentication failed",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
