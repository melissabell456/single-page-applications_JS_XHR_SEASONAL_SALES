"use strict";

let displayPg = require("./domDisplay");
console.log(displayPg);



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
    displayPg(prodListForDom);
}; /*closing function*/
// console.log(formatData);

// module.exports = formatData ;