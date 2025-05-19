import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { Icon } from '@iconify/react';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

function PointsOfSalePage() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [pointsOfSale] = useState([
    { id: 1, name: "Dulcería La Casa", category: "Dulces", lat: 4.6097, lng: -74.0818 },
    { id: 2, name: "Bebidas Express", category: "Bebidas", lat: 4.6112, lng: -74.0813 },
    { id: 3, name: "Tienda ABC", category: "Ropa", lat: 4.6077, lng: -74.0820 },
  ]);

  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleSearchChange = (e) => setSearch(e.target.value);

  const filteredPoints = pointsOfSale.filter(
    (point) =>
      (category === "" || point.category === category) &&
      point.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-16 min-h-screen flex">
      {/* Sidebar de filtros */}
      <aside className="w-72 bg-white shadow-md p-6 border-r border-gray-200 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center text-xl font-semibold text-blue-600">
            <FaSearch className="mr-2" />
            <span>Buscar puntos de venta</span>
          </div>

          {/* Filtro de categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas las categorías</option>
              <option value="Dulces">Dulces</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Ropa">Ropa</option>
            </select>
          </div>

          {/* Barra de búsqueda */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar local</label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Ej: Dulcería La Casa"
                className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Lista de resultados */}
          <div className="pt-4">
            <h3 className="font-medium text-gray-900 mb-2">Resultados ({filteredPoints.length})</h3>
            <div className="space-y-3">
              {filteredPoints.length > 0 ? (
                filteredPoints.map((point) => (
                  <div key={point.id} className="p-3 border border-gray-200 rounded-md hover:bg-blue-50 transition-colors">
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">{point.name}</h4>
                        <p className="text-sm text-gray-500">{point.category}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No se encontraron resultados</p>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Mapa principal */}
      <main className="flex-1 bg-gray-100">
        <div className="h-[calc(100vh-4rem)] sticky top-16">
          <MapContainer 
            center={[4.6097, -74.0818]} 
            zoom={14} 
            style={{ height: "100%", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {filteredPoints.map((point) => (
              <Marker 
                key={point.id} 
                position={[point.lat, point.lng]}
                icon={new L.Icon({
                  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41]
                })}
              >
                <Popup className="font-sans">
                  <div className="space-y-1">
                    <h3 className="font-bold text-blue-600">{point.name}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <Icon icon="mdi:tag" className="mr-1" />
                      <span>{point.category}</span>
                    </div>
                    <button className="mt-2 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                      Ver detalles
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </main>
    </div>
  );
}

export default PointsOfSalePage;