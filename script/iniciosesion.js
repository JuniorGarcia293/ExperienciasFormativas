// Importar funciones de Firebase Auth
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword, // <-- Función para iniciar sesión con correo y contraseña
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
// No es estrictamente necesario para el login, pero lo mantengo por si lo usas en el futuro
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAu6sqPV4bnR6ZZ83Awm_LEsrvRxu-QOv0",
  authDomain: "testlogin1-f7ef6.firebaseapp.com",
  projectId: "testlogin1-f7ef6",
  storageBucket: "testlogin1-f7ef6.firebasestorage.app",
  messagingSenderId: "510166489947",
  appId: "1::web:46cb8a5c247d2df854d87e",
  measurementId: "G-F3294TLKH9",
};

// Inicializar Firebase (verificación para evitar duplicados)
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const analytics = getAnalytics(app); // Puedes comentar o eliminar si no usas Analytics

// Obtener elementos del DOM para el modal de mensajes
const messageModal = document.getElementById('messageModal');
const modalMessage = document.getElementById('modalMessage');
const closeButton = document.querySelector('.close-button');

// Función para mostrar mensajes en un modal
function showMessageModal(message, type) {
    if (modalMessage && messageModal) {
        modalMessage.textContent = message;
        modalMessage.className = '';
        modalMessage.classList.add(type);
        messageModal.style.display = 'flex'; // Usar flex para centrar
    } else {
        console.warn('Modal elements not found. Falling back to console log:', message);
    }
}

// Event listener para cerrar el modal
if (closeButton) {
    closeButton.addEventListener('click', () => {
        if (messageModal) {
            messageModal.style.display = 'none';
        }
    });
}

// Cerrar el modal al hacer clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target === messageModal) {
        messageModal.style.display = 'none';
    }
});

// Función para logearse luego de haber creado tu cuenta de usuario con correo y contraseña
window.loginUser = (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password) // <-- Usamos signInWithEmailAndPassword
    .then((userCredential) => {
      const user = userCredential.user;
      showMessageModal("¡Inicio de sesión exitoso! Redirigiendo...", "success");
      console.log("Usuario logueado:", user.email);

      setTimeout(() => {
        // Redirigir a la página principal de tu aplicación después del login
        window.location.href = "index.html"; 
      }, 2000);
    })
    .catch((error) => {
      console.error("Error de inicio de sesión:", error.message);
      let errorMessage = "Error al iniciar sesión. Por favor, verifica tu correo y contraseña.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          errorMessage = 'Correo o contraseña incorrectos.';
      } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Formato de correo electrónico inválido.';
      }
      showMessageModal("Error: " + errorMessage, "error");
    });
};

// Función para que inicie luego de haber logueado su usuario con Google
document.getElementById("btn-google").addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      showMessageModal("¡Inicio de sesión con Google exitoso! Redirigiendo...", "success");
      console.log("Usuario logueado con Google:", user.displayName);

      setTimeout(() => {
        // Redirigir a la página principal de tu aplicación después del login con Google
        window.location.href = "index.html"; 
      }, 2000);
    })
    .catch((error) => {
      console.error("Error al iniciar sesión con Google:", error.message);
      showMessageModal("Error al iniciar sesión con Google: " + error.message, "error");
    });
});

// Función para mostrar/ocultar la contraseña
window.togglePassword = (inputId) => {
  const passwordInput = document.getElementById(inputId);
  const icon = passwordInput.nextElementSibling;

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
};