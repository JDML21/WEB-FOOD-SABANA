import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container-custom px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div className="space-y-2">
            <Link 
              to="/" 
              className="text-xl font-bold hover:text-gray-300 transition-colors"
            >
              UniFood
            </Link>
            <p className="text-gray-400 text-sm leading-snug">
              Tu plataforma de comida en la universidad. Navega entre los diferentes
              puntos de venta y disfruta de las opciones disponibles.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white mb-4">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-white transition-colors text-sm block py-0.5"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  to="/productos" 
                  className="text-gray-400 hover:text-white text-sm block py-0.5"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link 
                  to="/puntos-venta" 
                  className="text-gray-400 hover:text-white text-sm block py-0.5"
                >
                  Puntos de Venta
                </Link>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className="text-gray-400 hover:text-white text-sm block py-0.5"
                >
                  Ingresar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white mb-4">
              Contacto
            </h3>
            <address className="text-gray-400 not-italic text-sm leading-snug">
              Universidad de la Sabana
              <br />
              <a 
                href="mailto:foodelivery@gmail.com" 
                className="hover:text-white transition-colors"
              >
                foodelivery@gmail.com
              </a>
              <br />
              <a 
                href="tel:+1234567890" 
                className="hover:text-white transition-colors"
              >
                (+123) 456-7890
              </a>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-gray-700 text-center text-gray-400 text-xs">
          <p>&copy; {currentYear} DobleJJ. Todos los derechos reservados.</p>
          <p className="mt-2">
            Diseñado con ❤️ para la comunidad universitaria
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;