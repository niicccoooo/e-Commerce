
function showRelatedComments(array) {
    htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let commentNmbr = array[i];

        htmlContentToAppend += ` <p> <strong>` + commentNmbr.user + `</strong> - ` + commentNmbr.dateTime + ` - ` 
        + showStars(commentNmbr.score) + ` <br> ` + commentNmbr.description + `  </p>`
    }

    document.getElementById("comentario").innerHTML = htmlContentToAppend;
}


function postComment(e) {
    let comentario = {
        score: e.stars.value,
        description: e.message.value,
        user: localStorage.getItem("user"),
        dateTime: new Date()
    }

    commentNmbr.push(comentario)
    showRelatedComments(commentNmbr);
    return false;
}


function showImagesGallery(array) {

    let htmlContentToAppend = "";
    let activar;

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

            if (i==0) activar = "active";

            else activar ="";

        htmlContentToAppend += ` <div class="carousel-item ` +activar+ ` " >
        <img src="` + imageSrc + `" class="d-block w-100" alt="Carrusel">
        </div> `
    }

    document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
}


function showStars(markedStars) {
    let estrellas = "";

    for (let i = 0; i < 5; i++) {
        if (i < markedStars) {
            estrellas += `<span class="fa fa-star checked"></span>`;
        } else {
            estrellas += `<span class="fa fa-star"></span>`;
        }
    }

    return estrellas;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            category = resultObj.data;

            let categoryNameHTML = document.getElementById("categoryName");
            let categoryDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");

            categoryNameHTML.innerHTML = category.name;
            categoryDescriptionHTML.innerHTML = category.description;
            productCountHTML.innerHTML = category.soldCount;
            productCriteriaHTML.innerHTML = category.category;

            
        //Muestro las imagenes en forma de galería
        showImagesGallery(category.images);


        getJSONData(PRODUCTS_URL).then(function (resultProd) {
            if (resultProd.status === "ok") {

                related = resultProd.data;
                showRelatedImages(related);
                
                }
            });
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultComm) {
        if (resultComm.status === "ok") {

            commentNmbr = resultComm.data;
            showRelatedComments(commentNmbr);
        }
    });

});