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