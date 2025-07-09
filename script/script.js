// Asegúrate de que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // --- Obtener referencias a los elementos del DOM ---

    // Botones para abrir los modales
    const openModal1Btn = document.getElementById('openModal1');
    const openModal2Btn = document.getElementById('openModal2');
    const openModal3Btn = document.getElementById('openModal3');

    // Los modales mismos
    const modal1 = document.getElementById('myModal1');
    const modal2 = document.getElementById('myModal2');
    const modal3 = document.getElementById('myModal3');

    // Botones de cierre (las 'x' dentro de cada modal)
    // Usamos querySelectorAll porque hay múltiples botones con la clase 'close-button'
    const closeButtons = document.querySelectorAll('.close-button');


    // --- Funciones para manejar los modales ---

    // Función genérica para abrir un modal
    function openModal(modalElement) {
        if (modalElement) {
            modalElement.style.display = 'flex'; // Cambia a 'flex' para mostrar y centrar
        }
    }

    // Función genérica para cerrar un modal
    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.style.display = 'none'; // Oculta el modal
        }
    }


    // --- Asignar Event Listeners a los botones para abrir modales ---

    if (openModal1Btn) {
        openModal1Btn.addEventListener('click', () => {
            openModal(modal1);
        });
    }

    if (openModal2Btn) {
        openModal2Btn.addEventListener('click', () => {
            openModal(modal2);
        });
    }

    if (openModal3Btn) {
        openModal3Btn.addEventListener('click', () => {
            openModal(modal3);
        });
    }


    // --- Asignar Event Listeners a los botones de cierre para cerrar modales ---

    // Iteramos sobre todos los botones de cierre encontrados
    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // El botón de cierre está dentro de modal-content, y modal-content dentro de modal.
            // Necesitamos encontrar el elemento padre que es el modal completo.
            const modalToClose = event.target.closest('.modal');
            closeModal(modalToClose);
        });
    });


    // --- Cerrar el modal si el usuario hace clic fuera del contenido ---

    window.addEventListener('click', (event) => {
        // Verifica si el clic ocurrió directamente sobre cualquiera de los fondos del modal
        if (event.target === modal1) {
            closeModal(modal1);
        } else if (event.target === modal2) {
            closeModal(modal2);
        } else if (event.target === modal3) {
            closeModal(modal3);
        }
    });

}); // Fin de DOMContentLoaded

document.getElementById('htmlFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();

      reader.onload = function(e) {
        console.log(e.target.result); // Muestra el contenido del archivo HTML
        var idtextareahtml = document.getElementById("contenidohtml")
        idtextareahtml.innerHTML = e.target.result
      };

      reader.onerror = function(e) {
        console.error("Error al leer el archivo", e);
      };

      reader.readAsText(file); // Lee el archivo como texto
    }
  });

  document.getElementById('cssFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();

      reader.onload = function(e) {
        console.log(e.target.result); // Muestra el contenido del archivo HTML
        var idtextareahtml = document.getElementById("contenidocss")
        idtextareahtml.innerHTML = e.target.result
      };

      reader.onerror = function(e) {
        console.error("Error al leer el archivo", e);
      };

      reader.readAsText(file); // Lee el archivo como texto
    }
  });

    document.getElementById('jsFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();

      reader.onload = function(e) {
        console.log(e.target.result); // Muestra el contenido del archivo HTML
        var idtextareahtml = document.getElementById("contenidojs")
        idtextareahtml.innerHTML = e.target.result
      };

      reader.onerror = function(e) {
        console.error("Error al leer el archivo", e);
      };

      reader.readAsText(file); // Lee el archivo como texto
    }
  });

  function mostrarVista(vista) {
    document.getElementById("vistaEstudiante").classList.add("hidden");
    document.getElementById("vistaJurado").classList.add("hidden");

    if (vista === "estudiante") {
      document.getElementById("vistaEstudiante").classList.remove("hidden");
    } else if (vista === "jurado") {
      document.getElementById("vistaJurado").classList.remove("hidden");
    }
  }

  // Mostrar la vista por defecto
  mostrarVista('estudiante');

        function mostrarVista(tipo) {
        document.getElementById("vistaEstudiante").classList.add("hidden");
        document.getElementById("vistaJurado").classList.add("hidden");
        if (tipo === "estudiante") {
          document.getElementById("vistaEstudiante").classList.remove("hidden");
        } else {
          document.getElementById("vistaJurado").classList.remove("hidden");
        }
      }

      document.getElementById("crearHackathon").addEventListener("click", () => {
        const nombre = document.getElementById("hackathonName").value;
        const descripcion = document.getElementById("hackathonDescription").value;
        alert(`Hackatón creado: ${nombre}\n\nDescripción: ${descripcion}`);
      });

      // document.getElementById("formRegistroParticipante").addEventListener("submit", (e) => {
      //   e.preventDefault();
      //   const nombre = document.getElementById("nombreParticipante").value;
      //   const email = document.getElementById("emailParticipante").value;
      //   const experiencia = document.getElementById("experienciaParticipante").value;
      //   const urlPerfil = `https://hackathon.com/perfil?nombre=${encodeURIComponent(nombre)}&email=${encodeURIComponent(email)}`;

      //   QRCode.toCanvas(document.getElementById("qrCanvas"), urlPerfil, function (error) {
      //     if (error) console.error(error);
      //     else alert("Perfil registrado y QR generado exitosamente.");
      //   });
      // });

      document.getElementById("guardarEvaluacion")?.addEventListener("click", () => {
        const innovacion = document.getElementById("puntuacionInnovacion")?.value;
        const comentarios = document.getElementById("comentariosJurado")?.value;
      
        alert(`Evaluación registrada:\nNota: ${innovacion}\nComentarios: ${comentarios}`);
      });
      
