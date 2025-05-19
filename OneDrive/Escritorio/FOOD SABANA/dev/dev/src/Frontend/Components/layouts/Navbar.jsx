import { useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/authContext";

const Navbar = ({ toggleSidebar }) => {
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setShowLogoutMenu(false);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-blue-600 shadow-md h-16 flex items-center px-4">
      {/* Botón para sidebar */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg hover:bg-blue-700 mr-2 text-white transition-colors"
        aria-label="Alternar menú"
      >
        <Icon icon="mdi:menu" className="w-6 h-6" />
      </button>

      {/* Logo/Nombre */}
      <Link
        to="/pos"
        className="flex items-center hover:text-blue-200 transition-colors min-w-[120px]"
      >
        <Icon icon="mdi:food" className="w-8 h-8 text-white mr-2" />
        <h1 className="text-xl font-bold text-white hidden sm:block">FoodPOS</h1>
      </Link>

      {/* Espacio flexible para centrar el logo */}
      <div className="flex-1"></div>

      {/* Iconos de acción (derecha) */}
      <div className="flex items-center space-x-3 ml-2">
        {/* Notificaciones */}
        <button 
          className="p-2 rounded-full hover:bg-blue-700 relative text-white transition-colors"
          aria-label="Notificaciones"
        >
          <Icon icon="mdi:bell-outline" className="w-6 h-6" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* Perfil y menú logout */}
        <div className="relative">
          <button
            onClick={() => setShowLogoutMenu(!showLogoutMenu)}
            className="p-2 rounded-full hover:bg-blue-700 text-white transition-colors"
            aria-label="Menú de usuario"
          >
            <Icon icon="mdi:account-circle-outline" className="w-6 h-6" />
          </button>

          {showLogoutMenu && (
            <>
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Icon icon="mdi:logout-variant" className="w-5 h-5 mr-2 text-gray-500" />
                  Cerrar sesión
                </button>
              </div>
              <div
                className="fixed inset-0 z-40 bg-transparent"
                onClick={() => setShowLogoutMenu(false)}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;