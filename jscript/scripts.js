function calcular(){
		valortemp = 0;
		if (document.getElementById("tipo").selectedIndex == "0"){
			alert("Elija un tipo de página");
		}else {
			switch(document.getElementById("tipo").selectedIndex){
				case 1:
					valortemp=200;
					break;
				case 2:
					valortemp=300;
					break;
				case 3:
					valortemp=400;
					break;
				default:
					valortemp=0;
					alert("Error desconocido");		
			}
			meses = document.getElementById("plazo").value;
			for (i = 0; i < meses; i++) {
				if (i === 5) { break; }
				valortemp = valortemp*0.95;
			}
			valortemp = valortemp + (document.querySelectorAll('input[name="contenidopagina"]:checked').length * 400);
			
		}
		document.getElementById("presupuesto").value = valortemp;
		
}

//Validamos el formulario de presupuestos
function validar(formulario){

		//comprobamos la longitud de los nombres
		if (formulario.nombreform.value.length==0){
			alert ("El campos nombre es obligatorio");
			return false;
		}
		//esta lista de caracteres lo que hace es comprobar que se le introduce caracteres validos seguidos de un "@" con más texto para terminar con un ".com" por
		//ejemplo "[a-z]" significa de la "a" a la "Z" y {2,3} la longitud de esta palabra final. 
		listacar=/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
		if (!listacar.test(document.getElementById('mailform').value)){
			alert ("Debe indicar un email valido");
			return false;
		}
		//comprobamos si se envía información del proyecto
		if (formulario.telefonoform.value.toString().length<6){
			alert ("Indique un numero de teléfono valido");
			return false;
		}
		//comprobamos si se envía información del proyecto
		if (formulario.descripcionform.value.length<20){
			alert ("Indique una descripción de su proyecto");
			return false;
		}
		//comprueba se aceptan las políticas de privacidad
		if (!formulario.politicasform.checked){
			alert ("Debe aceptar la política de privacidad.");
			return false;
		}	
}

//Validamos el formulario de contacto
function validar2(formulario){

		//comprobamos la longitud de los nombres
		if (formulario.nombreform.value.length==0){
			alert ("El campos nombre es obligatorio");
			return false;
		}
		//esta lista de caracteres lo que hace es comprobar que se le introduce caracteres validos seguidos de un "@" con más texto para terminar con un ".com" por
		//ejemplo "[a-z]" significa de la "a" a la "Z" y {2,3} la longitud de esta palabra final. 
		listacar=/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
		if (!listacar.test(document.getElementById('mailform').value)){
			alert ("Debe indicar un email valido");
			return false;
		}
		//comprobamos si se envía información del proyecto
		if (formulario.telefonoform.value.toString().length<6){
			alert ("Indique un numero de teléfono valido");
			return false;
		}
		
		var input = document.getElementById("fechareunion").value;
		var fechaintroducida = new Date(input);
		var fechaminima = new Date().getTime() + (24 * 60 * 60 * 1000);
		var fechamaxima = new Date().getTime() + (365 * 24 * 60 * 60 * 1000);
		
		//Comprobamos que se ha introducido una fecha
		if (isNaN(fechaintroducida)) {
			alert("Introduzca una fecha para la reunión por favor.");
			return false;
		}

		//Comprobamos que la fecha esta entre mañana y dentro de un año
		if (fechaintroducida > fechamaxima) {
			alert ("Plazo máximo para la reunión de un año");
			return false;
		}else if (fechaintroducida < fechaminima) {
			alert ("Plazo mínimo para la reunión a partir de mañana");
			return false;
		}else {
			alert("Fecha valida");
		}
		
		//comprobamos si se envía información del proyecto
		if (formulario.motivoreunion.value.length<5){
			alert ("Indique el motivo de la reunión");
			return false;
		}
		//comprueba se aceptan las políticas de privacidad
		if (!formulario.politicasform.checked){
			alert ("Debe aceptar la política de privacidad.");
			return false;
		} else {
			alert ("Privacidad marcada");
		}
}


// Cuando el usuario hace scroll usamos la función stickyFunction
window.onscroll = function() {stickyFunction()};

// Get the navbar
///var navbar = document.getElementById("menu");

// Get the offset position of the navbar
//var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyFunction() {
	
  if (window.pageYOffset > document.getElementById("menu").offsetTop) {
    document.getElementById("menu").classList.add("deslizante");
//	alert("Baja");
  } else {
    document.getElementById("menu").classList.remove("deslizante");
//	alert("Sube");
  }
}

function cargarportada(){
	cargarnoticias();
	cargarindex();
}
	

function cargarnoticias(){
	var objHttp=null;
	if(window.XMLHttpRequest) {
		objHttp = new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		objHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	objHttp.open("GET", "portada.xml", true);
	objHttp.onreadystatechange = function() {
		if (objHttp.readyState==4) {
			var documento = objHttp.responseXML; 
			var noticias = documento.documentElement;
			var cadena = "<h2>Últimas noticias</h2>";	
			for (i = 0;i < 3; i++){ 			
				cadena = cadena + "<b>Titular:</b> " + noticias.getElementsByTagName("item")[i].childNodes[1].firstChild.nodeValue + "<br/>";	
				cadena = cadena + "<b>Descripcion:</b> " + noticias.getElementsByTagName("item")[i].childNodes[9].firstChild.nodeValue + "<br/>";
				cadena = cadena + "<b>Enlace:</b> <a href='" + noticias.getElementsByTagName("item")[i].childNodes[5].firstChild.nodeValue + "' target='_blank'>" + 
				noticias.getElementsByTagName("link")[i].childNodes[0].nodeValue + "</a><br/><br/>";
			}
			document.getElementById("container").innerHTML = cadena;
			} 
	}
	objHttp.send(null);
} 


function cargarindex(){
	var objHttp=null;
	if(window.XMLHttpRequest) {
		objHttp = new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		objHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	objHttp.onreadystatechange = function() {
		if (objHttp.readyState==4) {
			document.getElementById('textoportada').innerHTML = objHttp.responseText;
		}
		objHttp.send(null);			
	}
	objHttp.open("GET", "textoindex.html" , true);
}


//Galería

// Open the Modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

//Función para marcar la fecha mínima de la reunión al día de hoy
function fechaminima(){
	var fecha = new Date();
	var dd = fecha.getDate();
	var mm = fecha.getMonth()+1; //Enero es 0!
	var yyyy = fecha.getFullYear();
	if(dd<10){
			dd='0'+dd
		} 
		if(mm<10){
			mm='0'+mm
		} 
	dd=dd+1;
	fecha = yyyy+'-'+mm+'-'+dd;
	//marcamos como fecha mínima para la reunión el día de mañana
	document.getElementById("fechareunion").setAttribute("min", fecha);
	yyyy = yyyy+1;
	fecha = yyyy+'-'+mm+'-'+dd;
	//marcamos como fecha máxima para la reunión para dentro de un año
	document.getElementById("fechareunion").setAttribute("max", fecha);
}

