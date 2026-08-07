import React from 'react'

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categories = [
    { value: "All", label: "Semua Produk", icon: "", color: "blue" },
    { value: "Vitamin", label: "Vitamin", icon: "", color: "green" },
    { value: "Supplement", label: "Suplemen", icon: "", color: "emerald" },
    { value: "Medicine", label: "Obat", icon: "", color: "red" },
    {
      value: "Medical Equipment",
      label: "Alat Medis",
      icon: "",
      color: "purple",
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h2>Kategori Produk</h2>
        <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.value;

          return (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all duration-200
                ${
                  isSelected
                    ? `bg-${cat.color}-500 text-white shadow-md scale-105`
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                }
              `}
              style={{
                backgroundColor: isSelected
                  ? getCategoryColor(cat.color)
                  : undefined,
              }}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
            </button>
          );
        })}
      </div>
      </div>
    </>
  )
}

function getCategoryColor(color) {
  const colors = {
    blue: "#3B82F6",
    green: "#10B981",
    emerald: "#059669",
    red: "#EF4444",
    purple: "#8B5CF6",
  };
  return colors[color] || "#3B82F6";
}

export default CategoryFilter