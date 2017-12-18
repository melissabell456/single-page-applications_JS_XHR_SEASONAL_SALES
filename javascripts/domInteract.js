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

