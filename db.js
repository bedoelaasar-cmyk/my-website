const mysql = require('mysql2');

const connection = mysql.createConnection(
    process.env.MYSQL_url
);

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL:', err);
        return;
    }

    console.log('Connected to MySQL successfully!');
});

module.exports = connection;
