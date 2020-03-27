const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");
const routes = require("./routes");

const app = express();
app.use(express.json()); // recebe request.body em json
app.use(cors()); // permite ou nao acessos a api

app.use(routes); //rotas
app.use(errors());

module.exports = app
