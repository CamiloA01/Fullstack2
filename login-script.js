const btn_ingresar = document.querySelector('#btn-ingresar');

btn_ingresar.addEventListener('click', (e) => {
    e.preventDefault();
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');

    if (!emailInput.checkValidity()){
        emailInput.reportValidity();
        return; 
    }

    if(!passwordInput.checkValidity()){
        passwordInput.reportValidity();
        return; 
    }

    sessionStorage.setItem('usuario_activo', emailInput.value);
    sessionStorage.setItem('sesion_iniciada', 'true');

    window.location.href = 'index.html';
});