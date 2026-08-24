import React from "react";

function ProductSkeleton() {
  return (
    <div className="bg-white rounded-lg p-4 shadow animate-pulse">
      <div className="bg-gray-300 h-48 rounded- mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
      <div className="h-3 bg-gray-300 rounded w-2/3 mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
      <div className="h-10 bg-gray-300 rounded w-full"></div>
    </div>
  );
}

export default ProductSkeleton;

