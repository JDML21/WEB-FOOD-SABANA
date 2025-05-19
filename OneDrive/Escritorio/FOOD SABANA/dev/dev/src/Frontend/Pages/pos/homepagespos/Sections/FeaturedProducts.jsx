import React from "react";
import ProductCard from "../../../../Components/pos/productcard/ProductCard";
import { useProductContext } from "../../../../Contexts/ProductContext";

const FeaturedProducts = () => {
  const { products } = useProductContext(); // 🔁 Consumimos desde el contexto

  return (
    <section className="py-10 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Mis productos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No hay productos disponibles
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
