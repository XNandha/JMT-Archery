import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Get latest 3 reviews for landing page
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      take: 3,
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error("Error fetching latest reviews:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data review terbaru" },
      { status: 500 }
    );
  }
} 