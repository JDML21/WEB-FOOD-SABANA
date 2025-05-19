import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './Frontend/Contexts/authContext';
import { ProductProvider } from './Frontend/Contexts/ProductContext';
import { CartProvider } from './Frontend/Contexts/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductProvider>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </ProductProvider>
  </React.StrictMode>
);
