import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
      <Link to={`/client/product/${product.id}`}>
        {/* Contenedor de imagen con relación de aspecto 1:1 */}
        <div className="relative pt-[100%]">
          <img
            src={product.imagenUrl}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        
        {/* Contenido de la tarjeta */}
        <div className="p-3">
          <h3 className="font-medium text-gray-800 text-sm line-clamp-2 mb-1">{product.name}</h3>
          <p className="text-gray-500 text-xs line-clamp-2 mb-2">{product.description}</p>
          
          <div className="flex justify-between items-center">
            <p className="text-blue-600 font-bold text-sm">
              {product.price !== undefined && !isNaN(product.price)
                ? `$${Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                : "Precio no disponible"}
            </p>
            
            {product.rating !== undefined && (
              <div className="flex items-center">
                <span className="text-yellow-500 text-xs mr-1">⭐</span>
                <span className="text-xs text-gray-600">{product.rating}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;