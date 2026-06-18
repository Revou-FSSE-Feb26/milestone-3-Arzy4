import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products", {
      cache: "no-store",
    });

    const products = await response.json();

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET products error:", error);

    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, category, price, image, description } = body;

    if (!title || !category || !image || !description || Number(price) <= 0) {
      return NextResponse.json(
        { message: "Invalid product data" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.escuelajs.co/api/v1/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price: Number(price),
        description,
        categoryId: Number(category),
        images: [image],
      }),
    });

    const createdProduct = await response.json();

    return NextResponse.json(createdProduct, {
      status: 201,
    });
  } catch (error) {
    console.error("POST product error:", error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}