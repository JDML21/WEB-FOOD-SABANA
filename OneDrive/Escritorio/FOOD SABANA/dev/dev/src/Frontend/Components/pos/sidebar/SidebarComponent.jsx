import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const SidebarComponent = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: "mdi:home-outline", text: "Inicio", path: "/pos" },
    { icon: "mdi:cart-outline", text: "Ventas", path: "/pos/ventas" },
    { icon: "mdi:history", text: "Historial", path: "/pos/historial" },
    { icon: "mdi:package-variant", text: "Inventario", path: "/pos/inventario" },
    { icon: "mdi:account-outline", text: "Perfil", path: "/pos/perfil" }
  ];

  const handleProfileClick = () => {
    navigate('/pos/perfil');
  };

  return (
    <>
      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 left-0 h-full z-30 bg-gray-800 text-white transition-all duration-300 ease-in-out
          ${isExpanded ? 'w-64' : 'w-20'}
        `}
      >
        {/* Logo/Nombre de la app (en sidebar) */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {isExpanded && (
            <Link to="/pos" className="text-xl font-bold text-white hover:text-blue-200 transition-colors">
              FoodCampus
            </Link>
          )}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-full hover:bg-gray-700 text-white"
          >
            <Icon icon={isExpanded ? "mdi:chevron-double-left" : "mdi:chevron-double-right"} className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex flex-col h-[calc(100%-60px)]">
          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg transition-colors
                      ${location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-gray-700'}
                    `}
                  >
                    <Icon icon={item.icon} className="w-6 h-6 min-w-[24px]" />
                    {isExpanded && (
                      <span className="ml-3 whitespace-nowrap">{item.text}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Versión contraída del menú de perfil */}
          {!isExpanded && (
            <div className="mt-auto pt-4 border-t border-gray-700">
              <button
                onClick={handleProfileClick}
                className="flex justify-center p-3 rounded-lg hover:bg-gray-700 w-full"
                title="Perfil"
              >
                <Icon icon="mdi:account-circle-outline" className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Espacio para el contenido principal */}
      <div className={`transition-all duration-300 ease-in-out 
        ${isExpanded ? 'pl-64' : 'pl-20'}`}
      >
        {/* El Header debería estar en un componente separado */}
        {/* El contenido de la página se inyectará aquí */}
      </div>
    </>
  );
};

export default SidebarComponent;