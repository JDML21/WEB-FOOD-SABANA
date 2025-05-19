import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/authContext";

function NewProductPage() {
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    cantidad: "",
    precio: "",
    imagenUrl: "", // Esperamos URL aquí
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener token desde contexto (Firebase)
    const token = await getToken();

    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión de nuevo.");
      return;
    }

    // Validar campos básicos
    if (!product.nombre || !product.precio || !product.cantidad) {
      alert("Por favor, completa los campos obligatorios.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: product.nombre,
          descripcion: product.descripcion,
          cantidad: parseInt(product.cantidad),
          precio: parseFloat(product.precio),
          imagenUrl: product.imagenUrl,
          disponible: true,
        }),
      });

      if (!res.ok) {
        throw new Error("Error al crear producto");
      }

      alert("Producto creado exitosamente");
      navigate("/pos/inventario");
    } catch (error) {
      console.error(error);
      alert("Error al crear producto");
    }
  };

  return (
    <div className="flex justify-center py-10 bg-gray-50 min-h-screen">
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Nuevo producto</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Nombre del producto</label>
            <input
              name="nombre"
              value={product.nombre}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Descripción</label>
            <textarea
              name="descripcion"
              value={product.descripcion}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              rows="3"
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1">Cantidad disponible</label>
            <input
              type="number"
              name="cantidad"
              value={product.cantidad}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
              min={0}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Precio</label>
            <input
              type="number"
              step="0.01"
              name="precio"
              value={product.precio}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
              min={0}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">URL de la imagen</label>
            <input
              name="imagenUrl"
              value={product.imagenUrl}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="https://example.com/imagen.jpg"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/pos/inventario")}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Volver atrás
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProductPage;
