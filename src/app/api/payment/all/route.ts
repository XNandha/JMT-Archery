import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Get all payments for admin
export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        order: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            items: {
              include: {
                product: {
                  select: {
                    id: true,
                    name: true,
                    price: true,
                    image: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      payments: payments.map(payment => ({
        ...payment,
        gatewayResponse: payment.gatewayResponse ? JSON.parse(payment.gatewayResponse) : null,
      })),
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data pembayaran" },
      { status: 500 }
    );
  }
} 