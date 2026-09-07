document.addEventListener('DOMContentLoaded', () => {
    const sesionIniciada = sessionStorage.getItem('sesion_iniciada') || 'false';
    const usuarioActivo = sessionStorage.getItem('usuario_activo') || '';
    const item_registro = document.querySelector('#item-registro');
    const itemUsuario = document.querySelector('#item-usuario');
    const textoUsuario = document.querySelector('#texto-usuario');
    const btnInicioSesion = document.querySelector('#btn-inicio-sesion');

    if (sesionIniciada == 'true' && usuarioActivo != '') {
        console.log(sesionIniciada, usuarioActivo)
        textoUsuario.textContent = `${usuarioActivo}`;
        itemUsuario.style.display = 'block';

        if (item_registro) {
            item_registro.textContent = 'Propiedades';
            item_registro.href = 'registro.html';
            item_registro.style.display = 'inline';
        }

        btnInicioSesion.textContent = 'Cerrar sesión';
        btnInicioSesion.style.backgroundColor = '#963535';
        
        btnInicioSesion.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.setItem('sesion_iniciada', 'false');
            sessionStorage.setItem('usuario_activo', '');
            window.location.href = 'index.html';
        });
    }
})