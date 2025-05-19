import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Frontend/Contexts/authContext';
import { CartProvider } from './Frontend/Contexts/CartContext';
import { ProductProvider } from './Frontend/Contexts/ProductContext';
import ProtectedRoute from './Frontend/Components/ProtectRoute';

import ClientLayout from "./Frontend/Components/layouts/ClientLayout";
import POSLayout from './Frontend/Components/layouts/POSLayout';

import Login from './Frontend/Pages/Login';
import Register from './Frontend/Pages/Register';
import Unauthorized from './Frontend/Pages/unauto';

// CLIENTE PAGES
import HomePage from "./Frontend/Pages/homepages/HomePage";
import CategoriesPage from "./Frontend/Pages/cliente/categories/CategoriesPage";
import ProductPage from "./Frontend/Pages/cliente/products/ProductPage";
import CartPage from "./Frontend/Pages/cliente/cart/CartPage";
import PerfilPage from "./Frontend/Pages/cliente/profile/ProfilePage";
import HistoryPage from "./Frontend/Pages/cliente/saleshistoryclient/saleshistoryclient";
import PointsOfSalePage from "./Frontend/Pages/cliente/pointsOfSale/PointsOfSalePage";

// POS PAGES
import POSHomePage from "./Frontend/Pages/pos/homepagespos/POSHomepage";
import POSProductPage from "./Frontend/Pages/pos/productspos/ProductsposPage";
import InventoryPage from "./Frontend/Pages/pos/inventory/Inventorypospage";
import Profilepagepos from "./Frontend/Pages/pos/profilePos/Profilepagepos";
import Editproductpage from "./Frontend/Pages/pos/Modify/Editproductpage";
import Saleshistorypos from "./Frontend/Pages/pos/saleshistorypos/Saleshistorypos";
import Sales from "./Frontend/Pages/pos/sales/Salespos";
import Newproduct from "./Frontend/Pages/pos/Newproduct/Newprorduct";

function App() {
  return (
    <AuthProvider> {/* ✅ Primero AuthProvider */}
      <ProductProvider> {/* Luego ProductProvider */}
        <CartProvider> {/* Luego CartProvider */}
          <Router>
            <Routes>
              {/* Auth Pages */}
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* CLIENTE PROTECTED */}
              <Route
                path="/client"
                element={
                  <ProtectedRoute role="Cliente">
                    <ClientLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<HomePage />} />
                <Route path="categorias" element={<CategoriesPage />} />
                <Route path="product/:id" element={<ProductPage />} />
                <Route path="carrito" element={<CartPage />} />
                <Route path="perfil" element={<PerfilPage />} />
                <Route path="historial" element={<HistoryPage />} />
                <Route path="puntos-de-venta" element={<PointsOfSalePage />} />
              </Route>

              {/* POS PROTECTED */}
              <Route
                path="/pos"
                element={
                  <ProtectedRoute role="POS">
                    <POSLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<POSHomePage />} />
                <Route path="products/:id" element={<POSProductPage />} />
                <Route path="inventario" element={<InventoryPage />} />
                <Route path="perfil" element={<Profilepagepos />} />
                <Route path="products/modificar/:id" element={<Editproductpage />} />
                <Route path="historial" element={<Saleshistorypos />} />
                <Route path="ventas" element={<Sales />} />
                <Route path="productos/agregar" element={<Newproduct />} />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
