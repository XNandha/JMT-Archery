"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { FaStar, FaArrowLeft } from "react-icons/fa";

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  userImage?: string;
}

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Sample reviews data (in real app, this would come from API)
  const sampleReviews: Review[] = [
    {
      id: 1,
      userName: "Ahmad Fadillah",
      rating: 5,
      comment: "Produk sangat berkualitas, pengiriman cepat dan aman. Sangat puas dengan layanan JMT Archery!",
      date: "2024-01-15",
      userImage: "/uploads/14a374c8-82e4-432b-a413-76ef6058719a.jpg"
    },
    {
      id: 2,
      userName: "Sarah Johnson",
      rating: 4,
      comment: "Busur yang saya beli sangat bagus, cocok untuk pemula. Staff sangat ramah dan membantu.",
      date: "2024-01-10"
    },
    {
      id: 3,
      userName: "Budi Santoso",
      rating: 5,
      comment: "Kualitas produk premium, harga terjangkau. Sudah 2 tahun menggunakan produk dari JMT Archery.",
      date: "2024-01-08",
      userImage: "/uploads/20a01263-4dbc-4f5e-b5e6-bb1d12cb2c17.jpg"
    },
    {
      id: 4,
      userName: "Maria Garcia",
      rating: 4,
      comment: "Pelayanan sangat baik, produk sesuai deskripsi. Akan belanja lagi di sini.",
      date: "2024-01-05"
    },
    {
      id: 5,
      userName: "David Chen",
      rating: 5,
      comment: "Sangat puas dengan kualitas busur dan aksesorisnya. Recommended!",
      date: "2024-01-03",
      userImage: "/uploads/271466f5-ed9a-4238-8ec6-48b09d56b734.jpg"
    },
    {
      id: 6,
      userName: "Lisa Wong",
      rating: 4,
      comment: "Pengalaman berbelanja yang menyenangkan. Produk berkualitas dan harga bersaing.",
      date: "2024-01-01"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReviews(sampleReviews);
      setLoading(false);
    }, 1000);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Ulasan Pelanggan
            </h1>
            <p className="text-gray-600">
              Lihat apa yang dikatakan pelanggan kami tentang JMT Archery
            </p>
          </div>

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
                  {(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)}
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
                    {review.userImage ? (
                      <img
                        src={review.userImage}
                        alt={review.userName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-600 font-semibold">
                          {review.userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {review.userName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(review.date)}
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
                <p className="text-gray-700 leading-relaxed">
                  "{review.comment}"
                </p>
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
              <p className="text-gray-600">
                Jadilah yang pertama memberikan ulasan untuk JMT Archery!
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReviewsPage; 