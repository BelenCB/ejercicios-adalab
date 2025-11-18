const express = require('express');
const cors = require('cors');
const bcrypt = require("bcrypt");
const mysql = require("./database/mysql-pool");
const { generateToken } = require("./utils/jwt");
const { authenticateToken } = require("./middlewares/authenticate-token");
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

// Endpoints
app.get('/', function (req, res) {
  res.json({ message: "Hola mundo" });
});

app.get("/projects", function (req, res) {
    res.json([
        {
            id: 1,
            name: "Primer proyecto",
        },
        {
            id: 2,
            name: "Segundo proyecto",
        },
    ]);
});

app.get("/books", async (req, res) => {
    try {
        const query = "SELECT * FROM books";
        const connection = await mysql.getConnection();
        const data = await connection.query(query);
        res.json(data[0]);
    } catch {
        res.send("Algo ha ido mal");
    }
});

app.get("/ruta-privada", authenticateToken, async (req,res) => {
    res.json({ message: "Usuario autorizado" });
});

// Endpoint registro
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //se utiliza para crear un hash seguro de la contraseña antes de almacenarla en la base de datos.
        //El 10 es el número de rondas de salting, que agrega seguridad al hash.
        const passwordHash = await bcrypt.hash(password, 10);

        const query =
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

        const connection = await mysql.getConnection();
        const data = await connection.query(query, [
            username,
            email,
            passwordHash,
        ]);

        // El insertId es el ID del usuario recién insertado en la base de datos.
        const token = generateToken({
            id: data[0].insertId,
        });

        res.json({ token, name: username, id: data[0].insertId });
    } catch (error) {
        console.log(error);
        res.send("Algo ha salido mal");
    }
});

// Endpoint login

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        //Buscar si el usuario existe en la base de datos
        const query = "SELECT * FROM users WHERE email = ?";

        const connection = await mysql.getConnection();
        const [data] = await connection.query(query, [email]);

        const user = data[0];

        if (!user) {
            return res.status(401).json({
                error: "Usuario inválido",
            });
        }

        //Comprueba si el usuario existe y si la contraseña proporcionada es correcta utilizando bcrypt.compare.
        const isPasswordCorrect =
            user === null
                ? false
                : await bcrypt.compare(password, user.password);

        //Si el usuario no existe o la contraseña es incorrecta, responde con un estado 401 y un mensaje de error.
        if (!isPasswordCorrect) {
            return res.status(401).json({
                error: "Credenciales inválidas",
            });
        }

        //Crear el token para enviar al front
        const token = generateToken({
            id: user.id_user,
        });

        //Finalmente, si todo es correcto, la función responde con un estado 200 y envía un objeto JSON con el token, el nombre de usuario y el nombre real del usuario.
        res.json({ token, name: user.username, id: user.id_user });
    } catch (error) {
        console.log(error);
        res.send("Algo ha salido mal");
    }
});

// Endpoint añadir un articulo vinculado al usuario logueado

app.post("/add-article", authenticateToken, async (req, res) => {
    try {
        const { name, description } = req.body;
        const fk_user = req.user.id;
        const query =
            "INSERT INTO articles (name, description, fk_user) VALUES (?, ?, ?)";
        const connection = await mysql.getConnection();
        const data = await connection.query(query, [
            name,
            description,
            fk_user,
        ]);
      
        res.json({
            message: "Artículo creado",
            articleId: data[0].insertId,
            userId: fk_user
        });
    } catch (error) {
        console.log(error);
        res.send("Algo ha salido mal");
    }
});

// Endpoint para consultar todos los artículos del usuario logueado
app.get("/search-articles", authenticateToken, async (req, res) => {
    try {
        const { search } = req.query;
        const userId = req.user.id;
        const query = "SELECT * FROM articles WHERE fk_user = ?";
        const connection = await mysql.getConnection();
        const data = await connection.query(query, [userId]);
        res.json(data[0]);
    } catch {
        res.send("Algo ha ido mal");
    }
});