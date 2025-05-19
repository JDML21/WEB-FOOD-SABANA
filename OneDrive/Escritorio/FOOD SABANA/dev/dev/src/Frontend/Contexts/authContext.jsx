import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updatePassword,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { app } from '../firebaseConfig';

const auth = getAuth(app);
const db = getFirestore(app);

const AuthContext = createContext({
  user: null,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  changePassword: async () => {},
  getToken: async () => {},
  isAuthenticated: false,
  userRole: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Configura persistencia de sesión para que se cierre al cerrar pestaña/navegador
  useEffect(() => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Persistencia configurada exitosamente
      })
      .catch((error) => {
        console.error('Error al configurar persistencia:', error);
      });
  }, []);

  const saveSession = (userData, role) => {
    setUser(userData);
    setUserRole(role);
    setIsAuthenticated(true);
    localStorage.setItem('role', role);
    localStorage.setItem('email', userData.email);
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Refresca token para custom claims actualizados
      await firebaseUser.getIdToken(true);

      const docRef = doc(db, 'users', firebaseUser.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('No se encontró el rol en Firestore');
      }

      const role = docSnap.data().role || 'cliente';
      saveSession({ email: firebaseUser.email }, role);
      setError(null);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Correo electrónico o contraseña incorrectos.');
    }
  };

  const register = async (email, password, name, number, role) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      await setDoc(doc(db, 'users', firebaseUser.uid), {
        email: firebaseUser.email,
        name,
        number,
        role,
      });

      saveSession({ email: firebaseUser.email }, role);
      setError(null);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setError('Error al registrar usuario');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      setUserRole(null);
      localStorage.clear();
      setError(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      setError('Error al cerrar sesión');
    }
  };

  const changePassword = async (newPassword) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updatePassword(currentUser, newPassword);
        setError(null);
      } else {
        throw new Error('Usuario no autenticado');
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      setError('Error al cambiar la contraseña');
    }
  };

  const getToken = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      return await currentUser.getIdToken();
    }
    return null;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const role = docSnap.data().role || 'cliente';
          saveSession({ email: firebaseUser.email }, role);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setUserRole(null);
        localStorage.clear();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        error,
        login,
        register,
        logout,
        changePassword,
        getToken,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
