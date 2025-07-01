import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: "ID produk tidak valid" }, { status: 400 });
    }
    const data = await req.json();
    const addStock = Number(data.addStock);
    if (!addStock || isNaN(addStock) || addStock < 1) {
      return NextResponse.json({ error: "Jumlah stok harus lebih dari 0" }, { status: 400 });
    }
    const product = await prisma.product.findUnique({ where: { id: Number(id) } });
    if (!product) {
      return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
    }
    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: { stock: product.stock + addStock },
    });
    return NextResponse.json({ success: true, stock: updated.stock });
  } catch (error) {
    console.error("POST /api/product/[id]/add-stock error:", error);
    return NextResponse.json({ error: "Gagal menambah stok" }, { status: 500 });
  }
} 