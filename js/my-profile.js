
function guardarUsuario() {

    let datosPerfil = {
        nombres: document.getElementById("nombres").value,
        apellidos: document.getElementById("apellidos").value,
        edad: document.getElementById("edad").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
    }

    let mailUser = {
        email: document.getElementById("email").value
    };

    let mailUser_json = JSON.stringify(mailUser);

    localStorage.setItem("mailUser", mailUser_json);
    localStorage.setItem('profile', JSON.stringify(datosPerfil));

    alert("Se han guardado tus datos!");

}


function mostrarUsuario() {

    let datos_json = localStorage.getItem("mailUser");
    let datos = JSON.parse(datos_json);

    let profile_json = localStorage.getItem("profile");
    let profile = JSON.parse(profile_json);

    if ((localStorage.getItem("profile")) && profile.email == datos.email) {

        let profile_json = localStorage.getItem("profile");
        let profile = JSON.parse(profile_json);
        document.getElementById("nombres").value = profile.nombres;
        document.getElementById("apellidos").value = profile.apellidos;
        document.getElementById("edad").value = profile.edad;
        document.getElementById("email").value = profile.email;
        document.getElementById("telefono").value = profile.telefono;

    } else {

        document.getElementById("email").value = datos.email;
    }

}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e) {

    mostrarUsuario();

});


let form = document.getElementById('needs-validation');
form.addEventListener('submit', function(e) {

    if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();

    } else {

        guardarUsuario();
        mostrarUsuario();

    }

    form.classList.add('was-validated');
})