//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
});

function login(){
    let usuario = document.getElementById("usuario").value;
    let contrasenia = document.getElementById("contra").value;
    
    if (usuario!="" && contrasenia!=""){ 
        localStorage.setItem("usuario",usuario)
            location.href="inicio.html";
    } 
    else { 
         alert("Ingrese usuario y contraseña valido."); 
    } 
};


