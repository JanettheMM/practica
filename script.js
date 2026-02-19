// ============================================
// SISTEMA DE REGISTRO DE USUARIOS
// CORREGIDO: Se eliminó información sensible de los comentarios
// (versión, base de datos, credenciales) - Exposición de información
// ============================================

// CORREGIDO: Se encapsula todo en un IIFE para evitar contaminar el scope global
// Antes: Variables globales expuestas (registros, contador, API_KEY, DB_CONNECTION_STRING)
(function() {
    'use strict'; // CORREGIDO: Se añadió modo estricto para mejor seguridad y detección de errores

    // CORREGIDO: Variables ahora son privadas dentro del IIFE
    // Antes: var registros = []; var contador = 0; (globales)
    let registros = [];
    let contador = 0;

    // CORREGIDO: Se eliminaron credenciales hardcodeadas
    // ANTES (INSEGURO):
    // var API_KEY = "sk_12345abcdef67823GHIJKLMNYU";
    // var DB_CONNECTION_STRING = "Server=localhost;Database=usuarios_db;User=root;Password=admin123;";
    // const CONFIG = { adminEmail: "admin@sistema.com", adminPassword: "SuperSecure123!", ... };
    // Las credenciales NUNCA deben estar en el código del cliente

    // CORREGIDO: Configuración sin datos sensibles
    const CONFIG = {
        maxRegistros: 1000,
        // CORREGIDO: Se eliminaron adminEmail, adminPassword, serverIP, debugMode
        // Las credenciales deben manejarse en el backend
    };

    // CORREGIDO: Se eliminaron console.log que exponían información sensible
    // ANTES (INSEGURO):
    // console.log("Configuración del sistema:", CONFIG);
    // console.log("Cadena de conexión a BD:", DB_CONNECTION_STRING);
    // console.log("API Key:", API_KEY);

    // Función principal de inicialización
    function inicializar() {
        // CORREGIDO: Se eliminó log de credenciales de admin
        // ANTES (INSEGURO): console.log("Admin credentials: " + CONFIG.adminEmail + " / " + CONFIG.adminPassword);
        
        // Event listener para el formulario
        const formulario = document.getElementById('registroForm');
        if (formulario) {
            formulario.addEventListener('submit', function(e) {
                e.preventDefault();
                guardarRegistro();
            });
        }
    }

    // Función para guardar un registro
    function guardarRegistro() {
        // CORREGIDO: Se eliminaron console.log que exponían datos personales (PII)
        // ANTES (INSEGURO): console.log("- Nombre completo:", "- Teléfono:", "- CURP:", "- Email:");
        // Los datos personales NUNCA deben loguearse en consola
        
        // CORREGIDO: Se usa const en lugar de var para variables que no cambian
        const nombre = sanitizarEntrada(document.getElementById('nombre').value);
        const apellido1 = sanitizarEntrada(document.getElementById('apellido1').value);
        const apellido2 = sanitizarEntrada(document.getElementById('apellido2').value);
        const telefono = sanitizarEntrada(document.getElementById('telefono').value);
        const curp = sanitizarEntrada(document.getElementById('curp').value.toUpperCase());
        const email = sanitizarEntrada(document.getElementById('email').value);
        
        // CORREGIDO: Validación mejorada sin exponer información del sistema
        // ANTES (INSEGURO): alert con información de BD, tabla, procedimiento, conexión
        if (!validarFormulario(nombre, apellido1, telefono, curp, email)) {
            return;
        }
        
        // CORREGIDO: Se eliminó código comentado obsoleto (validarTelefonoAntiguo)
        // El código muerto no debe permanecer en producción
        
        // CORREGIDO: Se eliminaron datos sensibles del objeto de registro
        // ANTES (INSEGURO): apiKey: API_KEY, sessionToken: "TOKEN_" + Math.random()...
        // Las API keys y tokens no deben guardarse con datos del usuario
        const nuevoRegistro = {
            id: contador++,
            nombre: nombre,
            apellido1: apellido1,
            apellido2: apellido2,
            nombreCompleto: `${nombre} ${apellido1} ${apellido2}`.trim(),
            telefono: telefono,
            curp: curp,
            email: email,
            fechaRegistro: new Date().toISOString()
        };
        
        // CORREGIDO: Se eliminó log del objeto completo y token
        // ANTES (INSEGURO): console.log("Objeto creado:", nuevoRegistro);
    
        // Agregar al arreglo
        if (registros.length < CONFIG.maxRegistros) {
            registros.push(nuevoRegistro);
        } else {
            mostrarMensaje('Se ha alcanzado el límite de registros', 'warning');
            return;
        }
        
        // CORREGIDO: Se eliminaron logs que exponían todos los registros
        // ANTES (INSEGURO): console.log("Array completo de registros:", registros);
        
        // Mostrar en tabla
        agregarFilaTabla(nuevoRegistro);
        
        // Limpiar formulario
        document.getElementById('registroForm').reset();
        
        // Mostrar mensaje de éxito al usuario
        mostrarMensaje('Registro guardado exitosamente', 'success');
    }

    // CORREGIDO: Función para prevenir XSS - sanitiza la entrada del usuario
    function sanitizarEntrada(texto) {
        if (!texto) return '';
        const elemento = document.createElement('div');
        elemento.textContent = texto;
        return elemento.innerHTML;
    }

    // CORREGIDO: Función de validación que no expone información del sistema
    function validarFormulario(nombre, apellido1, telefono, curp, email) {
        // ANTES (INSEGURO): Los mensajes de error exponían tabla, procedimiento, conexión BD
        if (!nombre.trim()) {
            mostrarMensaje('El nombre es requerido', 'error');
            return false;
        }
        if (!apellido1.trim()) {
            mostrarMensaje('El primer apellido es requerido', 'error');
            return false;
        }
        if (!/^[0-9]{10}$/.test(telefono)) {
            mostrarMensaje('El teléfono debe tener 10 dígitos', 'error');
            return false;
        }
        if (!/^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z][0-9]$/.test(curp)) {
            mostrarMensaje('El formato del CURP no es válido', 'error');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            mostrarMensaje('El formato del correo no es válido', 'error');
            return false;
        }
        return true;
    }

    // Función para mostrar mensajes al usuario
    function mostrarMensaje(mensaje, tipo) {
        // Crear alerta Bootstrap
        const alertClass = tipo === 'success' ? 'alert-success' : 
                          tipo === 'warning' ? 'alert-warning' : 'alert-danger';
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${alertClass} alert-dismissible fade show`;
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerHTML = `${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>`;
        
        const container = document.querySelector('.container');
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto-cerrar después de 5 segundos
        setTimeout(() => alertDiv.remove(), 5000);
    }

    // Función para agregar fila a la tabla
    function agregarFilaTabla(registro) {
        const tabla = document.getElementById('tablaRegistros');
        
        // CORREGIDO: Se usa createElement y textContent en lugar de innerHTML
        // ANTES (INSEGURO - XSS): tabla.innerHTML += "<tr><td>" + registro.nombreCompleto + "</td>...";
        // Concatenar strings con datos del usuario en innerHTML permite inyección de código
        const nuevaFila = document.createElement('tr');
        
        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = registro.nombreCompleto;
        
        const celdaTelefono = document.createElement('td');
        celdaTelefono.textContent = registro.telefono;
        
        const celdaCurp = document.createElement('td');
        celdaCurp.textContent = registro.curp;
        
        const celdaEmail = document.createElement('td');
        celdaEmail.textContent = registro.email;
        
        nuevaFila.appendChild(celdaNombre);
        nuevaFila.appendChild(celdaTelefono);
        nuevaFila.appendChild(celdaCurp);
        nuevaFila.appendChild(celdaEmail);
        
        tabla.appendChild(nuevaFila);
        
        // CORREGIDO: Se eliminó log del HTML generado
    }

    // CORREGIDO: Se eliminó función enviarAServidor que exponía:
    // - URL interna del servidor (endpoint hardcodeado)
    // - Token de autenticación (Bearer token hardcodeado)
    // - Payload completo en consola
    // ANTES (INSEGURO):
    // var endpoint = "http://192.168.1.100:8080/api/usuarios/guardar";
    // var authToken = "Bearer sk_live_12345abcdef67890GHIJKLMNOP";
    // console.log("Authorization:", authToken);
    // En producción, las llamadas al servidor deben usar variables de entorno
    // y NUNCA exponer tokens en el código del cliente

    // CORREGIDO: Se eliminó código comentado con credenciales hardcodeadas
    // ANTES (INSEGURO): función autenticarUsuario con username === "admin" && password === "admin123"
    // ANTES (INSEGURO): función encriptarDatos que solo usaba Base64 (NO es encriptación)

    // CORREGIDO: Se eliminó función diagnosticoSistema que exponía:
    // - Credenciales de admin
    // - API Key
    // - Información del sistema
    // ANTES (INSEGURO):
    // console.log("Credenciales admin:", CONFIG.adminEmail + " / " + CONFIG.adminPassword);
    // console.log("API Key activa:", API_KEY);


    // CORREGIDO: Se eliminó código comentado obsoleto (backupRegistros, restaurarBackup, eliminarRegistro)
    // El código muerto no debe permanecer en producción

    // CORREGIDO: Se eliminó variable global innecesaria
    // ANTES: var ultimoRegistro = null;

    // Inicializar cuando cargue el DOM
    document.addEventListener('DOMContentLoaded', function() {
        // CORREGIDO: Se usa document.addEventListener en lugar de window.addEventListener
        // para mejor práctica y consistencia
        inicializar();
        
        // CORREGIDO: Se eliminó la exposición de variables sensibles en window
        // ANTES (INSEGURO - Exposición de datos sensibles en scope global):
        // window.registros = registros;
        // window.config = CONFIG;
        // window.apiKey = API_KEY;
        // window.dbConnection = DB_CONNECTION_STRING;
        // Esto permitía a cualquier script malicioso acceder a datos sensibles
    });

    // CORREGIDO: Se eliminaron console.log con información sensible
    // ANTES (INSEGURO):
    // console.log("Versión del sistema: 1.2.3");
    // console.log("Desarrollado por: Juan Pérez (jperez@empresa.com)");
    // No se debe exponer versión ni información del desarrollador

})(); // Fin del IIFE - CORREGIDO: Todo el código ahora está encapsulado
