
let PERCENTAGE_SYMBOL = '%';
let simboloPeso = " $UY";
let porcentajeEnvio = 0.15;
let precioFinal = [];


function mostrarArticulos(array) {

    htmlContentToAppend = "";

    for (let i = 0; i < array.articles.length; i++) {

        htmlContentToAppend += `
            <tr>
                <td>  <img  src="`+ array.articles[i].src + `  " height="50" ></img>    </td>
                <td>   ` + array.articles[i].name + `  </td>
                <td>  <input type="number" class="form-control" id="prueba`+ [i + 1] + `" placeholder=" " required="" value="` + array.articles[i].count + `" min="0" onchange="actualizarPrecio()" >    </td>
                <td>`+ parseInt(array.articles[i].unitCost) + ` ` + array.articles[i].currency + `</td>
                <td id="subtotal`+ [i + 1] + `">   </td>
                <td> <button type="button" value="eliminar"  class="btn btn-link" onclick="eliminar('`+ array.articles[i].name + `')" > X eliminar</button> </td>
            </tr>`
    }

    document.getElementById("mostrarProductos").innerHTML = htmlContentToAppend;
    actualizarPrecio();

};


function actualizarPrecio() {

    let sub = 0;

    for (let i = 0; i < precioFinal.articles.length; i++) {
        var a = 1;

        if (precioFinal.articles[i].currency == "USD") {
            a = 40;
        }

        let unitCost = precioFinal.articles[i].unitCost;
        let cantidad = document.getElementById("prueba" + [i + 1]).value;

        let itemPrice = (cantidad * unitCost * a)
        sub += itemPrice;

        document.getElementById("subtotal" + [i + 1]).innerHTML = itemPrice + ` UYU  `;

    }


    let costoUnidad = document.getElementById("productCostText");
    let costoComision = document.getElementById("comissionText");
    let costoTotal = document.getElementById("totalCostText");

    let mostrarComision = porcentajeEnvio * sub + simboloPeso;
    let mostrarCostoUnidad = sub +  simboloPeso;
    let mostrarCostoTotal = porcentajeEnvio * (sub) + (sub) + simboloPeso;

    costoComision.innerHTML = mostrarComision;
    costoUnidad.innerHTML = mostrarCostoUnidad;
    costoTotal.innerHTML = mostrarCostoTotal;

}


function eliminar(name) {

    newArray = [];

    precioFinal.articles.forEach(article => {
        if (article.name !== name) {
            newArray.push(article)
        }
    })

    precioFinal.articles = newArray;
    mostrarArticulos(precioFinal);

};



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_INFO_URL).then(function (resultCart) {
        if (resultCart.status === "ok") {

            precioFinal = resultCart.data;

            mostrarArticulos(precioFinal);

            actualizarPrecio();
        }
    });

    getJSONData(otroProducto).then(function (resultCart) {
        if (resultCart.status === "ok") {

            precioFinal = resultCart.data;

            mostrarArticulos(precioFinal);

            actualizarPrecio();
        }
    });


    document.getElementById("goldradio").addEventListener("change", function () {
        porcentajeEnvio = 0.15;
        actualizarPrecio();

    });


    document.getElementById("premiumradio").addEventListener("change", function () {
        porcentajeEnvio = 0.07;
        actualizarPrecio();

    });


    document.getElementById("standardradio").addEventListener("change", function () {
        porcentajeEnvio = 0.05;
        actualizarPrecio();
    });

});