"use client";

import React, { useEffect, useRef, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Transaction {
  id: number;
  userId: number;
  totalAmount: number;
  createdAt: string;
  user?: User;
  items: {
    id: number;
    productId: number;
    quantity: number;
    price: number;
    product: Product;
  }[];
}

interface Payment {
  id: number;
  orderId: number;
  amount: number;
  method: string;
  bank?: string;
  status: string;
  transactionId?: string;
  verificationCode?: string;
  paidAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  order: {
    id: number;
    userId: number;
    totalAmount: number;
    status: string;
    createdAt: Date;
    user: {
      id: number;
      name: string;
      email: string;
    };
    items: {
      id: number;
      productId: number;
      quantity: number;
      price: number;
      product: {
        id: number;
        name: string;
        price: number;
        image: string;
      };
    }[];
  };
}

export default function AdminPage() {
  const [product, setProduct] = useState<Product[]>([]);
  const [form, setForm] = useState<Partial<Product>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"product" | "transaction" | "payment">(
    "product"
  );
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showStockModal, setShowStockModal] = useState<null | Product>(null);
  const [addStockValue, setAddStockValue] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await fetch("/api/product");
      if (!res.ok) throw new Error("Gagal mengambil data produk");
      const data: Product[] = await res.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
      alert("Gagal memuat data produk.");
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/order");
      if (!res.ok) throw new Error("Gagal mengambil data transaksi");
      const data: Transaction[] = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error(error);
      alert("Gagal memuat data transaksi.");
    }
  };

  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/payment/all");
      if (!res.ok) throw new Error("Gagal mengambil data pembayaran");
      const data = await res.json();
      setPayments(data.payments || []);
    } catch (error) {
      console.error(error);
      alert("Gagal memuat data pembayaran.");
    }
  };

  useEffect(() => {
    if (activeMenu === "product") fetchProduct();
    if (activeMenu === "transaction") fetchTransactions();
    if (activeMenu === "payment") fetchPayments();
  }, [activeMenu]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      e.target.name === "image" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      const file = e.target.files[0];
      if (file && file.size > 2 * 1024 * 1024) {
        alert("File terlalu besar! Maksimal 2MB.");
        return;
      }
      setImageFile(file);
    } else {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]:
          name === "price" || name === "stock"
            ? value === ""
              ? ""
              : Number(value)
            : value,
      }));
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload gambar gagal");
      const data = await res.json();
      return data.url;
    } catch (error) {
      console.error(error);
      alert("Gagal mengunggah gambar.");
      return "";
    }
  };
  
  const handleAddStock = async (productId: number) => {
    if (addStockValue < 1) {
      alert("Jumlah stok yang ditambahkan minimal 1");
      return;
    }
    try {
      const res = await fetch(`/api/product/${productId}/add-stock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addStock: addStockValue }),
      });
      if (!res.ok) {
        const errMsg = await res.json();
        throw new Error(errMsg.error || "Gagal menambah stok");
      }
      setShowStockModal(null);
      setAddStockValue(0);
      fetchProduct();
      alert("Stok berhasil ditambahkan!");
    } catch (error: any) {
      alert(error.message || "Terjadi kesalahan saat menambah stok.");
    }
  };

  const resetForm = () => {
    setForm({});
    setEditingId(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.name ||
      form.price === undefined ||
      form.price === null ||
      isNaN(Number(form.price)) ||
      form.stock === undefined ||
      form.stock === null ||
      isNaN(Number(form.stock)) ||
      (!form.image && !imageFile)
    ) {
      alert("Semua field wajib diisi.");
      return;
    }

    setIsLoading(true);

    try {
      let imageUrl = (form.image as string) || "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl) {
          setIsLoading(false);
          return;
        }
      }

      const payload = {
        name: String(form.name),
        price: Number(form.price),
        description: form.description || "",
        image: imageUrl,
        stock: Number(form.stock),
      };

      const res = await fetch(
        editingId ? `/api/product/${editingId}` : "/api/product",
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errMsg = await res.json();
        throw new Error(
          "Gagal menyimpan produk: " + (errMsg.error || res.statusText)
        );
      }

      resetForm();
      fetchProduct();
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (p: Product) => {
    setForm({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
      description: p.description,
      stock: p.stock,
    });
    setEditingId(p.id);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus produk ini?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/product/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus produk");
      fetchProduct();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menghapus produk.");
    }
  };

  // Helper function untuk status pembayaran
  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Menunggu";
      case "processing":
        return "Diproses";
      case "success":
        return "Berhasil";
      case "failed":
        return "Gagal";
      case "expired":
        return "Kadaluarsa";
      default:
        return status;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "success":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen font-sans bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow h-screen p-6 flex flex-col gap-4 fixed left-0 top-0">
        <h2 className="text-xl font-bold mb-6">JMT Archery</h2>
        <button
          className={`text-left px-4 py-2 rounded transition font-semibold ${
            activeMenu === "product"
              ? "bg-black text-white"
              : "hover:bg-gray-200"
          }`}
          onClick={() => setActiveMenu("product")}
        >
          Tambah Product
        </button>
        <button
          className={`text-left px-4 py-2 rounded transition font-semibold ${
            activeMenu === "transaction"
              ? "bg-black text-white"
              : "hover:bg-gray-200"
          }`}
          onClick={() => setActiveMenu("transaction")}
        >
          Transaksi
        </button>
        <button
          className={`text-left px-4 py-2 rounded transition font-semibold ${
            activeMenu === "payment"
              ? "bg-black text-white"
              : "hover:bg-gray-200"
          }`}
          onClick={() => setActiveMenu("payment")}
        >
          Status Pembayaran
        </button>
        <button
          className="mt-4 px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition"
          onClick={() => window.location.href = "/frontend/marketplace"}
        >
          Lihat Marketplace
        </button>
        <button
          className="mt-8 px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          onClick={async () => {
            try {
              const res = await fetch("/api/auth/logout", { method: "POST" });
              if (res.ok) {
                window.location.href = "/frontend/login";
              } else {
                alert("Gagal logout. Silakan coba lagi.");
              }
            } catch (err) {
              alert("Terjadi kesalahan saat logout.");
            }
          }}
        >
          Logout
        </button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 ml-60 p-8">
        {activeMenu === "product" && (
          <>
            <h1 className="text-2xl font-bold mb-6">Product Management</h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 mb-8 bg-gray-50 p-4 rounded"
            >
              <input
                name="name"
                placeholder="Product Name"
                value={form.name || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                name="price"
                type="number"
                placeholder="Price"
                value={form.price ?? ""}
                onChange={handleChange}
                min={0}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                name="stock"
                type="number"
                placeholder="Stock"
                value={form.stock ?? ""}
                onChange={handleChange}
                min={0}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                ref={fileInputRef}
              />
              <textarea
                name="description"
                placeholder="Description"
                value={form.description || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading
                  ? editingId
                    ? "Updating..."
                    : "Adding..."
                  : editingId
                  ? "Update"
                  : "Add"}{" "}
                Product
              </button>
              {editingId && (
                <button
                  type="button"
                  className="ml-2 px-4 py-2 rounded border"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </form>

            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Stock</th>
                  <th className="p-2 border">Image</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {product.map((p) => (
                  <tr key={p.id}>
                    <td className="p-2 border">{p.name}</td>
                    <td className="p-2 border">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(p.price)}
                    </td>
                    <td className="p-2 border">{p.stock}</td>
                    <td className="p-2 border">
                      {p.image && (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-16 h-16 object-cover"
                        />
                      )}
                    </td>
                    <td className="p-2 border">
                      {p.description && (
                        <div className="whitespace-pre-line">
                          {p.description}
                        </div>
                      )}
                    </td>
                    <td className="p-2 border">
                      <button
                        className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 bg-green-600 text-white rounded mr-2"
                        onClick={() => {
                          setShowStockModal(p);
                          setAddStockValue(0);
                        }}
                      >
                        + Stok
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal tambah stok */}
            {showStockModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs relative">
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-black"
                    onClick={() => setShowStockModal(null)}
                    aria-label="Tutup"
                  >
                    ×
                  </button>
                  <h2 className="text-lg font-bold mb-2">
                    Tambah Stok: {showStockModal.name}
                  </h2>
                  <div className="mb-2 text-sm">
                    Stok sekarang:{" "}
                    <span className="font-semibold">
                      {showStockModal.stock}
                    </span>
                  </div>
                  <input
                    type="number"
                    min={1}
                    value={addStockValue === 0 ? "" : addStockValue}
                    onChange={(e) => setAddStockValue(Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full mb-4"
                    placeholder="Jumlah stok yang ditambah"
                  />
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded w-full font-semibold"
                    onClick={() => handleAddStock(showStockModal.id)}
                  >
                    Tambah Stok
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {activeMenu === "transaction" && (
          <>
            <h1 className="text-2xl font-bold mb-6">Daftar Transaksi</h1>
            <div className="overflow-x-auto">
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">User ID</th>
                    <th className="p-2 border">Nama User</th>
                    <th className="p-2 border">Tanggal</th>
                    <th className="p-2 border">Total</th>
                    <th className="p-2 border">Produk</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center p-4 text-gray-500">
                        Tidak ada transaksi.
                      </td>
                    </tr>
                  ) : (
                    transactions.map((trx) => (
                      <tr key={trx.id}>
                        <td className="p-2 border">{trx.id}</td>
                        <td className="p-2 border">{trx.userId}</td>
                        <td className="p-2 border">{trx.user?.name || "-"}</td>
                        <td className="p-2 border">
                          {new Date(trx.createdAt).toLocaleString("id-ID")}
                        </td>
                        <td className="p-2 border">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(trx.totalAmount)}
                        </td>
                        <td className="p-2 border">
                          <ul className="list-disc pl-4">
                            {trx.items.map((item) => (
                              <li
                                key={item.id}
                                className="flex items-center gap-2 mb-2"
                              >
                                {item.product?.image && (
                                  <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-10 h-10 object-cover rounded border"
                                  />
                                )}
                                <span>
                                  {item.product?.name || "-"} x {item.quantity}{" "}
                                  (
                                  {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  }).format(item.price)}
                                  )
                                </span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeMenu === "payment" && (
          <>
            <h1 className="text-2xl font-bold mb-6">Status Pembayaran</h1>
            
                        {/* Payment Statistics */}
            <div className="flex justify-between items-center mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                <div className="bg-white p-4 rounded-lg shadow border">
                  <div className="text-2xl font-bold text-blue-600">
                    {payments.filter(p => p.status === "pending").length}
                  </div>
                  <div className="text-sm text-gray-600">Menunggu Pembayaran</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border">
                  <div className="text-2xl font-bold text-yellow-600">
                    {payments.filter(p => p.status === "processing").length}
                  </div>
                  <div className="text-sm text-gray-600">Sedang Diproses</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border">
                  <div className="text-2xl font-bold text-green-600">
                    {payments.filter(p => p.status === "success").length}
                  </div>
                  <div className="text-sm text-gray-600">Pembayaran Berhasil</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border">
                  <div className="text-2xl font-bold text-red-600">
                    {payments.filter(p => p.status === "failed" || p.status === "expired").length}
                  </div>
                  <div className="text-sm text-gray-600">Pembayaran Gagal</div>
                </div>
              </div>
              <button
                onClick={fetchPayments}
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Refresh Data
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">ID Pembayaran</th>
                    <th className="p-2 border">Order ID</th>
                    <th className="p-2 border">Customer</th>
                    <th className="p-2 border">Metode</th>
                    <th className="p-2 border">Jumlah</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Transaction ID</th>
                    <th className="p-2 border">Tanggal</th>
                    <th className="p-2 border">Produk</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center p-4 text-gray-500">
                        Tidak ada data pembayaran.
                      </td>
                    </tr>
                  ) : (
                    payments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="p-2 border">{payment.id}</td>
                        <td className="p-2 border">{payment.orderId}</td>
                        <td className="p-2 border">
                          <div>
                            <div className="font-semibold">{payment.order.user.name || "-"}</div>
                            <div className="text-sm text-gray-500">{payment.order.user.email}</div>
                          </div>
                        </td>
                        <td className="p-2 border">
                          <div>
                            <div className="font-semibold">{payment.method}</div>
                            {payment.bank && (
                              <div className="text-sm text-gray-500">{payment.bank}</div>
                            )}
                          </div>
                        </td>
                        <td className="p-2 border">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(payment.amount)}
                        </td>
                        <td className="p-2 border">
                          <span className={`inline-flex px-2 py-1 rounded text-sm font-medium ${getPaymentStatusColor(payment.status)}`}>
                            {getPaymentStatusText(payment.status)}
                          </span>
                        </td>
                        <td className="p-2 border">
                          <div className="text-sm">
                            {payment.transactionId || "-"}
                          </div>
                          {payment.verificationCode && (
                            <div className="text-xs text-gray-500">
                              Kode: {payment.verificationCode}
                            </div>
                          )}
                        </td>
                        <td className="p-2 border">
                          <div className="text-sm">
                            {new Date(payment.createdAt).toLocaleString("id-ID")}
                          </div>
                          {payment.paidAt && (
                            <div className="text-xs text-gray-500">
                              Dibayar: {new Date(payment.paidAt).toLocaleString("id-ID")}
                            </div>
                          )}
                        </td>
                        <td className="p-2 border">
                          <div className="max-w-xs">
                            {payment.order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-2 mb-2">
                                {item.product.image && (
                                  <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-8 h-8 object-cover rounded border"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium truncate">
                                    {item.product.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {item.quantity}x @ {new Intl.NumberFormat("id-ID", {
                                      style: "currency",
                                      currency: "IDR",
                                    }).format(item.price)}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
