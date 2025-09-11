"use strict";

console.log("Ready");

const inputSeries = document.querySelector(".input-series");
const buttonSeries = document.querySelector(".button-series");
const listSeries = document.querySelector(".list-series");


const handleClickSearch = () => {
    const searchInput = inputSeries.value;
    console.log(searchInput);

    fetch(`https://api.tvmaze.com/search/shows?q=${searchInput}`)
        .then((response) => {
        return response.json()
        })
    .then((data) => {
        console.log(data);
        data.forEach((item) => {
            listSeries.innerHTML += `<li>${item.show.name}</li>`
        });
    });   
};

buttonSeries.addEventListener("click", handleClickSearch);

