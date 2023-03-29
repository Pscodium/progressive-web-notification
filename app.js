const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));