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