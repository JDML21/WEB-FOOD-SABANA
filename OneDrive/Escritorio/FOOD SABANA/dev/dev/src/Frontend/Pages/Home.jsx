import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Contexts/authContext';

const Home = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div>
      <h1>Bienvenido al sistema</h1>
      {isAuthenticated ? (
        <>
          <p>Sesión iniciada como: {user.email}</p>
          <button onClick={logout}>Cerrar sesión</button>
          <br />
          <Link to="/pos">Ir a Página POS</Link><br />
          <Link to="/cliente">Ir a Página Cliente</Link>
        </>
      ) : (
        <Link to="/login">Iniciar Sesión</Link>
      )}
    </div>
  );
};

export default Home;
