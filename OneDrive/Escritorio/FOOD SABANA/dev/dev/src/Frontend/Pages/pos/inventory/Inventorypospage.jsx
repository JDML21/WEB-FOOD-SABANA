import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';

const Inventorypospage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/productos');
        const data = await res.json();

        const formatted = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
          isPaused: value.isPaused || false,
        }));

        setProducts(formatted);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter(
      (product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory ? product.categoria === filterCategory : true)
    )
    .sort((a, b) => {
      if (sortOrder === "alfabetico") return a.nombre.localeCompare(b.nombre);
      if (sortOrder === "letra") return a.nombre[0].localeCompare(b.nombre[0]);
      return 0;
    });

  const toggleProductSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleBulkAction = (action) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (!selectedProducts.includes(p.id)) return p;
        if (action === "pausar") return { ...p, isPaused: true };
        if (action === "reactivar") return { ...p, isPaused: false };
        return p;
      })
    );
    if (action === "eliminar") {
      setProducts((prev) =>
        prev.filter((p) => !selectedProducts.includes(p.id))
      );
    }
    if (action === "modificar" && selectedProducts.length === 1) {
      navigate(`/pos/products/modificar/${selectedProducts[0]}`);
    }
    setSelectedProducts([]);
  };

  const handleDownloadInventory = () => {
    console.log("Descargando inventario...");
  };

  const handleAddNewProduct = () => {
    navigate("/pos/productos/agregar");
  };

  const handleViewProduct = (id) => {
    navigate(`/pos/products/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Contenedor principal */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Icon icon="mdi:package-variant" className="text-2xl" />
            Inventario POS
          </h1>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          {/* Filtros - Mismo diseño del primer código pero con misma funcionalidad */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <Icon icon="mdi:magnify" className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar producto..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <Icon icon="mdi:filter" className="absolute left-3 top-3 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">Filtrar por Categoría</option>
                <option value="bebida">Bebida</option>
                <option value="postre">Postre</option>
              </select>
            </div>
            
            <div className="relative">
              <Icon icon="mdi:sort" className="absolute left-3 top-3 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Ordenar por</option>
                <option value="alfabetico">Orden alfabético</option>
                <option value="letra">Orden por letra</option>
              </select>
            </div>
          </div>

          {/* Acciones - Mismo diseño del primer código pero con misma funcionalidad */}
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Pausar", icon: "mdi:pause", color: "bg-gray-600", action: "pausar" },
                { label: "Reactivar", icon: "mdi:play", color: "bg-blue-600", action: "reactivar" },
                { label: "Eliminar", icon: "mdi:delete", color: "bg-red-600", action: "eliminar" },
                { label: "Modificar", icon: "mdi:pencil", color: "bg-yellow-500", action: "modificar" },
              ].map(({ label, icon, color, action }) => (
                <button
                  key={action}
                  onClick={() => handleBulkAction(action)}
                  disabled={selectedProducts.length === 0 || (action === "modificar" && selectedProducts.length > 1)}
                  className={`${color} text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition disabled:opacity-50`}
                >
                  <Icon icon={icon} className="text-lg" />
                  {label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleDownloadInventory}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition"
              >
                <Icon icon="mdi:download" className="text-lg" />
                Descargar Inventario
              </button>
              <button
                onClick={handleAddNewProduct}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition"
              >
                <Icon icon="mdi:plus" className="text-lg" />
                Agregar Producto
              </button>
            </div>
          </div>

          {/* Lista de productos - Mismo diseño del primer código pero con misma funcionalidad */}
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`relative border rounded-lg p-4 flex items-center gap-4 bg-gray-50 shadow-sm transition-all ${
                  product.isPaused ? "opacity-70" : ""
                } ${
                  selectedProducts.includes(product.id) ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => toggleProductSelect(product.id)}
                  className="absolute top-3 left-3 w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
                />
                <img
                  src={product.imagenUrl || "https://via.placeholder.com/64"}
                  alt={product.nombre}
                  className="w-16 h-16 rounded object-cover border"
                />
                <div className="flex-1 pl-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-800">{product.nombre}</h4>
                      <p className="text-sm text-gray-600">ID: {product.id}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.cantidad > 5 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {product.cantidad} en stock
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm font-medium text-blue-600">${product.precio}</p>
                    <button
                      onClick={() => handleViewProduct(product.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center gap-1"
                    >
                      <Icon icon="mdi:eye-outline" className="text-sm" />
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventorypospage;