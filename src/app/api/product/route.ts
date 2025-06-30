import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Check if database is connected
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL not configured");
      return NextResponse.json(
        { error: "Database not configured" }, 
        { status: 500 }
      );
    }

    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        image: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    console.log(`✅ Successfully fetched ${products.length} products`);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    
    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes('P1001') || error.message.includes('connect')) {
        return NextResponse.json(
          { error: "Database connection failed" }, 
          { status: 503 }
        );
      }
      if (error.message.includes('P2025') || error.message.includes('not found')) {
        return NextResponse.json(
          { error: "Products not found" }, 
          { status: 404 }
        );
      }
    }
    
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, price, stock, image, description } = data;

    // Validasi lebih ketat dan pastikan price, stock bertipe number
    if (
      typeof name !== "string" ||
      typeof price !== "number" ||
      typeof stock !== "number" ||
      typeof image !== "string" ||
      !name.trim() ||
      isNaN(price) ||
      isNaN(stock) ||
      price < 0 ||
      stock < 0 ||
      !image.trim()
    ) {
      return NextResponse.json(
        { error: "Field 'name', 'price', 'stock', dan 'image' wajib diisi dengan benar." },
        { status: 400 }
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        name: name.trim(),
        price,
        stock,
        image: image.trim(),
        description: description ? String(description) : "",
      },
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error("POST /api/product error:", error);
    
    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes('P1001') || error.message.includes('connect')) {
        return NextResponse.json(
          { error: "Database connection failed" }, 
          { status: 503 }
        );
      }
      if (error.message.includes('P2002') || error.message.includes('unique')) {
        return NextResponse.json(
          { error: "Product already exists" }, 
          { status: 409 }
        );
      }
    }
    
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}