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

app.get("/books", async (req,res) => {
    try {
        const query = "SELECT * FROM books";
        const connection = await mysql.getConnection();
        const data = await connection.query(query);
        res.json(data[0]);
    } catch {
        res.send("Algo ha ido mal");
    }
});

// Endpoint peticiones con query params
app.get("/order-books", async (req, res) => {
    try {
        const { sort } = req.query;
        const query = `SELECT * FROM books ORDER BY price ${sort}`;
        const connection = await mysql.getConnection();
        const data = await connection.query(query);
        res.json(data[0]);
    } catch {
        res.send("Algo ha ido mal");
    }
});

// Endpoint peticiones con url params
app.get("/book/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const query = "SELECT * FROM books WHERE id_book = ?";
        const connection = await mysql.getConnection();
        const data = await connection.query(query, [id]);
        res.json(data[0]);
    } catch {
        res.send("Algo ha ido mal");
    }
 });

// Endpoint para guardar usuarios en mi bbdd (body params)

// Desde el front...

// const userData = {
//     name: "Belén",
//     email: "belen@gmail.com"
// }

// fetch("http://localhost:3000/user", {
//     method: "POST",
//     body: JSON.stringify(userData),
//     headers: {
//         'Content-type': 'application/json'
//     }
// });
//     .then(...)

app.post("/user", async (req,res) => {
    try {
        const { name, email } = req.body;
        const query = "INSERT INTO users (name, email) VALUES (?,?)";
        const connection = await mysql.getConnection();
        await connection.query(query, [name, email]);
        res.status(201).json({message: "usuario creado",});
    } catch {
        res.send("Algo ha ido mal");
    }
});

app.post("/add-book", async (req,res) => {
    try {
        const { title, publication_date, genre, price, author, author_country, number_pages, stock, book_type } = req.body;
        const query = "INSERT INTO books (title, publication_date, genre, price, author, author_country, number_pages, stock, book_type) VALUES (?,?,?,?,?,?,?,?,?)";
        const connection = await mysql.getConnection();
        await connection.query(query, [title, publication_date, genre, price, author, author_country, number_pages, stock, book_type]);
        res.status(201).json({message: "Libro añadido a la base de datos",});
    } catch {
        res.send("Algo ha ido mal");
    }
});

// Endpoint peticiones con header params

// fetch("http://localhost:3000/user", {
//     method: "POST",
//     body: JSON.stringify(userData),
//     headers: {
//         'Content-type': 'application/json',
//          'otro-header-personalizado': 'valor-personalizado'
//     }
// });
//     .then(...)

app.get('/headers', (req, res) => {
  res.json(req.headers);
});