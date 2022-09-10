/*Juego*/
/*Vector de palabras y funcion randon de palabras*/
let palabras = ["JUEGO","PANTALLA","CONSOLA","CASA","MESA","SILLA"];
let palabra = "";
let intentos;

//botones
const btnStart = document.querySelector(".start");
const btnAddWords = document.querySelector(".add-word");
const btnGuardar = document.getElementById("btn-add");
const btnNew = document.getElementById("btn-nuevojuego");
const btnCancelar = document.getElementById(".btn-cancelar");
const btnDesistir = document.getElementById(".btn-desistir");


//secciones
const sectionStart = document.querySelector(".section-start");
const sectionGame = document.querySelector(".section-game");
const sectionAddWords = document.querySelector(".section-add-words");

//sonidos
const musicbtn = new Audio('sound/cork-85200.mp3');
const musicJuego = new Audio('sound/click-47609.mp3');

/*Funciones de mostrar y ocultar secciones*/
function iniciarJuego(){
    musicJuego.play();
	sectionGame.classList.remove("hidden")
	sectionStart.classList.add("hidden")
	obtenerpalabra();
}

function agregarPalabra(){
	musicbtn.play();
	sectionAddWords.classList.remove("hidden")
	sectionStart.classList.add("hidden")
}

function guardaryEmpezar(){
	musicJuego.play();
	sectionGame.classList.remove("hidden")
	sectionAddWords.classList.add("hidden")
	obtenerpalabra();
}

function nuevoJuego(){
	musicJuego.play();
	obtenerpalabra(); 
}

function cancelar() {
	musicbtn.play();
	sectionStart.classList.remove("hidden")
	sectionAddWords.classList.add("hidden")
}

function desistir() {
	musicbtn.play();
	sectionStart.classList.remove("hidden")
	sectionGame.classList.add("hidden")
}

function obtenerpalabra () {
	var numero = Math.floor(Math.random() * palabras.length);
	palabra = palabras[numero];
	/*obtener palabra con guiones*/
	var palabraGuiones;
	palabraGuiones = palabra.replace(/./g, "_ ");
	/*mostrar palabras con guiones en el HTML*/
	//contenedor para palabra
	const output = document.querySelector(".word");
	output.innerHTML = palabraGuiones;
	console.log(palabra);
}

btnStart.onclick = iniciarJuego;
btnAddWords.onclick = agregarPalabra;
btnCancelar.onclick = cancelar;
btnDesistir.onclick = desistir;
btnGuardar.onclick = guardaryEmpezar;
btnNew.onclick = nuevoJuego;


