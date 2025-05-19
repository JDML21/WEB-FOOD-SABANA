import React, { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/authContext';
import { useNavigate, Link } from 'react-router-dom';
import homeImage from '../Assets/home.jpg';

const Login = () => {
  const { login, error, isAuthenticated, userRole } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      // Redirigir dependiendo del rol del usuario
      if (userRole === 'Cliente') {
        navigate('/client');
      } else if (userRole === 'POS') {
        navigate('/pos');
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, userRole, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password); // Realizar login

    // Verificar si el usuario está autenticado después de intentar iniciar sesión
    if (isAuthenticated) {
      // Redirigir dependiendo del rol del usuario
      if (userRole === 'Cliente') {
        navigate('/client');
      } else if (userRole === 'POS') {
        navigate('/pos');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <img src={homeImage} alt="Biblioteca" style={styles.image} />
      </div>

      <div style={styles.right}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.logo}>🔵</div>
          <h2 style={styles.title}>Iniciar Sesión</h2>

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>ENTRAR</button>

          {error && <p style={styles.error}>{error}</p>}

          <p style={styles.register}>
            ¿No tienes cuenta? <Link to="/register" style={styles.link}>Regístrate aquí</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#1e1e1e',
  },
  left: {
    flex: 1,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  right: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
  },
  logo: {
    fontSize: '40px',
    textAlign: 'center',
    marginBottom: '10px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    marginBottom: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#1E5BF0',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  },
  register: {
    textAlign: 'center',
    marginTop: '10px',
  },
  link: {
    color: '#1E5BF0',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Login;
