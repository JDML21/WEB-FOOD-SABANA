import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useAuth } from '../../../Contexts/authContext'; // Asegúrate de que la ruta sea correcta

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { logout } = useAuth(); // Obtenemos la función logout del contexto

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Buscar producto:", searchQuery);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowProfileMenu(false);
      // No necesitas redirigir aquí si tienes un useEffect en tu App que maneja la autenticación
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-blue-500 shadow-md h-16 flex items-center px-4">
      {/* Logo */}
      <Link 
        to="/client" 
        className="text-xl font-bold text-white mr-6 hover:text-blue-200 transition-colors"
      >
        FoodCampus
      </Link>

      {/* Barra de búsqueda */}
      <form 
        onSubmit={handleSearchSubmit} 
        className="flex items-center flex-1 max-w-md mr-4"
      >
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Buscar producto..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
          <Icon 
            icon="mdi:magnify" 
            className="absolute left-3 top-2.5 text-gray-400 w-5 h-5"
          />
        </div>
      </form>

      {/* Navegación principal (solo desktop) */}
      <nav className="hidden md:flex items-center space-x-6 mr-4">
        <Link 
          to="/client/categorias" 
          className="text-white hover:text-blue-200 transition-colors text-sm font-medium"
        >
          Categorías
        </Link>
        <Link 
          to="/client/puntos-de-venta" 
          className="text-white hover:text-blue-200 transition-colors text-sm font-medium"
        >
          Puntos de venta
        </Link>
        <Link 
          to="/client/carrito" 
          className="text-white hover:text-blue-200 transition-colors text-sm font-medium"
        >
          Carrito
        </Link>
        <Link 
          to="/client/historial" 
          className="text-white hover:text-blue-200 transition-colors text-sm font-medium"
        >
          Historial
        </Link>
      </nav>

      {/* Iconos de acción */}
      <div className="flex items-center space-x-4 ml-auto">
        {/* Icono de carrito (solo mobile) */}
        <Link 
          to="/client/carrito" 
          className="md:hidden p-2 rounded-full hover:bg-blue-600 relative"
        >
          <Icon icon="mdi:cart-outline" className="w-6 h-6 text-white" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </Link>
        
        {/* Notificaciones */}
        <button className="p-2 rounded-full hover:bg-blue-600 relative">
          <Icon icon="mdi:bell-outline" className="w-6 h-6 text-white" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* Menú de perfil */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="p-2 rounded-full hover:bg-blue-600 flex items-center"
          >
            <Icon icon="mdi:account-circle-outline" className="w-6 h-6 text-white" />
            <span className="ml-1 px-1 hidden md:inline-block text-sm font-medium text-white">Mi Perfil</span>
          </button>
          
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <Link
                to="/client/perfil"
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                onClick={() => setShowProfileMenu(false)}
              >
                Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;