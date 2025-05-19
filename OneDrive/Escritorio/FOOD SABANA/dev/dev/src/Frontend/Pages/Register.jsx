import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/authContext';
import { Icon } from '@iconify/react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Cliente');
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(email, password, '', '', role);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Encabezado con degradado */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Crear una cuenta</h2>
          <p className="text-blue-100 mt-1">Únete a nuestra plataforma</p>
        </div>

        <form onSubmit={handleRegister} className="p-6 space-y-6">
          {/* Campo Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="mdi:email-outline" className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="mdi:lock-outline" className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Campo Rol */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Tipo de cuenta</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="mdi:account-box-outline" className="h-5 w-5 text-gray-400" />
              </div>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="Cliente">Cliente</option>
                <option value="POS">Punto de Venta</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Icon icon="mdi:chevron-down" className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="flex items-center p-3 bg-red-50 text-red-700 rounded-lg">
              <Icon icon="mdi:alert-circle-outline" className="h-5 w-5 mr-2" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Botón de registro */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Icon icon="mdi:account-plus-outline" className="h-5 w-5 mr-2" />
            Registrarse
          </button>

          {/* Enlace a login */}
          <div className="text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <button 
              onClick={() => navigate('/login')} 
              className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
            >
              Inicia sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;