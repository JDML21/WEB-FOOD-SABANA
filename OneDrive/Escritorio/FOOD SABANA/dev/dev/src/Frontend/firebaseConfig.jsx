import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAGRYXybRV-557zD1h-CYA1EFgcMvoj6js",
  authDomain: "proyecto-final--dev-web.firebaseapp.com",
  projectId: "proyecto-final--dev-web",
  storageBucket: "proyecto-final--dev-web.firebasestorage.app",
  messagingSenderId: "572314224001",
  appId: "1:572314224001:web:555352447c20331ee91480",
  measurementId: "G-N1MERLKV7B"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtén las instancias de los servicios que usarás
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };