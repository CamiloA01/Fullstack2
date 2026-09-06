
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

    window.location.href = 'registro.html';
});