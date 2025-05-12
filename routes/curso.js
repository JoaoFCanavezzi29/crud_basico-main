const express = require('express');
const router = express.Router();
const { Aluno, Curso } = require('../models');

// Listar cursos
router.get("/", async (req, res) => {
    const cursos = await Curso.findAll();
    res.render("base", {
        title: "Listar cursos",
        view: "cursos/show",
        cursos,
    });
});

// Formulário para adicionar curso
router.get("/add", async (req, res) => {
    const alunos = await Aluno.findAll();
    res.render("base", {
        title: "Adicionar Curso",
        view: "cursos/add",
        alunos: alunos
    });
});

// Adicionar novo curso no banco de dados
router.post("/add", async(req, res) =>{

    await Curso.create({
        nome: req.body.nome,
    });
    res.redirect("/cursos");
});

router.post("/delete/:id", async (req, res) => { 

await Curso.destroy({ where: { id: req.params.id } }); 

res.redirect("/cursos"); 

});

router.get("/edit/:id", async (req, res) => { 
    const cursos = await Curso.findByPk(req.params.id); 
    res.render("base", { 
      title: "Editar Curso", 
      view: "cursos/edit", 
      cursos, 
    }); 
  }); 
  
  router.post("/edit/:id", async (req, res) => { 
    await Curso.update( 
      { nome: req.body.nome }, 
      { where: { id: req.params.id } }
    ); 
    res.redirect("/cursos");
  });

router.get("/aluno", async (req, res) => {
  const cursos = await Curso.findAll({
    include: {
      model: Aluno,
      through: { attributes: [] }
    }
  });

  res.render("base", {
    view: "cursos/aluno", cursos: cursos, title: "Curso Aluno"
  });
});

module.exports = router;
