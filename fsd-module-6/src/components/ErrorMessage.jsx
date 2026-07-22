import React from 'react'

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
        <p className="text-gray-600 mb-6">{message}</p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Coba Lagi
          </button>
        )}

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Tips:</strong> Pastikan backend API running di{" "}
            <code className="bg-yellow-200 px-2 py-1 rounded">
              http://localhost:3000
            </code>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ErrorMessage