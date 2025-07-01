import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    const addStock = Number(data.addStock);
    const productId = Number(id);
    if (!productId || isNaN(addStock) || addStock < 1) {
      return NextResponse.json({ error: "ID produk/addStock tidak valid" }, { status: 400 });
    }
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
    }
    const updated = await prisma.product.update({
      where: { id: productId },
      data: { stock: product.stock + addStock },
    });
    return NextResponse.json({ success: true, stock: updated.stock });
  } catch (error) {
    console.error("POST /api/product/[id]/add-stock error:", error);
    return NextResponse.json({ error: "Gagal menambah stok" }, { status: 500 });
  }
} 