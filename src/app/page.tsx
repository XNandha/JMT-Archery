"use client";

import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import { useRouter } from "next/navigation";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { FaStar } from "react-icons/fa";
import ReviewModal from "./components/ReviewModal";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  createdAt?: string;
}

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

export default function LandingPage() {
  const router = useRouter();
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [latestReviews, setLatestReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Cek login saat mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedInSession = sessionStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(isLoggedInSession);
    }
  }, []);

  // Ambil produk terbaru dari database
  useEffect(() => {
    async function fetchLatestProducts() {
      setLoading(true);
      try {
        const res = await fetch("/api/product");
        if (!res.ok) {
          setLatestProducts([]);
          return;
        }
        const data = await res.json();
        // Urutkan dari yang terbaru (createdAt DESC), ambil 3 teratas
        const sorted = [...data]
          .sort(
            (a, b) =>
              new Date(b.createdAt || 0).getTime() -
              new Date(a.createdAt || 0).getTime()
          )
          .slice(0, 3);
        setLatestProducts(sorted);
      } catch {
        setLatestProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestProducts();
  }, []);

  // Ambil review terbaru dari database
  useEffect(() => {
    async function fetchLatestReviews() {
      try {
        const res = await fetch("/api/review/latest");
        if (!res.ok) {
          setLatestReviews([]);
          return;
        }
        const data = await res.json();
        setLatestReviews(data.reviews || []);
      } catch {
        setLatestReviews([]);
      }
    }
    fetchLatestReviews();
  }, []);

  useEffect(() => {
    const checkLogin = () => {
      if (typeof window !== "undefined") {
        setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
      }
    };
    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const goToShop = () => router.push("/frontend/marketplace");
  const goToLogin = () => router.push("/frontend/login");
  const goToProfile = () => {
    if (
      typeof window !== "undefined" &&
      (!sessionStorage.getItem("isLoggedIn") ||
        sessionStorage.getItem("isLoggedIn") !== "true")
    ) {
      sessionStorage.setItem("redirectAfterLogin", "/frontend/user_profile");
      router.push("/frontend/login");
    } else {
      router.push("/frontend/user_profile");
    }
  };

  // Fungsi navigasi
  const goToDetailedProduct = (id?: number) => {
    if (!isLoggedIn) {
      if (typeof window !== "undefined" && id)
        sessionStorage.setItem(
          "redirectAfterLogin",
          `/frontend/detail_product/${id}`
        );
      router.push("/frontend/login");
    } else if (id) {
      router.push(`/frontend/detail_product/${id}`);
    } else {
      router.push("/frontend/detail_product");
    }
  };

  const goToArticle = () => router.push("/frontend/article");
  const goToReview = () => router.push("/frontend/reviews");

  const refreshReviews = async () => {
    try {
      const res = await fetch("/api/review?productId=null");
      if (res.ok) {
        const data = await res.json();
        setLatestReviews(data.reviews || []);
      }
    } catch {}
  };

  return (
    <div className="font-san min-h-screen w-full text-lg md:text-xl">
      {" "}
      {/* Tambahkan text-lg md:text-xl */}
      <Navbar />
      {/* Hero */}
      <div className="pt-20 pb-24">
        <section className="p-6">
          <h1 className="text-3xl font-bold">JMT Archery</h1>
          <p className="text-base md:text-lg mb-2">
            Kebutuhan alat panahanmu
          </p>
          <button
            className="bg-black text-white px-6 py-2 rounded text-lg md:text-xl"
            onClick={goToShop}
          >
            Shop
          </button>
        </section>

        {/* Banner */}
        <div className="p-6">
          <div
            className="w-full h-72 md:h-96 bg-gray-200 rounded flex items-center justify-center cursor-pointer relative overflow-hidden"
            onClick={() => goToDetailedProduct()}
          >
            <img
              src="/banner/landingBanner.png"
              alt="Landing Banner"
              className="w-full h-full object-cover rounded"
            />
          </div>
        </div>

        {/* Produk Terbaru */}
        <section className="p-6">
          <h2 className="text-3xl font-bold mb-6">Produk Terbaru</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <p className="text-xl">Loading...</p>
            ) : latestProducts.length === 0 ? (
              <p className="text-xl">Tidak ada produk terbaru.</p>
            ) : (
              latestProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-100 p-6 rounded-xl cursor-pointer hover:bg-gray-200 transition flex flex-col shadow-md"
                  onClick={goToShop}
                  style={{ minHeight: 280 }}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover mb-4 rounded-lg border"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-300 mb-4 rounded-lg" />
                  )}
                  <h3 className="text-2xl font-semibold mb-1">
                    {product.name}
                  </h3>
                  <p className="text-lg text-gray-700 mb-2">
                    {product.description
                      ? product.description.split("\n")[0]
                      : "Deskripsi produk tidak tersedia"}
                  </p>
                  <p className="text-xl font-bold text-green-700 mt-auto">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(product.price)}
                  </p>
                </div>
              ))
            )}
          </div>
          <div className="mt-4 text-center">
            <button
              className="text-blue-600 hover:underline text-lg font-medium"
              onClick={goToShop}
            >
              See More Produk
            </button>
          </div>
        </section>

        {/* Kelebihan */}
        <section className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Kelebihan JMT Archery
            </h2>
            <div className="mb-3">
              <p className="font-bold text-lg">Konstruksi berbeda</p>
              <p className="text-lg text-gray-600">
                Konstruksi berbeda dari yang lain, lokal maupun non lokal
              </p>  
            </div>
            <div className="mb-3">
              <p className="font-bold text-lg">Bahan buatan sendiri</p>
              <p className="text-lg text-gray-600">
                Bahan baku bikinan sendiri (Fiber Glass, Carbon, dan Lem bikinan
                sendiri)
              </p>
            </div>
            <div className="mb-3">
              <p className="font-bold text-lg">Dapat request bahan</p>
              <p className="text-lg text-gray-600">
                Bisa Request Fiber Glass Mix Carbon dan juga bisa hanya
                Fiber Glass doang
              </p>
            </div>
          </div>
          <img
            src="/banner/bow.jpg"
            alt="Bow"
            className="w-full h-40 md:h-64 object-cover rounded"
          />
        </section>

        {/* User Review */}
        <section className="p-6">
          <h2 className="text-2xl font-semibold mb-4">User Review</h2>
          <div className="mb-4">
            <button
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              onClick={() => setShowReviewModal(true)}
            >
              Add Review
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {loading ? (
              <div className="col-span-3 text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-gray-600">Memuat review...</p>
              </div>
            ) : latestReviews.length === 0 ? (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-600">Belum ada review</p>
              </div>
            ) : (
              latestReviews.map((review) => (
                <div key={review.id} className="border p-4 rounded cursor-pointer hover:bg-gray-100 transition" onClick={goToReview}>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }, (_, index) => (
                      <FaStar
                        key={index}
                        className={`w-4 h-4 ${index < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-lg italic mb-2">
                    "{review.comment.length > 100 
                      ? review.comment.substring(0, 100) + "..." 
                      : review.comment}"
                  </p>
                  {review.image && (
                    <img src={review.image} alt="Review" className="w-20 h-20 md:w-24 md:h-24 object-cover rounded mb-2" />
                  )}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-400 rounded-full overflow-hidden">
                      {review.user.profilePicture ? (
                        <img
                          src={review.user.profilePicture}
                          alt={review.user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-600 font-semibold text-xs">
                            {review.user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-base">
                      <p className="font-semibold">{review.user.name}</p>
                      <p className="text-gray-500 text-sm">
                        {new Date(review.createdAt).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-4 text-center">
            <button
              className="text-blue-600 hover:underline text-lg font-medium"
              onClick={goToReview}
            >
              See More Review
            </button>
          </div>
        </section>
        {/* Modal Add Review */}
        {showReviewModal && (
          <ReviewModal
            onClose={() => setShowReviewModal(false)}
            onSuccess={refreshReviews}
            productId={null}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
