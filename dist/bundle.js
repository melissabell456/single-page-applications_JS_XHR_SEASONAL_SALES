(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

let format = require("./formatData");


let productsRequest = new XMLHttpRequest();
let categoriesRequest = new XMLHttpRequest();
let productData;

function getProductData () {
    productData = JSON.parse(productsRequest.responseText).products;
    categoriesRequest.send();
}
function getCategoryData () {
    let categoryData  = JSON.parse(categoriesRequest.responseText).categories;
    format.formatData(productData, categoryData);
}

function errorWithProductData () {
    console.log("error with data");
}
function errorWithCategoryData () {
    console.log("error with data");
}

productsRequest.addEventListener("load", getProductData);
categoriesRequest.addEventListener("load", getCategoryData);
productsRequest.addEventListener("error", errorWithProductData);
categoriesRequest.addEventListener("error", errorWithCategoryData);

productsRequest.open("GET", "JSON/products.json");
categoriesRequest.open("GET", "JSON/categories.json");

productsRequest.send();

},{"./formatData":4}],2:[function(require,module,exports){
"use strict";

let getPrice = require("./formatData");


module.exports.displayToDom = (prodArr) => {
    prodArr.forEach((prod) => {
        let card = 
        `<div> 
            <h2> "${prod.name} ${prod.discountSeason}" </h2>
            <p class = "${prod.discountSeason.toLowerCase()} regPrice">regular price: ${prod.price}</p>
            <h3 class = "${prod.discountSeason.toLowerCase()} salePrice isHidden">sale price: ${prod.discountPrice}</h3>
        </div>`;
        let productDOMDiv = document.getElementById("productList");
        productDOMDiv.innerHTML += card;
    }); 
};


},{"./formatData":4}],3:[function(require,module,exports){
"use strict";

let prodInfo = require("./formatData");

let getProductList = () => {
    let seasonSelected = selectSeason.value;
    let regPrices = [...document.getElementsByClassName("regPrice")];
    let salePrices = [...document.getElementsByClassName("salePrice")];
    let prodsToDiscount = [...document.getElementsByClassName(seasonSelected)];
    updatePrice(prodsToDiscount, salePrices, regPrices);
};


let updatePrice = (prodsInSeason, allSalePrices, allRegPrices) => {
    allRegPrices.forEach( prod => { prod.classList.remove("isHidden");});
    allSalePrices.forEach( prod => { prod.classList.add("isHidden");});
    prodsInSeason.forEach( prod => { prod.classList.toggle("isHidden");});
};


let selectSeason = document.getElementById("seasons");

selectSeason.addEventListener("change", getProductList);


},{"./formatData":4}],4:[function(require,module,exports){
"use strict";

let displayPg = require("./domDisplay");


module.exports.formatData = (productArray, categoryArray) => {
    let prodListForDom = productArray.map((prod) => {
        categoryArray.forEach((cat) => {
            if (prod.category_id === cat.id) {
                prod.cat_name = cat.name;
                prod.discountPrice = (prod.price - (cat.discount * prod.price)).toFixed(2);
                prod.discountSeason = cat.season_discount;
            }
        }); 
        return prod;
    });
    displayPg.displayToDom(prodListForDom);
    return prodListForDom;
}; 




},{"./domDisplay":2}],5:[function(require,module,exports){
"use strict";

require("./XHR");
require("./domInteract");
},{"./XHR":1,"./domInteract":3}]},{},[5]);
