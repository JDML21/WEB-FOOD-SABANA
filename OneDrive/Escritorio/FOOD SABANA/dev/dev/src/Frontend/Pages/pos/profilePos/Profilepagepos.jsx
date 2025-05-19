import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaHistory, FaInfoCircle, FaCog } from "react-icons/fa";
import flecha from "../../../Assets/flecha.png";
import profileImg from "../../../Assets/profile.jpg";

function ProfilePOS() {
  const user = {
    name: "Operador POS",
    email: "operador@punto-venta.com",
    picture: profileImg,
  };

  const [modal, setModal] = useState(null);
  const [nombre, setNombre] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState("operador_01");
  const [password, setPassword] = useState("");

  const closeModal = () => setModal(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cambios guardados correctamente");
    closeModal();
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Mi Perfil POS</h1>
        <div className="flex items-center mt-2">
          <Link 
            to="/pos" 
            className="text-blue-600 hover:underline"
          >
            Inicio
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">Perfil</span>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto">
        {/* Usuario */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-6 rounded-lg mb-8 shadow-sm border border-gray-200">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-gray-800">{nombre}</h2>
            <p className="text-gray-600">{email}</p>
            <p className="text-sm text-gray-500 mt-1">Operador de Punto de Venta</p>
          </div>
          <img
            src={user.picture}
            alt="Perfil"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow"
          />
        </div>

        {/* Opciones */}
        <div className="space-y-4">
          <div
            onClick={() => setModal("informacion")}
            className="flex items-center justify-between bg-gray-50 p-5 rounded-lg hover:shadow-md cursor-pointer transition-all border border-gray-200"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaInfoCircle className="text-blue-600 text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Información personal</h3>
                <p className="text-sm text-gray-600">
                  Nombre y contacto del operador
                </p>
              </div>
            </div>
            <img src={flecha} alt="Flecha" className="w-4 h-4 opacity-70" />
          </div>

          <div
            onClick={() => setModal("cuenta")}
            className="flex items-center justify-between bg-gray-50 p-5 rounded-lg hover:shadow-md cursor-pointer transition-all border border-gray-200"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaCog className="text-blue-600 text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Configuración de cuenta</h3>
                <p className="text-sm text-gray-600">
                  Cambiar usuario o contraseña
                </p>
              </div>
            </div>
            <img src={flecha} alt="Flecha" className="w-4 h-4 opacity-70" />
          </div>
        </div>
      </div>

      {/* MODALES */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {modal === "informacion"
                  ? "Editar Información Personal"
                  : "Configuración de Cuenta"}
              </h2>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {modal === "informacion" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                      placeholder="Nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                      placeholder="Email"
                    />
                  </div>
                </>
              )}

              {modal === "cuenta" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre de usuario
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                      placeholder="Nombre de usuario"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nueva contraseña
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                      placeholder="Nueva contraseña"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePOS;