import { Link } from "react-router-dom";

function CallToAction() {
  return (
    <section className="py-12 bg-secondary text-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">¿Tienes hambre?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Explora nuestra selección de productos, realiza tu pedido y recógelo
          sin esperar largas filas.
        </p>
        <Link
          to="/client/categorias"
          className="bg-white text-secondary px-6 py-3 rounded-md font-medium hover:bg-gray-100 inline-block"
        >
          Explorar Ahora
        </Link>
      </div>
    </section>
  );
}

export default CallToAction;
