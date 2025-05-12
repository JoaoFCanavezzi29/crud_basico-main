const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const db = require("../models");
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine EJS
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// Rotas
const indexRouter = require("../routes/index");
const categoriaRouter = require("../routes/categorias");
const professorRouter = require("../routes/professor");
const alunoRouter = require("../routes/aluno");
const cursoRouter = require("../routes/curso");
const disciplinaRouter = require("../routes/disciplina");

app.use("/", indexRouter);
app.use("/categorias", categoriaRouter);
app.use("/professores", professorRouter);
app.use("/alunos", alunoRouter);
app.use("/cursos", cursoRouter);
app.use("/disciplinas", disciplinaRouter);

// Sequelize
let isDbSynced = false;

app.use(async (req, res, next) => {
  if (!isDbSynced) {
    try {
      await db.sequelize.sync();
      isDbSynced = true;
      console.log("Banco sincronizado.");
    } catch (error) {
      console.error("Erro ao sincronizar banco:", error);
    }
  }
  next();
});

// Exportação para Vercel
module.exports = app;
module.exports.handler = serverless(app);