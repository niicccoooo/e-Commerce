const ORDER_ASC_BY_PRICE = "Asc";
const ORDER_DESC_BY_PRICE = "Desc";
const ORDER_BY_PROD_COUNT = "Cant.";
let minCount = undefined;
let maxCount = undefined;
let currentSortCategory = undefined;
let currentProductList = [];
let buscarTexto = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }
    return result;
};

function showProductsList(array) {
    let htmlContentToAppend = "";
    
    for(let i = 0; i < currentProductList.length; i++){
        let category = currentProductList[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount)) &&
            ((buscarTexto == undefined) || (buscarTexto != undefined && category.name.toLowerCase().includes(buscarTexto.toLowerCase())))) {

                htmlContentToAppend += `
                
                <div class="col-sm"  width="30%">
                <a href="product-info.html" class="list-group-item list-group-item-action">
                     <div class="row">
                         <div class="">
                             <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                           
                         </div>
                         <div class="">
                             <div class="">
                                 <h4 class="">`+ category.name + `</h4>
                                 <small class="text-muted">` + category.soldCount + ` art??culos </small>
                             </div>
                             <p class="">` + category.description + `</p>
                              <div> $USD ` + category.cost + ` </div>
                         </div>
                     </div>
                    
                </a>
               </div>
              `
            }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
};


function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCategory = sortCriteria;

    if (productsArray != undefined) {
        currentProductList = productsArray;
    }
    currentProductList = sortProducts(currentSortCategory, currentProductList);

    //Muestro las categor??as ordenadas
    showProductsList();
};



//Funci??n que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el m??nimo y m??ximo de los intervalos para filtrar por cantidad
        //de productos por categor??a.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductsList();
    });

    document.getElementById("searchForm").addEventListener("keyup", function () {
        buscarTexto = document.getElementById("searchForm").value;
        showProductsList();
    });

});