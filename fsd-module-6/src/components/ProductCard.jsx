import React from "react";

function ProductCard({ products }) {
  return (
    <>
      <div className="">
        <h3 className="text-2xl font-semibold my-4">Product List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, id) => (
            <div
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition"
              key={id}
            >
              <div className="relative h-48 bg-gray-200">
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

                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {product.category}
                </span>

                {product.stock < 10 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {product.stock === 0 ? "Habis" : `Sisa ${product.stock}`}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-2 h-10 line-clamp-2">
                {product.description}
              </p>
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {product.manufacturer}
                </p>
              </div>
              <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductCard;
