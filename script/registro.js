// Importar funciones de Firebase Auth
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"; 

// Configuración de Firebase (usando la que ya proporcionaste)
const firebaseConfig = {
  apiKey: "AIzaSyAu6sqPV4bnR6ZZ83Awm_LEsrvRxu-QOv0",
  authDomain: "testlogin1-f7ef6.firebaseapp.com",
  projectId: "testlogin1-f7ef6",
  storageBucket: "testlogin1-f7ef6.firebasestorage.app",
  messagingSenderId: "510166489947",
  appId: "1::web:46cb8a5c247d2df854d87e",
  measurementId: "G-F3294TLKH9",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 

// Obtener elementos del DOM para el modal de mensajes
const messageModal = document.getElementById('messageModal');
const modalMessage = document.getElementById('modalMessage');
const closeButton = document.querySelector('.close-button');

// Función para mostrar mensajes en un modal
function showMessageModal(message, type) {
    modalMessage.textContent = message;
    modalMessage.className = ''; // Limpiar clases previas
    modalMessage.classList.add(type); // Añadir clase 'success' o 'error'
    messageModal.style.display = 'block'; // Mostrar el modal
}

// Event listener para cerrar el modal
closeButton.addEventListener('click', () => {
    messageModal.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target === messageModal) {
        messageModal.style.display = 'none';
    }
});


// Función para logearse luego de haber creado tu cuenta de usuario con correo y contraseña
window.registerUser = (event) => { // window. para hacerlo global y accesible desde el HTML
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Verificar si las contraseñas coinciden
  if (password !== confirmPassword) {
    showMessageModal("Las contraseñas no coinciden.", "error");
    return;
  }

  // Guardar el usuario en localStorage (simulación de registro)
  // Nota: Considera usar Firestore para persistencia de datos real si es necesario.
  const user = { email };
  localStorage.setItem("user", JSON.stringify(user)); // Guardar como string JSON

  // Crear cuenta correo y contraseña
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      showMessageModal("Cuenta registrada exitosamente: " + user.email + ". Redirigiendo...", "success");

      setTimeout(() => {
        window.location.href = "iniciosesion.html"; // Redirigir a la página de inicio de sesión
      }, 2000);
    })
    .catch((error) => {
      console.error("Error de registro:", error.message);
      let errorMessage = "Error al registrar. Por favor, inténtalo de nuevo.";
      if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'El correo electrónico ya está en uso.';
      } else if (error.code === 'auth/weak-password') {
          errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      }
      showMessageModal("Error al registrar: " + errorMessage, "error");
    });
};

// Función para que incie luego de haber logueado su usuario con Google
document.getElementById("btn-google").addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      showMessageModal("Cuenta creada con Google: " + user.displayName + ". Redirigiendo...", "success");
      setTimeout(() => {
        window.location.href = "iniciosesion.html";
      }, 2000);
    })
    .catch((error) => {
      console.error("Error Google:", error.message);
      showMessageModal("Error con Google: " + error.message, "error");
    });
});

// Función para mostrar/ocultar la contraseña
window.togglePassword = (inputId) => { // window. para hacerlo global y accesible desde el HTML
  const passwordInput = document.getElementById(inputId);
  const icon = passwordInput.nextElementSibling; // El icono es el siguiente hermano

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash"); // Cambiar a ojo tachado
  } else {
    passwordInput.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye"); // Cambiar a ojo normal
  }
};
