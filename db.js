const mysql = require("mysql2");

const u = new URL(process.env.MYSQL_URL);

const connection = mysql.createConnection({
    host: u.hostname,
    port: u.port,
    user: u.username,
    password: u.password,
    database: u.pathname.slice(1)
});

connection.connect((err) => {
    if (err) {
        console.log("Error connecting to MySQL:", err);
        return;
    }

    console.log("Connected to MySQL successfully!");
});

module.exports = connection;