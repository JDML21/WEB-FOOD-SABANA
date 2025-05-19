// Contexts/CartContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated, getToken, userRole } = useAuth();
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Persistencia local
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Funciones de carrito 👇👇👇
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Fetch de historial (POS o cliente)
  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const token = await getToken();
      if (!token) throw new Error("No token disponible");

       const endpoint = "http://localhost:5000/api/historial";

        

      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al obtener historial");

      const data = await res.json();
      const orders = Array.isArray(data) ? data : Object.values(data);
      setPurchaseHistory(orders);
    } catch (err) {
      console.error("Error cargando historial/ventas:", err);
      setPurchaseHistory([]);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return setPurchaseHistory([]);
    fetchHistory();
  }, [isAuthenticated, userRole]);

  const confirmPurchase = async () => {
    if (userRole === "pos" || cart.length === 0) return false;

    const token = await getToken();
    if (!token) return false;

    const order = {
      date: new Date().toISOString(),
      products: cart.map(({ id, name, price, quantity, image, description }) => ({
        id,
        name,
        price,
        quantity,
        image: image || "",
        description: description || "",
      })),
      total: cart.reduce((s, it) => s + it.price * it.quantity, 0),
      status: "Pendiente",
    };

    try {
      await fetch("http://localhost:5000/api/historial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });
      await fetchHistory();
      setCart([]);
      return true;
    } catch (err) {
      console.error("Error guardando historial:", err);
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        purchaseHistory,
        loadingHistory,
        confirmPurchase,
        fetchHistory,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
};
