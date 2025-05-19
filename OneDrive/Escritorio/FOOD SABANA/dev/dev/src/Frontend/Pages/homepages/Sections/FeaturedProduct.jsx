import React from 'react';
import ProductCard from '../../../Components/cliente/productcard/ProductCard';
import { useProductContext } from '../../../Contexts/ProductContext';

const FeaturedProducts = () => {
  const { products } = useProductContext();

  // Opcional: filtrar solo productos destacados (si tienes ese campo)
  // const featuredProducts = products.filter(p => p.featured);
  // Si no hay filtro, simplemente usar todos:
  const featuredProducts = products;

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Productos Destacados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
