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