//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function login() {
    let usuario = document.getElementById("usuario").value;
    let contrasenia = document.getElementById("contra").value;
    
    if (usuario!="" && contrasenia!="") { 
        localStorage.setItem('user', usuario);
        location.href="inicio.html";
    } 
    else { 
        alert("Ingrese usuario y contraseña valido."); 
    } 
}

document.addEventListener("DOMContentLoaded", function(e) {
});
