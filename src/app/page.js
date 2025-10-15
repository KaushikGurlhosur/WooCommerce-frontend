"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import LoadingIcons from "react-loading-icons";

export default function HomePage() {
  const [page, setPage] = useState(1);

  const limit = 50;

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      let queryParams = `?page=${page}&limit=${limit}`;

      const res = await api.get(`/products${queryParams}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading && !data)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[100]">
        <LoadingIcons.Puff stroke="#fff" className="w-22 h-22" />
      </div>
    );
  if (error)
    return (
      <p className="text-center p-10 text-red-500">
        Error loading products: {error.message}
      </p>
    );

  const { products, totalPages, currentPage, totalProducts } = data;

  return (
    <div className="p-6 max-w-7xl mx-auto mt-30">
      {/* PAGINATED PRODUCT GRID SECTION */}
      <h2 className="text-2xl font-bold mb-4 text-center text-white">
        All Products View
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div
            key={product._id}
            className="p-4 border-2 border-purple-600 rounded-xl shadow-sm bg-amber-50 hover:shadow-lg transition ">
            <h2 className="font-semibold text-lg mb-2">{product.title}</h2>
            <p>
              💰 <strong>{product.price}</strong>
            </p>
            <p className="capitalize">📦 {product.stock_status}</p>
            <p>🏷️ {product.category}</p>
            {product.on_sale && (
              <p className="text-green-600 font-bold">🔥 On Sale!</p>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || isFetching}
          className="px-4 py-2 border rounded-lg bg-gray-100 disabled:opacity-50 transition">
          ← Previous Page
        </button>
        <p className="py-2 font-medium text-amber-50">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={currentPage >= totalPages || isFetching}
          className="px-4 py-2 border rounded-lg bg-gray-100 disabled:opacity-50 transition">
          Next Page →
        </button>
      </div>

      <p className="text-center text-sm text-gray-100 mt-2">
        Total Products Found: {totalProducts}
      </p>
    </div>
  );
}
