const selectComuna = document.querySelector('#comuna');
const selectTipo = document.querySelector('#tipo');    
const selectEstado = document.querySelector('#estado');
const inputPrecioMin = document.querySelector('#precio_min');
const inputPrecioMax = document.querySelector('#precio_max');
const btnReset = document.querySelector('#btn-reset');
const btnBuscar = document.querySelector('#btn-buscar');


const btn_pag_primera = document.querySelector('#btn-pag-primera');
const btn_pag_anterior = document.querySelector('#btn-pag-anterior');
const texto_paginacion = document.querySelector('#texto-paginacion');
const btn_pag_siguiente = document.querySelector('#btn-pag-siguiente');
const btn_pag_ultima = document.querySelector('#btn-pag-ultima');


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

    const estados = document.querySelectorAll('.estado-propiedad');
    estados.forEach(span => {
        const textoEstado = span.textContent.trim().toLowerCase();

        if (textoEstado === 'disponible') {
            span.style.backgroundColor = '#16a34a';
            span.style.color = '#ffffff';
        } else if (textoEstado === 'reservado') {
            span.style.backgroundColor = '#eab308';
            span.style.color = '#000000';
        } else if (textoEstado === 'arrendado') {
            span.style.backgroundColor = '#dc2626';
            span.style.color = '#ffffff';
        }   
    });

    if (textoEstado === 'disponible') {
            span.style.backgroundColor = '#16a34a'; // Verde
            span.style.color = '#ffffff';
        } else if (textoEstado === 'reservada') {
            span.style.backgroundColor = '#eab308'; // Amarillo
            span.style.color = '#000000'; // Texto oscuro para mejor lectura
        } else if (textoEstado === 'arrendado') {
            span.style.backgroundColor = '#dc2626'; // Rojo
            span.style.color = '#ffffff';
        }
});


let paginaActual = sessionStorage.getItem("paginaActual") || 1;
sessionStorage.setItem("paginaActual", paginaActual);
const ultima_pagina = 20;

const filtrar_grid = () => {
    const comunaElegida = selectComuna.value;  
    const tipoElegido = selectTipo.value;   
    const estadoElegido = selectEstado.value;
    const precioMin = inputPrecioMin.value.trim() !== '' ? Number(inputPrecioMin.value) : 0;
    const precioMax = inputPrecioMax.value.trim() !== '' ? Number(inputPrecioMax.value) : Infinity;

    let hayResultados = false;
    const tarjetasPropiedades = document.querySelectorAll('.info-propiedad');
    tarjetasPropiedades.forEach((tarjeta) => {
        const comunaTarjeta = tarjeta.dataset.comuna;
        const tipoEstado = tarjeta.dataset.estado;
        const tipoTarjeta = tarjeta.dataset.tipo;
        
        const precioTarjeta = Number(tarjeta.dataset.precio);

        const calzaComuna = (comunaElegida === '') || (comunaTarjeta === comunaElegida);

        const calzaTipo = (tipoElegido === '') || (tipoTarjeta === tipoElegido);

        const calzaEstado = (estadoElegido === '') || (tipoEstado === estadoElegido);

        const calzaPrecio = (precioTarjeta >= precioMin) && (precioTarjeta <= precioMax);

        if (calzaComuna && calzaTipo && calzaEstado && calzaPrecio) {
            tarjeta.style.display = 'flex';
            hayResultados = true;
        } else {
            tarjeta.style.display = 'none';
        }
    });
}

const guardarFiltros = () => {
    sessionStorage.setItem('filtro_comuna', selectComuna.value);
    sessionStorage.setItem('filtro_tipo', selectTipo.value);
    sessionStorage.setItem('filtro_estado', selectEstado.value);
    sessionStorage.setItem('filtro_precio_min', inputPrecioMin.value);
    sessionStorage.setItem('filtro_precio_max', inputPrecioMax.value);
}

const cargarFiltros = () => {
    const comunaGuardada = sessionStorage.getItem('filtro_comuna');
    const tipoGuardado = sessionStorage.getItem('filtro_tipo');
    const estadoGuardado = sessionStorage.getItem('filtro_estado');
    const minGuardado = sessionStorage.getItem('filtro_precio_min');
    const maxGuardado = sessionStorage.getItem('filtro_precio_max');


    if (comunaGuardada !== null) selectComuna.value = comunaGuardada;
    if (tipoGuardado !== null) selectTipo.value = tipoGuardado;
    if (estadoGuardado !== null) selectEstado.value = estadoGuardado;
    if (minGuardado !== null) inputPrecioMin.value = minGuardado;
    if (maxGuardado !== null) inputPrecioMax.value = maxGuardado;

    filtrar_grid();
}

const reset_filter = () => {
    selectComuna.value = "";
    selectTipo.value = "";
    inputPrecioMin.value = "";
    inputPrecioMax.value = "";
    selectEstado.value = "";
    inputPrecioMin.value = "";
    inputPrecioMax.value = "";
    const tarjetasPropiedades = document.querySelectorAll('.info-propiedad');
    tarjetasPropiedades.forEach(propiedad => {
        propiedad.style.display = "flex";
    });

}


cargarFiltros();

btnReset.addEventListener('click', reset_filter);
btnReset.addEventListener('click', guardarFiltros);

btnBuscar.addEventListener('click', guardarFiltros);
btnBuscar.addEventListener('click', filtrar_grid);


texto_paginacion.textContent = "Pagina " + paginaActual + " de " + ultima_pagina;

if(paginaActual > 1){
    btn_pag_primera.disabled = false;
    btn_pag_anterior.disabled = false;
}
else{
    btn_pag_primera.disabled = true;
    btn_pag_anterior.disabled = true;
}

if(paginaActual >= ultima_pagina){
    btn_pag_siguiente.disabled = true;
    btn_pag_ultima.disabled = true;
}
else{
    btn_pag_siguiente.disabled = false;
    btn_pag_ultima.disabled = false;
}

btn_pag_primera.addEventListener("click", () => {
    paginaActual = 1;
    sessionStorage.setItem("paginaActual", paginaActual);   
    location.reload();
});
btn_pag_anterior.addEventListener("click", () => {
    paginaActual = Math.max(Number(paginaActual) - 1, 1) ;
    sessionStorage.setItem("paginaActual", paginaActual);   
    location.reload();
});

btn_pag_siguiente.addEventListener("click", () => {
    paginaActual = Math.min(Number(paginaActual) + 1, ultima_pagina) ;
    sessionStorage.setItem("paginaActual", paginaActual);   
    location.reload();
});

btn_pag_ultima.addEventListener("click", () => {
    paginaActual = ultima_pagina;
    sessionStorage.setItem("paginaActual", paginaActual);   
    location.reload();
});





