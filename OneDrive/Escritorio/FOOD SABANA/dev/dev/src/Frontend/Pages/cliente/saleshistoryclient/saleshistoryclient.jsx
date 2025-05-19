import React, { useState } from "react";
import { FaSearch, FaFileDownload, FaCalendarAlt, FaFilter } from "react-icons/fa";
import { useCart } from "../../../Contexts/CartContext";

function HistoryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [dateFilter, setDateFilter] = useState("Todo el historial");
  const { purchaseHistory } = useCart();

  const getStatusMatches = (filter) => {
    const statusMap = {
      "Completado": ["completado", "entregado", "finalizado"],
      "Pendiente": ["Pendiente", "procesando", "en camino", "preparando"],
      "Cancelado": ["cancelado", "rechazado", "anulado"]
    };
    return statusMap[filter] || [];
  };

  const filterByDate = (pedido) => {
    const now = new Date();
    const orderDate = new Date(pedido.date);
    const diffTime = now - orderDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    switch(dateFilter) {
      case "Últimos 30 días":
        return diffDays <= 30;
      case "Últimos 3 meses":
        return diffDays <= 90;
      case "Este año":
        return orderDate.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  };

  const filteredHistory = purchaseHistory?.filter((pedido) => {
    const matchesSearch = pedido.products?.some((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    
    const matchesStatus = 
      statusFilter === "Todos" || 
      getStatusMatches(statusFilter).some(s => 
        pedido.status?.toLowerCase().includes(s)
      );
    
    const matchesDate = filterByDate(pedido);
    
    return matchesSearch && matchesStatus && matchesDate;
  }) || [];

  return (
    <div className="pt-20 min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Historial de Compras</h1>
          <p className="text-gray-600">
            Revisa tus pedidos anteriores y su estado
          </p>
        </div>

        {/* Barra de herramientas */}
        <div className="bg-white rounded-lg shadow p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Barra de búsqueda */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar en mis compras..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Filtros */}
            <div className="flex items-center space-x-4">
              {/* Filtro por fecha */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="appearance-none block pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option>Todo el historial</option>
                  <option>Últimos 30 días</option>
                  <option>Últimos 3 meses</option>
                  <option>Este año</option>
                </select>
              </div>

              {/* Filtro por estado */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none block pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="Todos">Todos los estados</option>
                  <option value="Completado">Completados</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Cancelado">Cancelados</option>
                </select>
              </div>

              {/* Botón de exportar */}
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <FaFileDownload className="mr-2" />
                Exportar
              </button>
            </div>
          </div>
        </div>

        {/* Lista de pedidos */}
        <div className="space-y-4">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((pedido) => (
              <div key={pedido.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-5 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Pedido #{pedido.id}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Realizado el {new Date(pedido.date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="mt-3 sm:mt-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        pedido.status.toLowerCase().includes('complet') 
                          ? "bg-green-100 text-green-800" 
                          : pedido.status.toLowerCase().includes('proces') || 
                            pedido.status.toLowerCase().includes('camino')
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-red-100 text-red-800"
                      }`}>
                        {pedido.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={pedido.products?.[0]?.image || "/placeholder.jpg"}
                        alt={pedido.products?.[0]?.name || "Producto"}
                        className="h-32 w-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900 mb-2">
                        {pedido.products?.[0]?.name || "Producto no disponible"}
                      </h4>
                      <p className="text-gray-600 mb-4">
                        {pedido.products?.[0]?.description || "Sin descripción disponible"}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          Ver detalles
                        </button>
                        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          Volver a comprar
                        </button>
                      </div>
                    </div>
                    <div className="md:text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ${pedido.total?.toLocaleString() || "0"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {pedido.products?.length || 0} productos
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No hay historial de compras
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {search ? "No encontramos resultados para tu búsqueda" : "Tus compras aparecerán aquí"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;