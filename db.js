const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Abdo@2008',
    database: 'mywebsite'
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL:', err);
        return;
    }

    console.log('Connected to MySQL successfully!');
});

module.exports = connection;