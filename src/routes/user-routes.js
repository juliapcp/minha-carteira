const { Router } = require('express');
const UsersController = require('../controllers/users-controller');

const routes = Router();

const usersController = new UsersController();

routes.post('/cadastrar', usersController.cadastrar);

routes.post('/login', usersController.login);

routes.get('/login', usersController.mostraLogin);

routes.post('/cadastro', usersController.cadastro);

routes.get('/cadastro', usersController.mostraCadastro);

module.exports = routes;