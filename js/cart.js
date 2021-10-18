function mostrarArticulosCarrito(array) {
    htmlContentToAppend = "";

    for (let i = 0; i < array.articles.length; i++) {

        htmlContentToAppend += `
            <tr>
                <td>  <img  src="`+ array.articles[i].src + `  " height="50" ></img>    </td>
                <td>   ` + array.articles[i].name + `  </td>
                <td>  <input type="number" class="form-control" id="prueba`+ [i + 1] + `" placeholder=" " required="" value="` + array.articles[i].count + `" min="0" onchange="update()" >  </td>
                <td>`+ parseInt(array.articles[i].unitCost) + ` ` + array.articles[i].currency + `</td>
                <td id="subtotal`+ [i + 1] + `">   </td>
            </tr>`

    }

    document.getElementById("mostrarArticulos").innerHTML = htmlContentToAppend;

    update();

};


function update() {
    let sub = 0;

    for (let i = 0; i < resultadoCarrito.articles.length; i++) {
        let a = 1;

        if (resultadoCarrito.articles[i].currency == "USD") {
            a = 40;
        }

      
        let unitCost = resultadoCarrito.articles[i].unitCost;
        let cantidad = document.getElementById("prueba" + [i + 1]).value;

        let itemPrice = (cantidad * unitCost * a)
        sub += itemPrice;

        document.getElementById("subtotal" + [i + 1]).innerHTML = itemPrice + ` UYU  `;
    }

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_INFO_URL).then(function (resultCart) {
        if (resultCart.status === "ok") {

            resultadoCarrito = resultCart.data;
            mostrarArticulosCarrito(resultadoCarrito);

            update();
        }
    });

    getJSONData(otroProducto).then(function (resultCart) {
        if (resultCart.status === "ok") {

            resultadoCarrito = resultCart.data;
            mostrarArticulosCarrito(resultadoCarrito);

            update();
        }
    });



});

