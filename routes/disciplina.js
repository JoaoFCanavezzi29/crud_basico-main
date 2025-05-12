const express = require('express');
const router = express.Router();
const { Curso, Professor, Disciplina } = require('../models');

router.get("/", async (req, res) => {
  const disciplinas = await Disciplina.findAll({
    include: [Professor, Curso]
  });

  res.render("base", {
    title: "Disciplinas",
    view: "disciplinas/show",
    disciplinas
  });
});

router.get("/add", async (req, res) => {
  const professores = await Professor.findAll();
  const cursos = await Curso.findAll();

  res.render("base", {
    title: "Add Disciplina",
    view: "disciplinas/add",
    professores,
    cursos
  });
});

router.post("/add", async (req, res) => {
  const { nome, professorId, cursoId } = req.body;

  await Disciplina.create({
    nome,
    professorId,
    cursoId
  });

  res.redirect("/disciplinas");
});

router.get("/edit/:id", async (req, res) => {
  const disciplina = await Disciplina.findByPk(req.params.id, {
    include: [Professor, Curso]
  });

  const professores = await Professor.findAll();
  const cursos = await Curso.findAll();

  if (disciplina) {
    res.render("base", {
      title: "Editar Disciplina",
      view: "disciplinas/edit",
      disciplina,
      professores,
      cursos
    });
  } else {
    res.status(404).send("Disciplina não encontrada.");
  }
});

router.post("/edit/:id", async (req, res) => {
  const { nome, professorId, cursoId } = req.body;

  const disciplina = await Disciplina.findByPk(req.params.id);

  if (disciplina) {
    await disciplina.update({
      nome,
      professorId,
      cursoId
    });

    res.redirect("/disciplinas");
  } else {
    res.status(404).send("Disciplina não encontrada.");
  }
});

router.post("/delete/:id", async (req, res) => {
  const disciplina = await Disciplina.findByPk(req.params.id);

  if (disciplina) {
    await disciplina.destroy();
    res.redirect("/disciplinas");
  } else {
    res.status(404).send("Disciplina não encontrada.");
  }
});

module.exports = router;
