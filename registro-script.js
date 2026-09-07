document.addEventListener('DOMContentLoaded', () => {
    const sesionIniciada = sessionStorage.getItem('sesion_iniciada') || 'false';
    const usuarioActivo = sessionStorage.getItem('usuario_activo') || '';
    const item_registro = document.querySelector('#item-registro');
    const itemUsuario = document.querySelector('#item-usuario');
    const textoUsuario = document.querySelector('#texto-usuario');
    const btnInicioSesion = document.querySelector('#btn-inicio-sesion');
    const formRegistro = document.querySelector('#form-registro');
    const contenedorPend = document.querySelector('#contenerdor-pend');
    const btnNuevaSolicitud = document.querySelector('#btn-nueva-solicitud');

    if (sesionIniciada == 'true' && usuarioActivo != '') {
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
    };
    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();
        formRegistro.style.display = 'none';
        contenedorPend.style.display = 'block';
        document.querySelector('#titulo-reg-catalogo').textContent = 'Solicitud en revisión';
        document.querySelector('.subtitulo-login').textContent = 'Su solicitud se encuentra en revisión. En breve recibirá un correo con la confirmación de su solicitud.';
    });
})


