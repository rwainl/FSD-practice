import React from "react";

function ProductCard({ product }) {
  return (
    <>
      <div className="border shadow-md rounded-md px-4 py-6 hover:shadow-xl transition duration-300 overflow-hidden">
        <div className="relative h-48 bg-gray-200 rounded-md">
          <img
            src={
              product.imageUrl ||
              "https://via.placeholder.com/400x300?text=Health+Product"
            }
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-lg">
            {product.category}
          </span>
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-lg">
            {product.stock === 0 ? "Habis" : product.stock}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-xl text-gray-800 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 h-10">
            {product.manufacturer}
          </p>
          <p className="text-sm text-gray-700 mt-2 h-10 line-clamp-2 h-14">
            {product.description}
          </p>
          <div className="flex justify-between">
            <p className="text-md font-semibold flex items-center">
              Rp. {product.price.toLocaleString("id-ID")}
            </p>
            <button
              className={`px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-600 hover:scale-105 hover:shadow-md transition ${
                product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={product.stock === 0}
            >
              Beli
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
