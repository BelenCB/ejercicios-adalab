"use strict";

console.log("estamos ready");

document.querySelector("h1").innerHTML = "¡Hola,mundo!";
document.querySelector("#subtitle").innerHTML = "Esto es un subtitulo";
document.querySelector(".paragraph").innerHTML = "Esto es un párrafo";

document.querySelector(".list").innerHTML = "<li><a href=#>Esto es un link de mi lista</a></li>";

document.querySelector(".section-B").classList.add("hidden");
document.querySelector(".section-B").classList.remove("hidden");

document.querySelector(".section-A").style.backgroundColor = "red";

// let nombreQuequeramos = "el valor que se le quiera dar";
// const otroNombrequequeramos = "el valor que queramos darle";
// es mejor usar constantes y luego convertirlas en variables si es necesario

const num1 = 1;
const num2 = 8;
const sum = num1 + num2;
console.log(sum);

const button = document.querySelector(".button");
button.addEventListener("click", () => {
    console.log("has hecho click");
});
button.addEventListener("mouseover", () => {
    console.log("estás encima del botón");
});

let textInput = "";

const input = document.querySelector(".input");
input.addEventListener("focus", () => {
    console.log("Has dejado tu cursor dentro del cuadro de texto");
});
input.addEventListener("blur", () => {
    console.log("Has salido del cuadro de texto");
});
input.addEventListener("change", (event) => {
    console.log("Estás escribiendo en el cuadro de texto");
    textInput = event.target.value;
    console.log(textInput);
});

const form = document.querySelector(".form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("le has dado a enviar");
    window.alert("¿Quieres enviar el formulario?");
});

const viewport = window;
viewport.addEventListener("resize", () => {
    console.log("Está cambiando la resolución de la pantalla");
});

// ejercicio 3 variables

const titleList = document.querySelector(".title-list");
const alumn = document.querySelector(".second-element").textContent;
titleList.innerHTML = titleList.textContent + " " + alumn;

// ejercicio 4 variables

const container = document.querySelector(".container");
container.innerHTML = "<h1>lorem ipsum</h1><img src='http://via.placeholder.com/350x150'/><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>";

// ejercicio 6 variables

document.querySelector(".button-secondary").classList.add(".button.disabled");

// ejercicio 6 eventos

const buttonFilms = document.querySelector(".button-films");
const listFilms = document.querySelector(".list-films");

const inception = 'Inception';
const theButterFlyEffect = 'The butterfly effect';
const eternalSunshineOfTheSM = 'Eternal sunshine of the spotless mind';
const blueVelvet = 'Blue velvet';
const split = 'Split';

buttonFilms.addEventListener("click", () => {
    listFilms.innerHTML += "<li>" + inception + "</li>";
    listFilms.innerHTML += "<li>" + theButterFlyEffect + "</li>";
    listFilms.innerHTML += "<li>" + eternalSunshineOfTheSM + "</li>";
    listFilms.innerHTML += "<li>" + blueVelvet + "</li>";
    listFilms.innerHTML += "<li>" + split + "</li>";
});

const chosenFilm = document.querySelector(".chosen-film");

listFilms.addEventListener("click", (event) => {
    console.log(event.target.textContent);
    chosenFilm.innerHTML = "La peli seleccionada es:" + event.target.textContent;
});

//tipos de funciones, utilizaremos las arrowFunction a partir de ahora

function normalFunction(a, b) {
    console.log(a, b);
    return a + b;
};

const anonimousFunction = function (a, b) {
    console.log(a, b);
    return a + b;
};

const arrowFunction = (a, b) => {
    console.log(a, b);
    return a + b;
};

arrowFunction(1, 2);

// bucle for

for (let i = 0; i < 20; i++) {
    console.log("Me gustan los bucles");
    console.log("voy por la vuelta " + i);
};

const scores = [2, 5, 7, 2, 5, 7, 4, 6, 2];
let acc = 0;
for (let i = 0; i < scores.length; i++) {
    console.log("Voy por la vuelta " + i);
    console.log("En esta vuelta tienes que sumar " + scores[i]);
    acc = acc + scores[i];
    console.log("El resultado es " + acc);
};

console.log("El resultado final es " + acc);

// bucle for ... of: sirve para recorrer un array

const movies = ["Harry Potter", "The Lord of the Rings", "How to train your dragon", "Frozen", "Indiana Jones"];

for (let i = 0; i < movies.length; i++) {
    console.log(`${movies[i]} was nominated to Academy Awards this year`);
};

for (const movie of movies) {
    console.log(`${movie} was nominated to Academy Awards this year`);
};

// bucle for ... in: se usa para objetos

const userData = {
    name: "Ana",
    email: "ana@gmail.com",
};

for (const item in userData) {
    console.log(item);
    console.log(userData[item]);
};

// bucle forEach

const numbers = [1, 2, 3, 4, 5];
numbers.forEach((number, index) => {
    console.log("Número " + number);
});

// querySelectorAll

const paragraph = document.querySelector("p");
console.log(paragraph);
// aquí solo coge el primer párrafo que encuentra

const paragraphs = document.querySelectorAll("p");
console.log(paragraphs);
// aquí pilla todos los párrafos

paragraphs[0].innerHTML = "Este es mi primer párrafo modificado";

paragraphs.forEach((paragraph) => {
    console.log(paragraph);
    paragraph.classList.add("custom");
});



// ejercicio 3 bucles

const inputBook1 = document.querySelector(".input--book1");
const inputBook2 = document.querySelector(".input--book2");
const buttonBooks = document.querySelector(".button--books");
const answerBooks = document.querySelector(".answer--books");

const books = [];

const handleClickButton = () => {
  const book1 = inputBook1.value;
  const book2 = inputBook2.value;
  books.push(book1, book2);
  console.log(books);
  for (const book of books) {
    answerBooks.innerHTML += " ¡A mí también me encantó " + book + "!"
  };
};

buttonBooks.addEventListener("click", handleClickButton);




