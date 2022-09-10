/**/
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

/*Vector de palabras */
let palabras = ["VERANO","PLAYA","JUEGO","PANTALLA","CONSOLA","CASA","MESA","SILLA","PUERTA","LENGUAJE","CODIGO","AUTO","MOTO","ARBOL","PANTALON","CAMISA"];

// variables
let palabra = "";
let errores = 0;
let palabraGuiones ="";
let output = document.querySelector(".word");
let imagenAhoracado = document.getElementById("img-ahorcado");
const palabraSecreta = document.getElementById("palabraSecreta");

//botones
const btnStart = document.querySelector(".start");
const btnAddWords = document.querySelector(".add-word");
const btnGuardar = document.getElementById("btn-add");
const btnNew = document.querySelector("#btn-nuevojuego");
const btnCancelar = document.getElementById(".btn-cancelar");
const btnDesistir = document.querySelector("#btn-desistir");
const btn_letras = document.querySelectorAll(".keyword button");
const btn_aceptar = document.querySelector(".btn-aceptar");
const btn_atras = document.querySelector(".btn-atras");

//secciones
const sectionStart = document.querySelector(".section-start");
const sectionGame = document.querySelector(".section-game");
const sectionAddWords = document.querySelector(".section-add-words");
const foo = document.getElementById("foo");
const messageLoser = document.querySelector(".messageLoser");
const messageWinner = document.querySelector(".messageWinner");
const pista = document.querySelector(".pista");
//sonidos
const musicbtn = new Audio('sound/cork-85200.mp3');
const musicJuego = new Audio('sound/click-47609.mp3');
const songLoser = new Audio('sound/Loser.mp3');
const songWinner = new Audio('sound/winner.mp3');

/*Funciones de mostrar y ocultar secciones*/
function iniciarJuego(){
    musicJuego.play();
	sectionGame.classList.remove("hidden")
	sectionStart.classList.add("hidden")
	foo.classList.add("hidden")
	obtenerpalabra();
	resetValores();
	
}

function agregarPalabra(){
	musicbtn.play();
	sectionAddWords.classList.remove("hidden")
	sectionStart.classList.add("hidden")
	foo.classList.add("hidden")
}

function guardaryEmpezar(){
	musicJuego.play();
	sectionGame.classList.remove("hidden")
	sectionAddWords.classList.add("hidden")
	obtenerpalabra();
	resetValores();
}

function nuevoJuego(){
	musicJuego.play();
	obtenerpalabra();
	resetValores();
}

function cancelar() {
	musicbtn.play();
	sectionStart.classList.remove("hidden")
	sectionAddWords.classList.add("hidden")
	foo.classList.remove("hidden")
}

function desistir() {
	musicbtn.play();
	palabraSecreta.innerHTML = "La palabra era: " + palabra;
	messageLoser.classList.remove("hidden")
	songLoser.play();
	songLoser.volume = 0.1;
}

function aceptar () {
	messageLoser.classList.add("hidden")
	messageWinner.classList.add("hidden")
	btnDesistir.disabled = false;
	btnNew.disabled = false;
	iniciarJuego();
}

function atras() {
	musicbtn.play();
	sectionStart.classList.remove("hidden")
	sectionGame.classList.add("hidden")
	btnDesistir.disabled = false;
	btnNew.disabled = false;
	messageLoser.classList.add("hidden")
	foo.classList.add("hidden")
}

function obtenerpalabra () {
	var numero = Math.floor(Math.random() * palabras.length);
	palabra = palabras[numero];
	;
	/*obtener palabra con guiones*/
	palabraGuiones = palabra.replace(/./g, "_ ");
	/*mostrar palabras con guiones en el HTML*/
	//contenedor para palabra
	output.innerHTML = palabraGuiones;
}

for (var i = 0; i < btn_letras.length; i++) {
	btn_letras[i].addEventListener('click', click_letras);
}

function resetValores(){
	//habilitar letras
	for (var i = 0; i < btn_letras.length; i++) {
		btn_letras[i].disabled = false;
		btn_letras[i].classList.remove("letterdisabled")
	} 
	errores = 0;
	imagenAhoracado.src = `images/img0.png`;
	pista.innerHTML = "Obtener una pista";
}

function obtenerPista(){
	pista.innerHTML = "Comienza con la letra " + palabra[0]  
}

function click_letras(event){
	let bandera = 0;
	let bandera2 = 0;
	const button = event.target;
	button.disabled = true;
	const letra = button.innerHTML.toUpperCase();
	palabra = palabra.toUpperCase();

	for (var i = 0; i < palabra.length; i++) {
		if(letra == palabra[i]){
			palabraGuiones = palabraGuiones.replaceAt(i*2,letra);
			bandera = 1;
 		}else{
 			button.classList.add("letterdisabled")
 		}	
	}
	output.innerHTML = palabraGuiones;

	if(bandera == 0){
		errores++;
		imagenAhoracado.src = `images/img${errores}.png` ;
	}

	if(errores == 6){
		for (var i = 0; i < btn_letras.length; i++) {
			btn_letras[i].disabled = true;
		}
		console.log(palabraGuiones);
		palabraSecreta.innerHTML = "La palabra era: " + palabra;
		messageLoser.classList.remove("hidden")
		songLoser.play();
		songLoser.volume = 0.1;
		btnDesistir.disabled = true;
		btnNew.disabled = true;
		
	}
	//comparacion para ganar
	for (var i = 0; i < palabra.length; i++) {
		if(palabraGuiones[i*2] != palabra[i]){
			bandera2=1;
		}
		
	}
	if(bandera2 == 0){
		messageWinner.classList.remove("hidden")
		songWinner.play()
		songLoser.volume = 0.1;
		btnDesistir.disabled = true;
		btnNew.disabled = true;

	}
}



btnStart.onclick = iniciarJuego;
btnAddWords.onclick = agregarPalabra;
btnCancelar.onclick = cancelar;
btnDesistir.onclick = desistir;
btnGuardar.onclick = guardaryEmpezar;
btnNew.onclick = nuevoJuego;
btn_aceptar.onclick = aceptar;
btn_atras.onclick = atras;
pista.onclick = obtenerPista;