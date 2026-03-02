const form = document.getElementById('signup');
const emailInput = document.getElementById('correo');
const passwordInput = document.getElementById('contrasena'); 

function showError(el, msg) {
    document.getElementById('err-' + el.id).textContent = msg;
}

function clearError(el) {
    document.getElementById('err-' + el.id).textContent = '';
}

emailInput.addEventListener('input', () => {

    const validar = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);

    if (!validar) {
        showError(emailInput, 'Email inválido');
    } else {
        clearError(emailInput);
    }
});

passwordInput.addEventListener('input', () => {

    if (passwordInput.value.trim().length < 4) {
        showError(passwordInput, 'Error: mínimo 4 caracteres.');
    } else {
        clearError(passwordInput);
    }
});

form.addEventListener('submit', (e) => {

    e.preventDefault();

    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    const hasErrors = Array.from(document.querySelectorAll('.error'))
        .some(span => span.textContent);

    if (!hasErrors) {
        document.getElementById('form-error').textContent = '';
        alert('El formulario de login es válido.');
    } else {
        document.getElementById('form-error').textContent =
        'El formulario tiene errores.';
    }
});
