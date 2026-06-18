import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.escuelajs.co/api/v1/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        avatar: "https://i.pravatar.cc/300",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Register failed" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Register successful", user: data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register route error:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}