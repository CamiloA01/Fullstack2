// ============================================
// FILTRO DE BÚSQUEDA - Catálogo de propiedades
// ============================================

// 1. Referencias a los elementos del filtro (uno solo cada uno -> querySelector)
const selectComuna = document.querySelector('#comuna');
const selectTipo = document.querySelector('#tipo');
const inputPrecioMin = document.querySelector('#precio_min');
const inputPrecioMax = document.querySelector('#precio_max');
const btnBuscar = document.querySelector('#btn-buscar');

// 2. Referencia a TODAS las tarjetas de propiedades (varias -> querySelectorAll)
const tarjetasPropiedades = document.querySelectorAll('.info-propiedad');

// 3. Cuando el usuario hace click en "Buscar", filtramos
btnBuscar.addEventListener('click', () => {
    filtrarPropiedades();
});

function filtrarPropiedades() {
    // Leemos lo que el usuario eligió en el formulario
    const comunaElegida = selectComuna.value;       // "" significa "Todas"
    const tipoElegido = selectTipo.value;            // "" significa "Todos"

    // Si el campo de precio está vacío, no debe restringir ese límite
    const precioMin = inputPrecioMin.value !== '' ? Number(inputPrecioMin.value) : 0;
    const precioMax = inputPrecioMax.value !== '' ? Number(inputPrecioMax.value) : Infinity;

    let hayResultados = false;

    // Recorremos cada tarjeta una por una
    tarjetasPropiedades.forEach((tarjeta) => {
        const comunaTarjeta = tarjeta.dataset.comuna;
        const tipoTarjeta = tarjeta.dataset.tipo;
        const precioTarjeta = Number(tarjeta.dataset.precio);

        // ¿Calza con la comuna? (si el usuario no eligió comuna, siempre calza)
        const calzaComuna = (comunaElegida === '') || (comunaTarjeta === comunaElegida);

        // ¿Calza con el tipo? (si el usuario no eligió tipo, siempre calza)
        const calzaTipo = (tipoElegido === '') || (tipoTarjeta === tipoElegido);

        // ¿Calza con el rango de precio?
        const calzaPrecio = (precioTarjeta >= precioMin) && (precioTarjeta <= precioMax);

        // Si cumple las 3 condiciones, se muestra; si no, se esconde
        if (calzaComuna && calzaTipo && calzaPrecio) {
            tarjeta.style.display = '';
            hayResultados = true;
        } else {
            tarjeta.style.display = 'none';
        }
    });

    mostrarMensajeSinResultados(!hayResultados);
}

// 4. (Opcional) Mensaje cuando ningún resultado calza con el filtro
function mostrarMensajeSinResultados(mostrar) {
    let mensaje = document.querySelector('#mensaje-sin-resultados');

    if (mostrar) {
        if (!mensaje) {
            mensaje = document.createElement('p');
            mensaje.id = 'mensaje-sin-resultados';
            mensaje.textContent = 'No se encontraron propiedades con esos filtros.';
            document.querySelector('.grid-propiedades').after(mensaje);
        }
    } else {
        if (mensaje) {
            mensaje.remove();
        }
    }
}
