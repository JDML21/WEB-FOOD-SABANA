import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../../../Contexts/CartContext';
import { useProductContext } from '../../../Contexts/ProductContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useProductContext();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: '',
  });

  useEffect(() => {
    const foundProduct = products.find((p) => p.id.toString() === id.toString());
    setProduct(foundProduct);

    const storedReviews = localStorage.getItem(`reviews_${id}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, [id, products]);

  const handleAddToCart = () => {
    addToCart(product);
    alert('Producto agregado al carrito');
  };

  const handleBuyNow = () => {
    addToCart(product);
    alert('Producto agregado al carrito y redirigiendo...');
    navigate('/carrito');
  };

  const handleReviewChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const review = {
      ...newReview,
      date: new Date().toLocaleDateString(),
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
    setNewReview({ name: '', rating: 5, comment: '' });
  };

  if (!product) return <p className="text-center mt-10">Cargando producto...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Imagen del producto */}
        <div className="relative">
          <img
            src={product.imagenUrl || 'https://via.placeholder.com/500'}
            alt={product.name}
            className="w-full h-96 object-contain rounded-lg shadow-lg bg-white p-4"
          />
          {product.cantidad <= 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              AGOTADO
            </div>
          )}
        </div>

        {/* Detalles del producto */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {'★'.repeat(4)}{'☆'.repeat(1)}
            </div>
            <span className="text-sm text-gray-500">(24 reseñas)</span>
          </div>
          
          <p className="text-gray-600 text-lg">{product.description}</p>
          
          <div className="flex items-center space-x-4">
            <p className="text-2xl font-bold text-blue-600">
              ${Number(product.price).toLocaleString('es-CO', { minimumFractionDigits: 2 })}
            </p>
            {product.originalPrice && (
              <p className="text-lg text-gray-400 line-through">
                ${Number(product.originalPrice).toLocaleString('es-CO')}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Entrega estimada:</span> {product.estimatedDelivery || '2-3 días hábiles'}
            </p>
            <p className={`text-sm font-medium ${product.cantidad > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.cantidad > 0 ? `Disponible (${product.cantidad} unidades)` : 'Agotado'}
            </p>
          </div>

          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleAddToCart}
              disabled={product.cantidad === 0}
              className={`px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                product.cantidad > 0 
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-md' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Agregar al carrito
            </button>

            <button
              onClick={handleBuyNow}
              disabled={product.cantidad === 0}
              className={`px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                product.cantidad > 0 
                  ? 'bg-green-600 hover:bg-green-700 shadow-md' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Comprar ahora
            </button>
          </div>
        </div>
      </div>

      {/* Sección de reseñas */}
      <div className="mt-12 bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Reseñas de clientes</h2>
        
        {/* Formulario de reseña */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-xl font-semibold mb-4">Agregar tu reseña</h3>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                value={newReview.name}
                onChange={handleReviewChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Calificación</label>
              <select
                name="rating"
                value={newReview.rating}
                onChange={handleReviewChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} estrellas
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reseña</label>
              <textarea
                name="comment"
                placeholder="Escribe tu reseña aquí..."
                value={newReview.comment}
                onChange={handleReviewChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
            >
              Enviar reseña
            </button>
          </form>
        </div>

        {/* Lista de reseñas */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Reseñas ({reviews.length})
          </h3>
          
          {reviews.length === 0 ? (
            <p className="text-gray-500 italic text-center py-8">
              Aún no hay reseñas para este producto. Sé el primero en opinar.
            </p>
          ) : (
            <ul className="space-y-6">
              {reviews.map((review, index) => (
                <li key={index} className="bg-white p-6 rounded-lg shadow border border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-800">{review.name}</h4>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <div className="text-yellow-400 text-lg">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;