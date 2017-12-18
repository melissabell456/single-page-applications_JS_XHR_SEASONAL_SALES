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



