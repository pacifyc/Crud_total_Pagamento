const express = require("express");
const app = express();

const Pagamento = require("./models/Pagamento");
const path = require("path"); //enderço de cada rota
const router = express.Router(); // trabalha com as rotas
const moment = require("moment");
const handlebars = require("express-handlebars");

app.engine(
  "handlebars",
  handlebars({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    helpers: {
      formatDate: (date) => {
        return moment(date).format("DD/MM/YYYY");
      },
    },
  })
);
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Rotas
router.get("/pagamento", function (req, res) {
  res.sendFile(path.join(__dirname + "/pagamento.html"));
});

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

router.post("/pagamento", function (req, res) {
  Pagamento.create({
    nome: req.body.nome,
    valor: req.body.valor,
  })
    .then(function () {
      res.redirect("/pagamento");
    })
    .catch(function (erro) {
      res.send("Erro: Pagamento não foi cadastrado com sucesso!" + erro);
    });
});

/*
router.get("/lista", function (req, res) {
  Pagamento.findAll().then(function (pagamentos) {
    res.render("pagamento", { pagamentos: pagamentos });
  });
});
router.get("/del-pagamento/:id", function (req, res) {
  Pagamento.destroy({
    where: { id: req.params.id },
  })
    .then(function () {
      res.redirect("/pagamento");
      /*res.send("Pagamento apagado com sucesso!");*/ /*
    })
    .catch(function (erro) {
      res.send("Pagamento não apgado com sucesso!");
    });
});
router.get("/edit-pagamento/:id", function (req, res) {
  Pagamento.findByPk(req.params.id).then(function (pagamentos) {
    res.render("editar", { pagamentos: pagamentos });
  });
});

router.post("/edit-pagamento/:id", function (req, res) {
  Pagamento.update(
    { nome: req.body.nome, valor: req.body.valor },
    { where: { id: req.params.id } }
  )
    .then(function () {
      res.redirect("/lista");
    })
    .catch(function (erro) {
      res.send("Erro: Pagamento não foi cadastrado com sucesso!" + erro);
    });
});
*/
app.use("/", router);
app.use("/pagamento", router);
app.use("/lista", router);
app.use("/del-pagamento/:id", router);
app.use("/edit-pagamento/:id", router);

app.listen(8080);
