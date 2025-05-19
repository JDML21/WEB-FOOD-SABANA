import React, { useState, useEffect } from "react";
import { FaSearch, FaFileDownload } from "react-icons/fa";

function SalesPOS() {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [modalSale, setModalSale] = useState(null);
  const [selectedSales, setSelectedSales] = useState([]);

  // 🔄 Obtener ventas del backend
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/ventas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setSales(data);
      } catch (error) {
        console.error("Error al obtener ventas:", error);
      }
    };

    fetchSales();
  }, []);

  const filteredSales = sales.filter((sale) => {
    const matchesSearch = sale.product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      !statusFilter || sale.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const toggleSaleSelection = (id) => {
    setSelectedSales((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((sid) => sid !== id)
        : [...prevSelected, id]
    );
  };

  // 🔄 Aplicar cambio de estado y enviar al backend
  const applyStatusToSelected = async (newStatus) => {
    try {
      const token = localStorage.getItem("token");

      await Promise.all(
        selectedSales.map((saleId) =>
          fetch(`/api/ventas/${saleId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status: newStatus }),
          })
        )
      );

      // Actualizar localmente
      setSales((prev) =>
        prev.map((sale) =>
          selectedSales.includes(sale.id)
            ? { ...sale, status: newStatus }
            : sale
        )
      );

      setSelectedSales([]);
    } catch (error) {
      console.error("Error al actualizar estado de ventas:", error);
    }
  };

  return (
    <div className="flex justify-center py-10 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Ventas</h2>

        {/* Filtros */}
        <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
          <div className="flex items-center border px-3 py-1 rounded w-full md:w-auto">
            <FaSearch className="mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar producto..."
              className="outline-none w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="border px-2 py-1 rounded"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="Hecha">Hecha</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => applyStatusToSelected("Hecha")}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Marcar como Hecha
            </button>
            <button
              onClick={() => applyStatusToSelected("Pendiente")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Marcar como Pendiente
            </button>
            <button
              onClick={() => applyStatusToSelected("Cancelada")}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Cancelar Venta
            </button>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <FaFileDownload className="inline mr-2" />
            Descargar Ventas
          </button>
        </div>

        {/* Lista de ventas */}
        <h3 className="text-lg font-semibold mb-4">Productos</h3>
        <div className="space-y-4">
          {filteredSales.map((sale) => (
            <div
              key={sale.id}
              className="border rounded-lg p-4 flex items-center gap-4 bg-gray-50"
            >
              <input
                type="checkbox"
                checked={selectedSales.includes(sale.id)}
                onChange={() => toggleSaleSelection(sale.id)}
              />
              <img
                src={sale.product.image}
                alt={sale.product.name}
                className="w-16 h-16 rounded object-cover border"
              />
              <div className="flex-1">
                <h4 className="font-bold">{sale.product.name}</h4>
                <p className="text-sm text-gray-600">ID: {sale.product.id}</p>
                <p className="text-sm">Precio: {sale.product.price}</p>
                <p className="text-sm text-gray-500">
                  Fecha de venta: {sale.date}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`font-semibold ${
                    sale.status === "Pendiente"
                      ? "text-yellow-600"
                      : sale.status === "Hecha"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {sale.status}
                </span>
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  onClick={() => setModalSale(sale)}
                >
                  Ver compra
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de detalles */}
      {modalSale && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Información de la venta</h3>
            <p><strong>Pedido:</strong> {modalSale.orderId}</p>
            <p><strong>Cliente:</strong> {modalSale.customer.name}</p>
            <p><strong>Dirección:</strong> {modalSale.customer.address}</p>
            <p><strong>Email:</strong> {modalSale.customer.email}</p>
            <p><strong>Teléfono:</strong> {modalSale.customer.phone}</p>
            <hr className="my-4" />
            <p><strong>Producto:</strong> {modalSale.product.name}</p>
            <p><strong>ID Producto:</strong> {modalSale.product.id}</p>
            <p><strong>Cantidad:</strong> {modalSale.quantity}</p>

            <div className="text-right mt-6">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setModalSale(null)}
              >
                Volver atrás
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalesPOS;
