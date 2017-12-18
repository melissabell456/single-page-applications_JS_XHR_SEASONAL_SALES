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

