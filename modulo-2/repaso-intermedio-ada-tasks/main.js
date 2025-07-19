"use strict";

const tasks = [
  { name: "Recoger setas en el campo", completed: true, id: 5 },
  { name: "Comprar pilas", completed: true, id: 14},
  { name: "Poner una lavadora de blancos", completed: true, id: 21 },
  {
    name: "Aprender cómo se realizan las peticiones al servidor en JavaScript",
    completed: false,
    id: 34,
  },
];

const list = document.querySelector(".tasks--list");

const renderTasks = (tasks) => {
  list.innerHTML = "";
  tasks.forEach((task) => {
    if (task.completed) {list.innerHTML += `<li class="task--item">
                            <input id="${task.id}" type="checkbox" checked />
                            <span class="through">${task.name}</span>
                    </li>`;
    } else {list.innerHTML += `<li class="task--item">
                            <input id="${task.id}" type="checkbox" />
                            <span>${task.name}</span>
                    </li>`;}
    });
};

renderTasks(tasks);

const handleClickCheckbox = (event) => {
    const idTask = parseInt(event.target.id);
    const indexTask = tasks.findIndex((task) => task.id === idTask);
    tasks[indexTask].completed = !tasks[indexTask].completed;
    console.log(tasks);
    
    renderTasks(tasks);
};

list.addEventListener("click", handleClickCheckbox);

//Añadir nueva tarea con el formulario de la izquierda

//seleccionar el botón con query selector
//escuchar el click del botón
//crear una función manejadora handleClickAdd
//coger el valor del input
//hacer push con la nueva tarea
//actualizar el DOM
