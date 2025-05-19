import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./authContext";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { getToken } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar productos
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/productos");
      
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }

      const data = await res.json();

      const formatted = Object.entries(data).map(([id, value]) => ({
        id,
        name: value.nombre || "",
        description: value.descripcion || "",
        price: value.precio || 0,
        imagenUrl: value.imagenUrl || "",
        cantidad: value.cantidad || 0,
        categoria: value.categoria || "",
      }));

      setProducts(formatted);
      setError(null);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar productos al iniciar
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Función de búsqueda
  const buscarProductos = useCallback((query) => {
    if (!query.trim()) return products;
    
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.categoria.toLowerCase().includes(searchTerm)
    );
  }, [products]);

  // Actualizar producto
  const updateProduct = async (id, updatedFields) => {
    try {
      const token = await getToken();
      if (!token) throw new Error("No autenticado");

      const res = await fetch(`http://localhost:5000/api/productos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      });

      if (!res.ok) throw new Error("Error al actualizar producto");

      const updatedProduct = await res.json();

      setProducts(prev =>
        prev.map(prod =>
          prod.id.toString() === id.toString()
            ? { ...prod, ...updatedFields }
            : prod
        )
      );

      return updatedProduct;
    } catch (error) {
      console.error("Error en updateProduct:", error);
      throw error;
    }
  };

  // Obtener producto por ID
  const getProductById = useCallback((id) => {
    return products.find(p => p.id.toString() === id.toString());
  }, [products]);

  // Refrescar productos
  const refreshProducts = async () => {
    await fetchProducts();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        buscarProductos,
        updateProduct,
        getProductById,
        refreshProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Exportar ambos hooks para mayor flexibilidad
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext debe usarse dentro de un ProductProvider");
  }
  return context;
};

// Alias para compatibilidad con tu Navbar
export const useProductos = () => useProductContext();