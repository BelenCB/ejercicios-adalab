const mysql = require("mysql2/promise");

const getConnection = async () => {
    const connection = await mysql.createConnection({
        host: "localhost",
        database: "bookshop",
        user: "root",
        password: "24_Becoba_25"
    });
    await connection.connect();

    console.log(
        `Conexión establecida con la base de datos (identificador=${connection.threadId})`
    );

    return connection;
};

module.exports = {
    getConnection,
};