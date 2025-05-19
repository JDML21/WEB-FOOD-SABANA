import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../../../Contexts/ProductContext";

function Editproductpage() {
  const { id } = useParams();
  const { getProductById, updateProduct } = useProductContext();

  const [localProduct, setLocalProduct] = useState(null);
  const [campoEditando, setCampoEditando] = useState(null);
  const [nuevoValor, setNuevoValor] = useState("");

  useEffect(() => {
    const product = getProductById(id);
    if (product) setLocalProduct(product);
  }, [id, getProductById]);

  if (!localProduct) return <p>Producto no encontrado (ID: {id})</p>;

  const handleEditar = (campo) => {
    setCampoEditando(campo);
    setNuevoValor(localProduct[campo]?.toString() || "");
  };

  const handleGuardar = async () => {
    const valorFinal = isNaN(nuevoValor) ? nuevoValor : Number(nuevoValor);

    const cambios = { [campoEditando]: valorFinal };

    const productoActualizado = await updateProduct(id, cambios);

    if (productoActualizado) {
      setLocalProduct(productoActualizado);
      setCampoEditando(null);
    } else {
      alert("Error al actualizar el producto");
    }
  };

  const handleCancelar = () => {
    setCampoEditando(null);
    setNuevoValor("");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      {/* Encabezado */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <img src={localProduct.imagenUrl} alt="Producto" width={80} height={80} />
        <div>
          <h2 style={{ margin: 0 }}>{localProduct.name}</h2>
          <p style={{ color: "gray" }}>ID: {localProduct.id}</p>
        </div>
      </div>

      {/* Información editable */}
      <div
        style={{
          marginTop: "2rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1.5rem",
          background: "#fafafa",
        }}
      >
        {[
          { label: "Nombre", campo: "name" },
          { label: "Descripción", campo: "description" },
          { label: "Cantidad disponible", campo: "cantidad" },
          { label: "Precio", campo: "price" },
          { label: "Imagen (URL)", campo: "imagenUrl" },
        ].map(({ label, campo }) => (
          <div
            key={campo}
            style={{
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{label}:</strong> <span>{localProduct[campo]?.toString()}</span>
            </div>
            <button onClick={() => handleEditar(campo)}>Editar</button>
          </div>
        ))}
      </div>

      {/* Modal de edición */}
      {campoEditando && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "400px",
            }}
          >
            <h3>Editar {campoEditando}</h3>
            <p>
              <strong>Actual:</strong> {localProduct[campoEditando]}
            </p>
            <input
              type="text"
              value={nuevoValor}
              onChange={(e) => setNuevoValor(e.target.value)}
              style={{ width: "100%", marginBottom: "1rem" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={handleGuardar}>Guardar</button>
              <button onClick={handleCancelar}>Volver atrás</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Editproductpage;
