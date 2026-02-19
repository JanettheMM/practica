// SE HIZO CORRECCIÓN: Se minimizó la superficie de ataque eliminando información técnica innecesaria del encabezado para reducir el riesgo de la aplicación[cite: 203].

var registros = [];
var contador = 0;
// SE HIZO CORRECCIÓN: Se eliminó el HARDCODE. Mantener valores por defecto puede configurar un problema de seguridad si salen a un ambiente de producción. (API_KEY)
// SE HIZO CORRECCIÓN: Se eliminó el HARDCODE. Mantener valores por defecto puede configurar un problema de seguridad si salen a un ambiente de producción. (DB_CONNECTION_STRING)

const CONFIG = {
    maxRegistros: 1000,
    // SE HIZO CORRECCIÓN: Se eliminó el HARDCODE. Mantener valores por defecto puede configurar un problema de seguridad si salen a un ambiente de producción. (adminEmail)
    // SE HIZO CORRECCIÓN: Se eliminó el HARDCODE. Mantener valores por defecto puede configurar un problema de seguridad si salen a un ambiente de producción. (adminPassword)
    debugMode: false
    // SE HIZO CORRECCIÓN: Se ocultó información de la URL. Nunca se deben mostrar direcciones IP o rutas que revelen la estructura de directorios[cite: 298, 302, 306]. (serverIP)
};

// SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334].
// SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334].
// SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334].

function inicializar() {
    // SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334].
    // SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334].

    document.getElementById('registroForm').addEventListener('submit', function (e) {
        e.preventDefault();
        guardarRegistro();
    });

    // SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334].
}

// SE HIZO CORRECCIÓN: Se definió un conjunto de caracteres válidos. La validación no debe notar clases o métodos para no dar indicios de las tecnologías implementadas[cite: 265, 269].
function validarEntrada(valor, tipo) {
    if (!valor || valor.trim() === '') {
        return { valido: false, mensaje: 'El campo es requerido' };
    }

    const patrones = {
        nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
        telefono: /^[0-9]{10}$/,
        curp: /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[A-Z0-9]{2}$/i,
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    };

    const caracteresProhibidos = /[<>'"();{}[\]\\\/`$%&|!?*^~]/;

    if (caracteresProhibidos.test(valor)) {
        return { valido: false, mensaje: 'El campo contiene caracteres no permitidos' };
    }

    if (patrones[tipo] && !patrones[tipo].test(valor)) {
        const mensajesError = {
            nombre: 'Solo se permiten letras y espacios',
            telefono: 'Debe contener exactamente 10 dígitos',
            curp: 'El formato del CURP no es válido',
            email: 'El formato del correo electrónico no es válido'
        };
        return { valido: false, mensaje: mensajesError[tipo] || 'Formato inválido' };
    }

    return { valido: true, mensaje: '' };
}

function guardarRegistro() {
    // SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334].

    var nombre = document.getElementById('nombre').value.trim();
    var apellido1 = document.getElementById('apellido1').value.trim();
    var apellido2 = document.getElementById('apellido2').value.trim();
    var telefono = document.getElementById('telefono').value.trim();
    var curp = document.getElementById('curp').value.trim().toUpperCase();
    var email = document.getElementById('email').value.trim();

    // SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334].

    var validaciones = [
        { campo: 'Nombre', valor: nombre, tipo: 'nombre' },
        { campo: 'Primer Apellido', valor: apellido1, tipo: 'nombre' },
        { campo: 'Teléfono', valor: telefono, tipo: 'telefono' },
        { campo: 'CURP', valor: curp, tipo: 'curp' },
        { campo: 'Correo Electrónico', valor: email, tipo: 'email' }
    ];

    for (var i = 0; i < validaciones.length; i++) {
        var resultado = validarEntrada(validaciones[i].valor, validaciones[i].tipo);
        if (!resultado.valido) {
            // SE HIZO CORRECCIÓN: Mensaje estandarizado de forma genérica. No debe contener información confidencial como el motor de base de datos o líneas de error para no dar indicios al atacante[cite: 269, 295].
            alert('Error de validación: ' + validaciones[i].campo + ' - ' + resultado.mensaje);
            return;
        }
    }

    if (apellido2 !== '') {
        var resultadoApellido2 = validarEntrada(apellido2, 'nombre');
        if (!resultadoApellido2.valido) {
            alert('Error de validación: Segundo Apellido - ' + resultadoApellido2.mensaje);
            return;
        }
    }

    // SE HIZO CORRECCIÓN: Se eliminó el código comentado. Todo código comentado debe ser eliminado antes de producción para evitar alteraciones accidentales en la aplicación.

    var nuevoRegistro = {
        id: contador++,
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        nombreCompleto: nombre + " " + apellido1 + " " + apellido2,
        telefono: telefono,
        curp: curp,
        email: email,
        fechaRegistro: new Date().toISOString()
        // SE HIZO CORRECCIÓN: Se eliminó el HARDCODE. Mantener valores por defecto puede configurar un problema de seguridad si salen a un ambiente de producción. (apiKey)
        // SE HIZO CORRECCIÓN: Se eliminó el HARDCODE. Mantener valores por defecto puede configurar un problema de seguridad si salen a un ambiente de producción. (sessionToken)
    };

    // SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334].
    // SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334].

    registros.push(nuevoRegistro);

    // SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334].
    // SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334].

    agregarFilaTabla(nuevoRegistro);
    document.getElementById('registroForm').reset();

    // SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334].

    enviarAServidor(nuevoRegistro);
}

function agregarFilaTabla(registro) {
    var tabla = document.getElementById('tablaRegistros');
    var nuevaFila = document.createElement('tr');

    var celdaNombre = document.createElement('td');
    celdaNombre.textContent = registro.nombreCompleto;

    var celdaTelefono = document.createElement('td');
    celdaTelefono.textContent = registro.telefono;

    var celdaCurp = document.createElement('td');
    celdaCurp.textContent = registro.curp;

    var celdaEmail = document.createElement('td');
    celdaEmail.textContent = registro.email;

    nuevaFila.appendChild(celdaNombre);
    nuevaFila.appendChild(celdaTelefono);
    nuevaFila.appendChild(celdaCurp);
    nuevaFila.appendChild(celdaEmail);

    // SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334].

    tabla.appendChild(nuevaFila);

    // SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334].
}

function enviarAServidor(datos) {
    // SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334].

    // SE HIZO CORRECCIÓN: Se ocultó información de la URL. Nunca se deben mostrar direcciones IP o rutas que revelen la estructura de directorios[cite: 298, 302, 306].
    // SE HIZO CORRECCIÓN: Se eliminó el HARDCODE. Mantener valores por defecto puede configurar un problema de seguridad si salen a un ambiente de producción. (authToken)

    // SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334].

    setTimeout(function () {
        // SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334].
        mostrarMensajeExito('Registro guardado correctamente');
    }, 1000);
}

// SE HIZO CORRECCIÓN: Se eliminó el código comentado. Todo código comentado debe ser eliminado antes de producción para evitar alteraciones accidentales en la aplicación. (autenticarUsuario)
// SE HIZO CORRECCIÓN: Se eliminó el código comentado. Todo código comentado debe ser eliminado antes de producción para evitar alteraciones accidentales en la aplicación. (encriptarDatos)

// SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334]. (diagnosticoSistema)

// SE HIZO CORRECCIÓN: Se eliminó el código comentado. Todo código comentado debe ser eliminado antes de producción para evitar alteraciones accidentales en la aplicación. (backupRegistros, restaurarBackup)

function mostrarMensajeExito(mensaje) {
    alert(mensaje);
}

var ultimoRegistro = null;

window.addEventListener('DOMContentLoaded', function () {
    // SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334].
    inicializar();

    // SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334]. (exposición de variables globales)
});

// SE HIZO CORRECCIÓN: Se eliminó el código comentado. Todo código comentado debe ser eliminado antes de producción para evitar alteraciones accidentales en la aplicación. (eliminarRegistro)

// SE HIZO CORRECCIÓN: Se eliminaron los mensajes de salida. Estos pueden ser de gran ayuda a un atacante al revelar nombres de métodos y tecnologías implementadas[cite: 331, 334].