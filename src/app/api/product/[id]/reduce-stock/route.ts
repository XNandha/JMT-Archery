import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { quantity } = await req.json();
    const { id } = await params;
    const productId = Number(id);
    
    if (!productId || typeof quantity !== "number" || quantity <= 0) {
      return NextResponse.json({ error: "Invalid" }, { status: 400 });
    }

    // Kurangi stok, pastikan tidak minus
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product || product.stock < quantity) {
      return NextResponse.json({ error: "Stok tidak cukup" }, { status: 400 });
    }
    const updated = await prisma.product.update({
      where: { id: productId },
      data: { stock: { decrement: quantity } },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("POST /api/product/[id]/reduce-stock error:", error);
    return NextResponse.json({ error: "Gagal mengurangi stok" }, { status: 500 });
  }
}