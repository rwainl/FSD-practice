import React from 'react'

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      <p className="mt-4 text-gray-600 font-medium">Memuat produk...</p>
    </div>
  )
}

export default LoadingSpinner