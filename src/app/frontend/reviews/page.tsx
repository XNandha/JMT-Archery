"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { FaStar, FaArrowLeft, FaCamera, FaTimes } from "react-icons/fa";

interface Review {
  id: number;
  userId: number;
  rating: number;
  comment: string;
  image?: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    email: string;
    profilePicture?: string;
  };
}

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Review form state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const router = useRouter();

  // Check login status
  useEffect(() => {
    const checkSession = () => {
      if (typeof window === "undefined") return;
      const loginTime = sessionStorage.getItem("loginTime");
      const isLoggedInSession = sessionStorage.getItem("isLoggedIn") === "true";
      const uid = sessionStorage.getItem("userId");
      const userData = sessionStorage.getItem("userData");
      
      if (isLoggedInSession && loginTime) {
        const now = Date.now();
        const loginTimestamp = parseInt(loginTime, 10);
        if (now - loginTimestamp > 3600000) {
          sessionStorage.removeItem("isLoggedIn");
          sessionStorage.removeItem("loginTime");
          sessionStorage.removeItem("userId");
          setIsLoggedIn(false);
          setUserId(null);
        } else {
          setIsLoggedIn(true);
          setUserId(uid ? Number(uid) : null);
          
          // Get user name from session data
          if (userData) {
            try {
              const parsed = JSON.parse(userData);
              setUserName(parsed.name || "User");
            } catch {
              setUserName("User");
            }
          }
        }
      } else {
        setIsLoggedIn(false);
        setUserId(null);
      }
    };
    checkSession();
  }, []);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/review");
        if (res.ok) {
          const data = await res.json();
          setReviews(data.reviews || []);
        } else {
          console.error("Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void, onStarHover?: (star: number) => void) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const displayRating = interactive ? hoverRating || rating : rating;
      
      return (
        <FaStar
          key={index}
          className={`w-6 h-6 cursor-pointer transition-colors ${
            starValue <= displayRating ? "text-yellow-400" : "text-gray-300"
          } ${interactive ? "hover:text-yellow-400" : ""}`}
          onClick={() => onStarClick?.(starValue)}
          onMouseEnter={() => onStarHover?.(starValue)}
          onMouseLeave={() => onStarHover?.(0)}
        />
      );
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("File terlalu besar! Maksimal 5MB.");
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      if (res.ok) {
        const data = await res.json();
        return data.url;
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn || !userId) {
      alert("Silakan login terlebih dahulu untuk memberikan review.");
      return;
    }
    
    if (rating === 0) {
      alert("Silakan berikan rating.");
      return;
    }
    
    if (comment.trim().length < 10) {
      alert("Comment minimal 10 karakter.");
      return;
    }
    
    setSubmitting(true);
    
    try {
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      
      const res = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          rating,
          comment: comment.trim(),
          image: imageUrl,
        }),
      });
      
      if (res.ok) {
        const data = await res.json();
        setReviews([data.review, ...reviews]);
        setShowReviewForm(false);
        resetForm();
        alert("Review berhasil ditambahkan!");
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Gagal menambahkan review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Terjadi kesalahan saat menambahkan review.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setRating(0);
    setHoverRating(0);
    setComment("");
    setImageFile(null);
    setImagePreview(null);
  };

  const goBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 pb-24">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-lg text-gray-600">Memuat ulasan...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-24">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              Kembali
            </button>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Ulasan Pelanggan
                </h1>
                <p className="text-gray-600">
                  Lihat apa yang dikatakan pelanggan kami tentang JMT Archery
                </p>
              </div>
              {isLoggedIn && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Tulis Review
                </button>
              )}
            </div>
          </div>

          {/* Review Form Modal */}
          {showReviewForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Tulis Review</h2>
                    <button
                      onClick={() => {
                        setShowReviewForm(false);
                        resetForm();
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmitReview}>
                    {/* Rating */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating *
                      </label>
                      <div className="flex items-center gap-1">
                        {renderStars(rating, true, setRating, setHoverRating)}
                        <span className="ml-2 text-sm text-gray-600">
                          {rating}/5
                        </span>
                      </div>
                    </div>

                    {/* Comment */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Komentar *
                      </label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                        placeholder="Bagikan pengalaman Anda dengan JMT Archery..."
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Minimal 10 karakter
                      </p>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Foto (Opsional)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        {imagePreview ? (
                          <div className="relative">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <FaTimes className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <FaCamera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 mb-2">
                              Klik untuk upload foto
                            </p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="image-upload"
                            />
                            <label
                              htmlFor="image-upload"
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
                            >
                              Pilih Foto
                            </label>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowReviewForm(false);
                          resetForm();
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={submitting || rating === 0 || comment.trim().length < 10}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? "Mengirim..." : "Kirim Review"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {reviews.length}
                </div>
                <div className="text-gray-600">Total Ulasan</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {reviews.length > 0 
                    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
                    : "0.0"
                  }
                </div>
                <div className="text-gray-600">Rating Rata-rata</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {reviews.filter(r => r.rating >= 4).length}
                </div>
                <div className="text-gray-600">Ulasan Positif</div>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                {/* User Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    {review.user.profilePicture ? (
                      <img
                        src={review.user.profilePicture}
                        alt={review.user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-600 font-semibold">
                          {review.user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {review.user.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {renderStars(review.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    {review.rating}/5
                  </span>
                </div>

                {/* Comment */}
                <p className="text-gray-700 leading-relaxed mb-3">
                  "{review.comment}"
                </p>

                {/* Review Image */}
                {review.image && (
                  <div className="mt-3">
                    <img
                      src={review.image}
                      alt="Review"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {reviews.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Belum ada ulasan
              </h3>
              <p className="text-gray-600 mb-4">
                Jadilah yang pertama memberikan ulasan untuk JMT Archery!
              </p>
              {!isLoggedIn && (
                <button
                  onClick={() => {
                    if (typeof window !== "undefined") sessionStorage.setItem("lastPageBeforeLogin", window.location.pathname);
                    router.push("/frontend/login");
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login untuk Review
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReviewsPage; 