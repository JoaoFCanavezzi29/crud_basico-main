const express = require("express"); 

const router = express.Router(); 

const { Categoria } = require("../models"); 

 
 

// Listar categorias 

router.get("/", async (req, res) => { 

const categorias = await Categoria.findAll(); 

res.render("base", { 

title: "Categorias", 

view: "categorias/show", 

categorias: categorias, 

}); 

}); 

 

// Formulário para adicionar categoria 

router.get("/add", (req, res) => { 

res.render("base", { 

title: "Add Categoria", 

view: "categorias/add", 

}); 

}); 

 

// Adicionar nova categoria 

router.post("/add", async (req, res) => { 

await Categoria.create({ nome: req.body.nome }); 

res.redirect("/categorias"); 

}); 

 

// Formulário para editar categoria 

router.get("/edit/:id", async (req, res) => { 

const categoria = await Categoria.findByPk(req.params.id); 

res.render("base", { 

title: "Editar Categoria", 

view: "categorias/edit", 

categoria, 

}); 

}); 

 

// Atualizar categoria 

router.post("/edit/:id", async (req, res) => { 

await Categoria.update( 

{ nome: req.body.nome }, 

{ 

where: { id: req.params.id }, 

} 

); 

res.redirect("/categorias"); 

}); 

// Deletar categoria 

router.post("/delete/:id", async (req, res) => { 

await Categoria.destroy({ where: { id: req.params.id } }); 

res.redirect("/categorias"); 

}); 

 

module.exports = router; 