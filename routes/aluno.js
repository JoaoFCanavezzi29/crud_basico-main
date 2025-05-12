const express = require('express');
const router = express.Router();
const { Aluno, Curso } = require('../models');

// Listar alunos
router.get("/", async (req, res) => {
    const alunos = await Aluno.findAll();
    res.render("base", {
        title: "Listar Alunos",
        view: "alunos/show",
        alunos,
    });
});

// Formulário para adicionar aluno
router.get("/add", async (req, res) => {
    const cursos = await Curso.findAll();
    res.render("base", {
        title: "Adicionar Aluno",
        view: "alunos/add",
        cursos: cursos
    });
});

// Adicionar novo aluno no banco de dados
router.post("/add", async (req, res) => {

    const aluno = await Aluno.create({
      nome: req.body.nome,
      data_nascimento: req.body.data_nascimento,
    });
  
    if (req.body.cursos && req.body.cursos.length > 0) {
      await aluno.setCursos(req.body.cursos);
    }
  
    res.redirect("/alunos"); 
  });
  


router.get("/edit/:id", async (req, res) => { 
    const aluno = await Aluno.findByPk(req.params.id); 
    res.render("base", { 
      title: "Editar Aluno", 
      view: "alunos/edit", 
      aluno, 
    }); 
  }); 
  
  router.post("/edit/:id", async (req, res) => { 
    await Aluno.update( 
      { nome: req.body.nome }, 
      { where: { id: req.params.id } }
    ); 
    res.redirect("/alunos");
  });

router.post("/delete/:id", async (req, res) => { 

await Aluno.destroy({ where: { id: req.params.id } }); 

res.redirect("/alunos"); 

});



module.exports = router;
