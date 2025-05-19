import React, { useState } from "react";
import {
  FaCreditCard,
  FaInfoCircle,
  FaCog,
} from "react-icons/fa";
import flecha from "../../../Assets/flecha.png";
import profileImg from "../../../Assets/profile.jpg";

function ProfilePage() {
  const user = {
    name: "Juan Pérez",
    email: "juanperez@example.com",
    picture: profileImg,
  };

  const [modal, setModal] = useState(null); // puede ser: 'informacion', 'cuenta', 'metodo'

  // Formularios controlados
  const [nombre, setNombre] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState("juan_perez");
  const [password, setPassword] = useState("");
  const [tarjeta, setTarjeta] = useState("**** **** **** 1234");

  const closeModal = () => setModal(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cambios guardados correctamente");
    closeModal();
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Mi Perfil</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Administra tu información personal y configuración de cuenta
          </p>
        </div>

        {/* Contenido principal */}
        <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
          {/* Usuario */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-6 rounded-lg mb-6">
            <div className="mb-4 sm:mb-0 text-center sm:text-left">
              <h2 className="text-lg font-bold">{nombre}</h2>
              <p className="text-gray-600 text-sm">{email}</p>
            </div>
            <img
              src={user.picture}
              alt="Perfil"
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
            />
          </div>

          {/* Opciones de perfil */}
          <div className="space-y-3">
            <div
              onClick={() => setModal("informacion")}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:shadow cursor-pointer transition-all"
            >
              <div className="flex items-center space-x-3">
                <FaInfoCircle className="text-blue-600 text-lg" />
                <div>
                  <h3 className="font-medium">Tu información</h3>
                  <p className="text-xs text-gray-600">
                    Nombre del usuario y datos de identificación
                  </p>
                </div>
              </div>
              <img src={flecha} alt="Flecha" className="w-3 h-3" />
            </div>

            <div
              onClick={() => setModal("cuenta")}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:shadow cursor-pointer transition-all"
            >
              <div className="flex items-center space-x-3">
                <FaCog className="text-blue-600 text-lg" />
                <div>
                  <h3 className="font-medium">Datos de la cuenta</h3>
                  <p className="text-xs text-gray-600">
                    Datos que representan a la cuenta en la aplicación
                  </p>
                </div>
              </div>
              <img src={flecha} alt="Flecha" className="w-3 h-3" />
            </div>

            <div
              onClick={() => setModal("metodo")}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:shadow cursor-pointer transition-all"
            >
              <div className="flex items-center space-x-3">
                <FaCreditCard className="text-blue-600 text-lg" />
                <div>
                  <h3 className="font-medium">Método de pago</h3>
                  <p className="text-xs text-gray-600">Métodos de pago agregados</p>
                </div>
              </div>
              <img src={flecha} alt="Flecha" className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* MODALES */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg w-full max-w-sm mx-4">
            <h2 className="text-lg font-bold mb-3">
              {modal === "informacion"
                ? "Editar Información Personal"
                : modal === "cuenta"
                ? "Editar Datos de Cuenta"
                : "Editar Método de Pago"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {modal === "informacion" && (
                <>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Nombre"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Email"
                  />
                </>
              )}

              {modal === "cuenta" && (
                <>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Nombre de usuario"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Nueva contraseña"
                  />
                </>
              )}

              {modal === "metodo" && (
                <>
                  <input
                    type="text"
                    value={tarjeta}
                    onChange={(e) => setTarjeta(e.target.value)}
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Número de tarjeta"
                  />
                </>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-3 py-1.5 bg-gray-200 rounded text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;