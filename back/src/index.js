const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");


const app = express();
app.use(express.json()); // recebe request.body em json
app.use(cors()); // permite ou nao acessos a api
app.use(routes); //rotas

app.listen(3333, () => {
  console.log("SERVER RODANDO");
});
