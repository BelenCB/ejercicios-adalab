"use strict";

let tasks = [];

const list = document.querySelector(".tasks--list");

const renderTasks = (tasks) => {
  list.innerHTML = "";
  tasks.forEach((task) => {
    if (task.completed) {list.innerHTML += `<li class="task--item">
                            <input id="${task.id}" type="checkbox" checked />
                            <span class="through">${task.name}</span>
                            <button class="delete--button">Borrar tarea</button>
                    </li>`;
    } else {list.innerHTML += `<li class="task--item">
                            <input id="${task.id}" type="checkbox" />
                            <span>${task.name}</span>
                            <button class="delete--button">Borrar tarea</button>
                    </li>`;}
    });
};

fetch('https://dev.adalab.es/api/todo')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    tasks = data.results;
    renderTasks(tasks);
  });

const handleClickCheckbox = (event) => {
    const idTask = parseInt(event.target.id);
    const indexTask = tasks.findIndex((task) => task.id === idTask);
    tasks[indexTask].completed = !tasks[indexTask].completed;
    console.log(tasks);
    
    renderTasks(tasks);
};

list.addEventListener("click", handleClickCheckbox);

//Añadir nueva tarea con el formulario de la izquierda

const addButton = document.querySelector(".add--button");
const input = document.querySelector(".add--input");

const handleClickAdd = (event) => {
  event.preventDefault();
  const addTask = {
    name: input.value,
    completed: false,
    id: 1234,
  };
  tasks.push(addTask);
  renderTasks(tasks);
};

addButton.addEventListener("click", handleClickAdd);

//Hacer que funcione el botón borrar todas las tareas

const deleteAllButton = document.querySelector(".delete-all--button");

const handleClickDeleteAll = () => {
  tasks = [];
  renderTasks(tasks);
};

deleteAllButton.addEventListener("click", handleClickDeleteAll);

//Hacer funcionar el botón de completar todas las tareas

const completedButton = document.querySelector(".completed--button");

const handleCompleteTasks = () => {
  tasks.map((task) => {
    return task.completed;
  });
  console.log(tasks);
  renderTasks(tasks);
};

completedButton.addEventListener("click", handleCompleteTasks);



// hacer que funcionen los botones de borrar una tarea en concreto
// hacer que se pueda filtrar por tarea, botón buscar

//Añadamos por encima del listado de tareas una frase que diga: Tienes X tareas. Y completadas y Z por realizar.
//Cada vez que una tarea se marque/desmarque deberíamos actualizar esta información.

//guardar la lista de tareas en local storage para que al actualizar conserve los cambios

