// Definir la función obtenerTiposAnimalesSeleccionados() antes de usarla
function obtenerTiposAnimalesSeleccionados() {
    const tiposAnimalesSeleccionados = [];
    document.querySelectorAll('input[name="tipo-animal"]:checked').forEach(function(checkbox) {
        tiposAnimalesSeleccionados.push(checkbox.value);
    });
    return tiposAnimalesSeleccionados;
}

// Agregar el evento submit al formulario de adaptación
document.getElementById('formulario-adaptacion').addEventListener('submit', function(event) {
    event.preventDefault();

    const tiposAnimalesSeleccionados = obtenerTiposAnimalesSeleccionados();

    // Filtrar las opciones de animales según las preferencias del usuario
    mostrarOpcionesFiltradas(tiposAnimalesSeleccionados);

    // Si el formulario está completo, comenzar el juego
    if (tiposAnimalesSeleccionados.length > 0) {
        comenzarJuego();
    } else {
        // Si el formulario no está completo, redirigir al usuario al formulario de adaptación
        window.location.href = "adaptacion.html";
    }
});

function mostrarOpcionesFiltradas(tiposAnimalesSeleccionados) {
    const opcionesContainer = document.querySelector('.opciones-container');

    // Eliminar todas las opciones existentes
    opcionesContainer.innerHTML = "";

    // Crear un nuevo arreglo de opciones basado en los tipos de animales seleccionados
    let opcionesFiltradas = [];

    // Iterar sobre los tipos de animales seleccionados
    tiposAnimalesSeleccionados.forEach(tipo => {
        // Filtrar las opciones disponibles para este tipo de animal
        const opcionesTipo = Object.keys(imagenesTipos).filter(imagen => imagenesTipos[imagen].includes(tipo));
        // Concatenar las opciones filtradas al arreglo general
        opcionesFiltradas = opcionesFiltradas.concat(opcionesTipo);
    });

    // Si hay más de 4 opciones, seleccionamos aleatoriamente solo 4
if (opcionesFiltradas.length > 4) {
    opcionesFiltradas = seleccionarAleatoriamente(opcionesFiltradas, 4);
}

    // Asignar las opciones filtradas al arreglo global 'opciones'
    opciones = opcionesFiltradas;
}

// Función para seleccionar aleatoriamente 'n' elementos de un arreglo
function seleccionarAleatoriamente(arr, n) {
    const result = [];
    const len = arr.length;
    const taken = new Array(len);
    if (n > len) {
        throw new RangeError("No hay suficientes elementos en el arreglo");
    }
    while (result.length < n) {
        const x = Math.floor(Math.random() * len);
        if (!taken[x]) {
            result.push(arr[x]);
            taken[x] = true;
        }
    }
    return result;
}


