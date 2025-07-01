import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";

export const dynamic = "force-dynamic"; // agar Next.js tidak cache respons

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Tidak ada file yang diunggah" }, { status: 400 });
    }

    // Batasi ukuran file (misal 2MB)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: "Ukuran file maksimal 2MB" }, { status: 400 });
    }

    // Batasi ekstensi yang diizinkan
    const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!allowedExtensions.includes(ext)) {
      return NextResponse.json({ error: "Ekstensi gambar tidak didukung" }, { status: 400 });
    }

    // Convert File ke Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload ke Cloudinary
    const result = await uploadImage(buffer, "jmt-archery") as any;
    if (!result || !result.url) {
      return NextResponse.json({ error: "Upload ke Cloudinary gagal" }, { status: 500 });
    }

    // Pastikan url selalu https
    let imageUrl = result.url;
    if (imageUrl && imageUrl.startsWith('http://')) {
      imageUrl = imageUrl.replace('http://', 'https://');
    }

    // Return url Cloudinary ke frontend
    return NextResponse.json({ url: imageUrl });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Upload gambar gagal" }, { status: 500 });
  }
}