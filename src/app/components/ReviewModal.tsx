import React, { useState } from "react";

interface ReviewModalProps {
  onClose: () => void;
  onSuccess: () => void;
  productId: number | null;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ onClose, onSuccess, productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const userId = typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;
      if (!userId) {
        setError("Anda harus login untuk memberikan review.");
        setSubmitting(false);
        return;
      }
      if (rating < 1 || rating > 5) {
        setError("Rating harus 1-5 bintang.");
        setSubmitting(false);
        return;
      }
      if (comment.trim().length < 10) {
        setError("Komentar minimal 10 karakter.");
        setSubmitting(false);
        return;
      }
      let imageUrl = null;
      if (image) {
        // Upload image ke endpoint upload
        const formData = new FormData();
        formData.append("file", image);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          const data = await res.json();
          imageUrl = data.url;
        } else {
          setError("Gagal upload gambar.");
          setSubmitting(false);
          return;
        }
      }
      // Submit review
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: Number(userId),
          productId: productId ?? undefined,
          rating,
          comment,
          image: imageUrl,
        }),
      });
      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        const data = await res.json();
        setError(data.error || "Gagal mengirim review.");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mengirim review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-black text-2xl"
          onClick={onClose}
          aria-label="Tutup"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Tulis Review</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Rating:</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={
                    star <= rating
                      ? "text-yellow-400 text-2xl"
                      : "text-gray-300 text-2xl"
                  }
                  onClick={() => setRating(star)}
                  aria-label={`Beri rating ${star}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Komentar:</label>
            <textarea
              className="w-full border rounded px-2 py-1"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              minLength={10}
              required
              placeholder="Tulis pengalaman Anda..."
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Foto (opsional):</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
            disabled={submitting}
          >
            {submitting ? "Mengirim..." : "Kirim Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal; 