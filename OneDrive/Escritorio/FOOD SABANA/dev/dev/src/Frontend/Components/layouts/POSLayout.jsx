import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from '../pos/sidebar/SidebarComponent';

const POSLayout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar con botón para toggle del sidebar */}
      <Navbar toggleSidebar={toggleSidebar} />
      
      {/* Contenedor principal flexible */}
      <div className="flex flex-1 pt-16"> {/* pt-16 para compensar el Navbar fijo */}
        {/* Sidebar */}
        <Sidebar isExpanded={isSidebarExpanded} />
        
        {/* Contenido principal con transición */}
        <main 
          className={`flex-1 transition-all duration-300 ${
            isSidebarExpanded ? 'ml-64' : 'ml-20'
          } p-6`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default POSLayout;