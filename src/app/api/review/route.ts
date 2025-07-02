import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Get all reviews with user information
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");
  try {
    let reviews;
    if (productId) {
      reviews = await prisma.review.findMany({
        where: { productId: Number(productId) },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profilePicture: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } else {
      reviews = await prisma.review.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profilePicture: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    }
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data review" },
      { status: 500 }
    );
  }
}

// POST: Create a new review
export async function POST(req: NextRequest) {
  try {
    const { userId, rating, comment, image } = await req.json();

    // Validation
    if (!userId || !rating || !comment) {
      return NextResponse.json(
        { error: "User ID, rating, dan comment wajib diisi" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating harus antara 1-5" },
        { status: 400 }
      );
    }

    if (comment.trim().length < 10) {
      return NextResponse.json(
        { error: "Comment minimal 10 karakter" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        userId: Number(userId),
        rating: Number(rating),
        comment: comment.trim(),
        image: image || null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profilePicture: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      review,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Gagal membuat review" },
      { status: 500 }
    );
  }
} 