// Arreglo que guarda las imágenes de los animales y sus tipos asociados.
let imagenesTipos = {
  "leon.jpg": ["mamiferos-terrestres"],
  "tigre.jpg": ["mamiferos-terrestres"],
  "elefante.webp": ["mamiferos-terrestres"],
  "jirafa.jpg": ["mamiferos-terrestres"],
  "perro.webp": ["mamiferos-terrestres"],
  "gato.jpg": ["mamiferos-terrestres"],
  "oso.jpg": ["mamiferos-terrestres"],
  "erizo.webp": ["mamiferos-terrestres"],
  "mono.jpg": ["mamiferos-terrestres"],
  "cebra.webp": ["mamiferos-terrestres"],
  "caballo.jpg": ["mamiferos-terrestres"],
  "rinoceronte.jpg": ["mamiferos-terrestres"],
  "hipopotamo.jpg": ["mamiferos-terrestres"],
  "canguro.jpg": ["mamiferos-terrestres"],
  "camello.jpg": ["mamiferos-terrestres"],
  "koala.jpg": ["mamiferos-terrestres"],

  "cocodrilo.webp": ["reptiles"],
  "iguana.jpg": ["reptiles"],
  "lagartija.jpg": ["reptiles"],
  "camaleon.jpg": ["reptiles"],

  "ballena.jpg": ["mamiferos-acuaticos"],
  "delfin.webp": ["mamiferos-acuaticos"],
  "pulpo.jpg": ["mamiferos-acuaticos"],
  "morsa.jpg": ["mamiferos-acuaticos"],

  "pajaro.webp": ["oviparos-terrestres"],
  "serpiente.jpg": ["oviparos-terrestres"],
  "pinguino.webp": ["oviparos-terrestres"],
  "pato.jpg": ["oviparos-terrestres"],

  "tiburon.jpg": ["oviparos-acuaticos"],
  "tortuga.jpg": ["oviparos-acuaticos"],
  "pez.jpg": ["oviparos-acuaticos"],
  "anguila.webp": ["oviparos-acuaticos"]
};

// Arreglo que guarda las opciones correctas para cada pregunta.
let correcta = []; // Los índices corresponden a las opciones correctas de cada pregunta.

// Arreglo que guarda los nombres de los animales a mostrar en cada pregunta.
let opciones = [];
opciones.push(["León", "Tigre", "Elefante", "Jirafa"]);
opciones.push(["Gato", "Perro", "Oso", "Erizo"]);
opciones.push(["Caballo", "Rinoceronte", "Mono", "Cebra"]);
opciones.push(["Hipopótamo", "Camello", "Canguro", "Koala"]);
opciones.push(["Cocodrilo", "Iguana", "Lagartija", "Camaleón"]);
opciones.push(["Ballena", "Delfín", "Morsa", "Pulpo"]);
opciones.push(["Pájaro", "Serpiente", "Pinguino", "Pato"]);
opciones.push(["Tiburón", "Tortuga", "Pez", "Anguila"]);

// Variable que guarda la posición actual.
let posActual = 0;
// Variable que guarda la cantidad de aciertos hasta el momento.
let cantidadAciertos = 0;

// Función para comenzar el juego.
function comenzarCuestionario() {
  // Reseteamos las variables.
  posActual = 0;
  cantidadAciertos = 0;
  window.location.href = "adaptacion.html";
}

function comenzarJuego(){
  //reseteamos las variables
  posActual = 0;
  cantidadAcertadas = 0;
  //activamos las pantallas necesarias
  document.getElementById("pantalla-cuestionario").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  cargarPregunta();

}

// Función para eliminar los acentos de una cadena de texto
function quitarAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Función para cargar la pregunta actual.
function cargarPregunta() {
  // Borramos el mensaje de instrucción del nivel anterior.
  document.querySelector(".texto-instruccion").textContent = "Selecciona el ";

  // Eliminamos las opciones anteriores.
  const opcionesContainer = document.querySelector(".opciones-container");
  opcionesContainer.innerHTML = "";

  // Obtenemos los tipos de animales seleccionados por el usuario
  const tiposAnimalesSeleccionados = obtenerTiposAnimalesSeleccionados();

  // Creamos un array para almacenar todas las opciones disponibles para las preguntas
  let opcionesDisponibles = [];

  // Recorremos los tipos de animales seleccionados para obtener las opciones disponibles para cada tipo
  tiposAnimalesSeleccionados.forEach(function(tipo) {
      // Filtramos las opciones disponibles para el tipo actual
      const opcionesTipo = Object.keys(imagenesTipos).filter(imagen => imagenesTipos[imagen].includes(tipo));
      // Concatenamos las opciones disponibles al array general
      opcionesDisponibles = opcionesDisponibles.concat(opcionesTipo);
  });

  // Creamos un conjunto (Set) para almacenar opciones únicas
  let opcionesUnicas = new Set();

  // Agregamos las opciones disponibles al conjunto
  opcionesDisponibles.forEach(opcion => opcionesUnicas.add(opcion));

  // Convertimos el conjunto de opciones únicas nuevamente a un array
  opcionesDisponibles = Array.from(opcionesUnicas);

  // Si hay menos de 4 opciones, no se pueden seleccionar cuatro opciones únicas, por lo que se mostrarán todas
  if (opcionesDisponibles.length < 4) {
      opcionesDisponibles.forEach(function(opcion, i) {
          let divOpcion = document.createElement("div");
          divOpcion.classList.add("opcion");
          divOpcion.setAttribute("onclick", "comprobarRespuesta(" + i + ")");

          let nombreAnimal = opcion.split(".")[0]; // Elimina la extensión del archivo
          // Quitamos los acentos del nombre del animal
          nombreAnimal = quitarAcentos(nombreAnimal);

          let imagen = document.createElement("img");
          // Concatenamos el nombre del animal con la extensión del archivo
          imagen.src = "img/" + opcion;
          imagen.alt = nombreAnimal;
          imagen.classList.add("imagen-animal");
          divOpcion.appendChild(imagen);

          opcionesContainer.appendChild(divOpcion);
      });
  } else {
      // Obtenemos cuatro opciones aleatorias únicas
      opcionesDisponibles = seleccionarAleatoriamente(opcionesDisponibles, 4);

      // Obtenemos un índice aleatorio para la opción correcta
      let indiceAleatorio = Math.floor(Math.random() * 4);

      // Establecemos la opción seleccionada como la correcta
      let opcionSeleccionada = opcionesDisponibles[indiceAleatorio];
      correcta[posActual] = opcionesDisponibles.indexOf(opcionSeleccionada);

      // Creamos el texto de la instrucción.
      let textoInstruccion = "Selecciona el " + opcionSeleccionada.split(".")[0]; // Elimina la extensión del archivo

      // Insertamos el texto de la instrucción.
      document.querySelector(".texto-instruccion").textContent = textoInstruccion;

      // Creamos las nuevas opciones a partir de las disponibles.
      opcionesDisponibles.forEach(function(opcion, i) {
          let divOpcion = document.createElement("div");
          divOpcion.classList.add("opcion");
          divOpcion.setAttribute("onclick", "comprobarRespuesta(" + i + ")");

          let nombreAnimal = opcion.split(".")[0]; // Elimina la extensión del archivo
          // Quitamos los acentos del nombre del animal
          nombreAnimal = quitarAcentos(nombreAnimal);

          let imagen = document.createElement("img");
          // Concatenamos el nombre del animal con la extensión del archivo
          imagen.src = "img/" + opcion;
          imagen.alt = nombreAnimal;
          imagen.classList.add("imagen-animal");
          divOpcion.appendChild(imagen);

          opcionesContainer.appendChild(divOpcion);
      });
  }
}



// Función para verificar si la imagen existe
function imagenExiste(url) {
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();
  return http.status != 404;
}


// Función para comprobar la respuesta seleccionada.
function comprobarRespuesta(opcionSeleccionada) {
  // Obtenemos el nombre del animal seleccionado
  let animalSeleccionado = opciones[posActual][opcionSeleccionada];

  // Obtenemos el índice de la opción correcta
  let indiceCorrecto = correcta[posActual];

  console.log("Animal seleccionado:", animalSeleccionado);
  console.log("Opción correcta:", opciones[posActual][indiceCorrecto]);

  // Verificamos si el animal seleccionado es el correcto
  if (animalSeleccionado.toLowerCase() === opciones[posActual][indiceCorrecto].toLowerCase()) {
    // Aumentamos la cantidad de aciertos.
    cantidadAciertos++;
    console.log("¡Respuesta correcta!");
  } else {
    console.log("Respuesta incorrecta");
  }

  // Incrementamos la posición actual para pasar a la siguiente pregunta.
  posActual++;

  // Si llegamos al final del juego, terminamos el juego. De lo contrario, cargamos la siguiente pregunta.
  if (posActual >= opciones.length) {
    terminarJuego();
  } else {
    cargarPregunta();
  }
}

// Función para terminar el juego.
function terminarJuego() {
  // Ocultamos la pantalla de juego y mostramos la pantalla final.
  document.getElementById("pantalla-juego").style.display = "none";
  document.getElementById("pantalla-final").style.display = "block";
  // Agregamos los resultados.
  document.getElementById("numCorrectas").textContent = cantidadAciertos;
  document.getElementById("numIncorrectas").textContent = opciones.length - cantidadAciertos;
}

// Función para volver al inicio.
function volverAlInicio() {
  // Ocultamos la pantalla final y mostramos la pantalla inicial.
  window.location.href = "index.html";
}
