const express = require("express");
const path = require("path");
const db = require("./db");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

app.use(express.static(__dirname));
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error creating account");
        }

        res.send("Account created successfully!");
    });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Server error"
                });
            }

            if (results.length === 0) {
                return res.status(401).json({
                    message: "Email or password is incorrect"
                });
            }

            const user = results[0];

            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    message: "Email or password is incorrect"
                });
            }

            res.json({
                name: user.name
            });
        }
    );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Website is running on port ${PORT}`);
});
