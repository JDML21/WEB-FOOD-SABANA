import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../../../Contexts/ProductContext";

function CategoriesPage() {
  const { products } = useProductContext();
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [sortOption, setSortOption] = useState("");

  // Categorías únicas desde los productos
  const categories = [
    "todos",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filtrar por categoría
  const filteredProducts = products.filter((product) =>
    selectedCategory === "todos" ? true : product.category === selectedCategory
  );

  // Ordenar según opción seleccionada
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "precio") return a.price - b.price;
    if (sortOption === "valoracion") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className="pt-20 min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Nuestras Categorías</h1>
          <p className="text-gray-600">
            Explora los productos disponibles en cada categoría
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex gap-3 items-center">
            <label className="font-medium text-gray-700">Categoría:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 items-center">
            <label className="font-medium text-gray-700">Ordenar por:</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">Ninguno</option>
              <option value="precio">Precio (menor a mayor)</option>
              <option value="valoracion">Mejor valorados</option>
            </select>
          </div>
        </div>

        {/* Grid de productos - 5 por fila */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <div className="relative pt-[100%]">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h2 className="font-medium text-gray-800 text-sm line-clamp-1">{product.name}</h2>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-blue-600 font-bold text-sm">
                      ${Number(product.price).toLocaleString()}
                    </p>
                    <div className="flex items-center">
                      <span className="text-yellow-500 text-xs mr-1">⭐</span>
                      <span className="text-xs text-gray-600">{product.rating || 0}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center col-span-full">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No hay productos en esta categoría
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Prueba con otra categoría o criterio de búsqueda
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;