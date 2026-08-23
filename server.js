const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "../HTML")));

app.listen(3000, () => {
    console.log("Website is running at http://localhost:3000");
});