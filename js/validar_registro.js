const form = document.getElementById('registro');
const nombreInput = document.getElementById('nombre');
const correoInput = document.getElementById('correo');
const contrasenaInput = document.getElementById('contrasena');
const confirmarInput = document.getElementById('confirmar');
const terminosInput = document.getElementById('terminos');


function showError(el, msg) {
    document.getElementById('err-' + el.id).textContent = msg;
}

function clearError(el) {
    document.getElementById('err-' + el.id).textContent = '';
}

nombreInput.addEventListener('input', () => {
    if (nombreInput.value.trim().length < 4) {
        showError(nombreInput, 'Mínimo 4 caracteres.');
    } else {
        clearError(nombreInput);
    }
});

correoInput.addEventListener('input', () => {
    const validar = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoInput.value);

    if (!validar) {
        showError(correoInput, 'Email inválido.');
    } else {
        clearError(correoInput);
    }
});

contrasenaInput.addEventListener('input', () => {
    if (contrasenaInput.value.length < 6) {
        showError(contrasenaInput, 'La contraseña debe tener mínimo 6 caracteres.');
    } else {
        clearError(contrasenaInput);
    }
});

confirmarInput.addEventListener('input', () => {
    if (confirmarInput.value !== contrasenaInput.value) {
        showError(confirmarInput, 'Las contraseñas no coinciden.');
    } else {
        clearError(confirmarInput);
    }
});

terminosInput.addEventListener('change', () => {
    if (!terminosInput.checked) {
        showError(terminosInput, 'Debes aceptar los términos.');
    } else {
        clearError(terminosInput);
    }
});

form.addEventListener('submit', (e) => {

    e.preventDefault();

    const hasErrors = Array.from(document.querySelectorAll('.error'))
        .some(span => span.textContent);

    if (!hasErrors) {
        document.getElementById('form-error').textContent = '';
        alert('El formulario de registro es válido.');
    } else {
        document.getElementById('form-error').textContent =
        'El formulario tiene errores.';
    }
});