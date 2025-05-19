import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <Link to={`/pos/products/${product.id}`}>
        <img
          src={product.imagenUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm">{product.description}</p>
        <p className="text-primary font-bold text-lg mt-2">
  {product.price !== undefined && !isNaN(product.price)
    ? `$${Number(product.price).toFixed(2)}`
    : "Precio no disponible"}
</p>

      </Link>
    </div>
  );
};

export default ProductCard;
