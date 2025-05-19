import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaSync } from "react-icons/fa";
import { useCart } from "../../../Contexts/CartContext";

function SalesHistory() {
  const { purchaseHistory, loadingHistory, fetchHistory } = useCart();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const filtered = purchaseHistory.filter((venta) =>
    venta.products?.some((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Historial de Ventas</h1>
        <div className="flex items-center mt-2">
          <Link 
            to="/pos" 
            className="text-blue-600 hover:underline"
          >
            Inicio
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">Historial</span>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="relative flex-1 min-w-[250px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar producto en ventas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        <button
          onClick={fetchHistory}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
        >
          <FaSync />
          Recargar historial
        </button>
      </div>

      {/* Lista de ventas */}
      {loadingHistory ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-2"></div>
          <p className="text-gray-600">Cargando historial de ventas...</p>
        </div>
      ) : filtered.length ? (
        <div className="space-y-4">
          {filtered.map((venta) => (
            <div
              key={venta.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                <div>
                  <span className="font-semibold text-gray-700">
                    {new Date(venta.date).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                    venta.status === "Completado" 
                      ? "bg-green-100 text-green-800" 
                      : venta.status === "Pendiente"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}>
                    {venta.status}
                  </span>
                </div>
                <span className="font-bold text-blue-600">
                  ${venta.total.toFixed(2)}
                </span>
              </div>
              
              <div className="p-4">
                <ul className="space-y-2">
                  {venta.products?.map((p, index) => (
                    <li key={index} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
                      <div className="flex items-center">
                        <span className="text-gray-600">{p.quantity}x</span>
                        <span className="ml-2 font-medium">{p.name}</span>
                      </div>
                      <span className="text-gray-700">${(p.price * p.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500 text-lg">No se encontraron ventas</p>
          {search && (
            <p className="text-sm text-gray-400 mt-2">
              No hay resultados para "{search}"
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SalesHistory;