import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Login failed" },
        { status: response.status }
      );
    }

    const profileResponse = await fetch("https://api.escuelajs.co/api/v1/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    );

    const profile = await profileResponse.json();

    if (!profileResponse.ok) {
      return NextResponse.json(
        { message: profile.message || "Failed to fetch profile" },
        { status: profileResponse.status }
      );
    }

    const loginResponse = NextResponse.json({
      message: "Login successful",
      email: profile.email,
    });

    loginResponse.cookies.set("token", data.access_token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });

    return loginResponse;
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}