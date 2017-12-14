(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

let format = require("./formatData");
// console.log(format);
// console.log("connected to XHR", format.formatData);

let productsRequest = new XMLHttpRequest();
let categoriesRequest = new XMLHttpRequest();
let productData;

function getProductData () {
    productData = JSON.parse(productsRequest.responseText).products;
    console.log(productData);
    categoriesRequest.send();
}
function getCategoryData () {
    let categoryData  = JSON.parse(categoriesRequest.responseText).categories;
    console.log(categoryData);
    console.log("what is format", format);
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

// module.exports = {getProductData, getCategoryData};
},{"./formatData":3}],2:[function(require,module,exports){
"use strict";

// const userInteract = require("./domInteract");
// require("./formatData");
// const main = require("./seasonal-sales");


module.exports.displayToDom = (prodArr) => {
    console.log("prodArr");
    prodArr.forEach((prod) => {
        let card = 
        `<div class = "${prod.discountSeason}"> 
            <h2> "${prod.name}" </h2>
            <p>"${prod.price}"</p>
        </div>`;
        let productDOMDiv = document.getElementById("productList");
        productDOMDiv.innerHTML += card;
    }); 
    /*closing forEach*/
};

// module.exports = displayToDom;
},{}],3:[function(require,module,exports){
"use strict";

let displayPg = require("./domDisplay");
console.log(displayPg.displayToDom);



module.exports.formatData = (productArray, categoryArray) => {
    console.log("in the formatData function");
    console.log(productArray);
    console.log(categoryArray);
    // need to add key on products for cat_name & discounted_cost
    // match up categories.id & products.category_id to assign name
    let prodListForDom = productArray.map((prod) => {
        categoryArray.forEach((cat) => {
            if (prod.category_id === cat.id) {
                prod.cat_name = cat.name;
                prod.discountPrice = (prod.price - (cat.discount * prod.price)).toFixed(2);
                prod.discountSeason = cat.season_discount;
            }
        }); /*closing category forEach*/
        // console.log(prod);
        return prod;
    });/*closing products map*/
    // console.log("this is being passed to be printed to DOM", prodListForDom);
    displayPg.displayToDom(prodListForDom);
}; /*closing function*/
// console.log(formatData);

// module.exports = formatData ;
},{"./domDisplay":2}],4:[function(require,module,exports){
"use strict";

require("./domDisplay");
require("./XHR");
},{"./XHR":1,"./domDisplay":2}]},{},[4]);
