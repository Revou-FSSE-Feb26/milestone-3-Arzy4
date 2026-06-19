import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api.escuelajs.co/api/v1/products";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const response = await fetch(`${BASE_URL}/${params.id}`);

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch product" },
        { status: response.status }
      );
    }

    const product = await response.json();
    return NextResponse.json(product);
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const body = await request.json();

    const response = await fetch(`${BASE_URL}/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to update product" },
        { status: response.status }
      );
    }

    const updatedProduct = await response.json();
    return NextResponse.json(updatedProduct);
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const response = await fetch(`${BASE_URL}/${params.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to delete product" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}