import React from "react";
import { useProductContext } from "../../../Contexts/ProductContext";
import ProductCard from "../../../Components/cliente/productcard/ProductCard";

function Hero() {
  const { products } = useProductContext();
  const featuredProducts = products.filter((p) => p.featured); // O simplemente usar products

  return (
    <section className="relative overflow-hidden bg-blue-50 py-12">
      {/* Formas decorativas de fondo */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-100 opacity-70"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-200 opacity-50"></div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Sección de texto */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              <span className="text-blue-600">Comida universitaria</span><br />
              entregada en tu lugar de estudio
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Pide desde cualquier punto del campus y recibe en menos de 30 minutos.
              Menú variado con opciones para todos los gustos.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition-colors">
                Ordenar ahora
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg transition-colors">
                Ver promociones
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm">Entrega rápida</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <span className="text-sm">Pago seguro</span>
              </div>
            </div>
          </div>

          {/* Sección de productos destacados */}
          <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
            <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">
              Prueba nuestros destacados
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Indicadores simulados */}
            <div className="flex justify-center mt-4">
              <button className="mx-1.5 w-2.5 h-2.5 rounded-full bg-blue-600"></button>
              <button className="mx-1.5 w-2.5 h-2.5 rounded-full bg-gray-300"></button>
              <button className="mx-1.5 w-2.5 h-2.5 rounded-full bg-gray-300"></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
