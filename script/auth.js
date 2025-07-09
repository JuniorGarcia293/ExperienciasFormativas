import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// Configuración de Firebase (misma que usas en login.js)
const firebaseConfig = {
  apiKey: "AIzaSyAu6sqPV4bnR6ZZ83Awm_LEsrvRxu-QOv0",
  authDomain: "testlogin1-f7ef6.firebaseapp.com",
  projectId: "testlogin1-f7ef6",
  storageBucket: "testlogin1-f7ef6.appspot.com",
  messagingSenderId: "510166489947",
  appId: "1::web:46cb8a5c247d2df854d87e",
  measurementId: "G-F3294TLKH9"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Mostrar datos del usuario logueado
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

onAuthStateChanged(auth, (user) => {
  if (user) {
    userName.textContent = user.displayName || "Nombre no disponible";
    userEmail.textContent = user.email;
  } else {
    userName.textContent = "No logueado";
    userEmail.textContent = "No logueado";
  }
});

import { signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// Botón de cerrar sesión
const cerrarSesionBtn = document.getElementById("cerrarSesion");

if (cerrarSesionBtn) {
  cerrarSesionBtn.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        console.log("Sesión cerrada correctamente");
        window.location.href = "iniciosesion.html"; // Redirige al inicio de sesión
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
        alert("No se pudo cerrar sesión.");
      });
  });
}
