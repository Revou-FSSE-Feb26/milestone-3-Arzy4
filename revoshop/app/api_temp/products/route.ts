import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      price,
      description,
      categoryId,
      images,
    } = body;

    if (
      !title ||
      !description ||
      !images?.length ||
      !categoryId ||
      Number(price) <= 0
    ) {
      return NextResponse.json(
        { message: "Invalid product data" },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://api.escuelajs.co/api/v1/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price: Number(price),
          description,
          categoryId: Number(categoryId),
          images,
        }),
      }
    );

    const createdProduct = await response.json();

    return NextResponse.json(
      createdProduct,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST product error:", error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}