// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div>
            <Link to="/" className="text-2xl font-bold">
              UniFood
            </Link>
            <p className="mt-2 text-gray-400">
              Tu plataforma de comida en la universidad. Navega entre los diferentes
              puntos de venta y disfruta de las opciones disponibles.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/productos" className="text-gray-400 hover:text-white">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/puntos-venta" className="text-gray-400 hover:text-white">
                  Puntos de Venta
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white">
                  Ingresar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <p className="text-gray-400">
              Universidad de la Sabana
              <br />
              foodelivery@gmail.com
              <br />
              (+123) 456-7890
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {currentYear} DobleJJ. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;