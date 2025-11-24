const express = require('express');
const cors = require('cors');
const mysql = require("./database/mysql-pool");
const app = express();
const port = 3000;
require("dotenv").config();

// Configuración para subir límite de respuesta
app.use(express.json({limit: '25mb'}));
// Para evitar errores de diferente origen cuando se hace la petición
app.use(cors());

// Configuración para escuchar en el puerto definido
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Endpoints: pasos para hacerlo
// 1. Poner el método
// 2. Poner la ruta
// 3. Coger de los parámetros los datos que voy a necesitar
// 4. Crear la query
// 5. Crear conexión y pasar la query
// 6. Retornar los datos

//Obtener notas de la bbdd
app.get("/notes", async (req,res) => {
    try {
        const query = "SELECT * FROM notes WHERE deleted_at IS NULL";
        const connection = await mysql.getConnection();
        const data = await connection.query(query);
        res.json(data[0]);
    } catch {
        res.send("Algo ha ido mal");
    }
});

// Obtener solo una nota en concreto
app.get("/note/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const query = "SELECT * FROM notes WHERE id_note = ?";
        const connection = await mysql.getConnection();
        const data = await connection.query(query, [id]);
        res.json(data[0]);
    } catch {
        res.send("Algo ha ido mal");
    }
});

//Crear una nota en la bbdd
app.post("/add-note", async (req,res) => {
    try {
        const { title, content, photo } = req.body;
        const query = "INSERT INTO notes (title, content, photo) VALUES (?,?,?)";
        const connection = await mysql.getConnection();
        await connection.query(query, [title, content, photo || null]);
        res.status(201).send("Nota creada");
    } catch {
        res.send("Algo ha ido mal");
    }
});

//Modificar una nota: se puede usar put para modificar la mayoría de las columnas, o patch para modificar una o dos columnas
app.put("/modify-note/:id", async (req,res) => {
    try {
        const { id } = req.params;
        // Le pasaremos todos los datos aunque no se hayan modificado todos desde el front, si sigue siendo el mismo dato lo volvemos a poner
        const { title, content, photo } = req.body;
        const query = "UPDATE notes SET title = ?, content = ?, photo = ? WHERE id_note = ?";
        const connection = await mysql.getConnection();
        await connection.query(query, [title, content, photo || null, id]);
        res.send("Nota modificada");
    } catch {
        res.send("Algo ha ido mal");
    }
});

//Eliminar una nota
app.patch("/delete-note/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const query = "UPDATE notes SET deleted_at = NOW() WHERE id_note = ?";
        const connection = await mysql.getConnection();
        await connection.query(query, [id]);
        res.send("Nota eliminada");
    } catch {
        res.send("Algo ha ido mal");
    }
});