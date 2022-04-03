const { Router } = require('express');
const { TransacoesController } = require('../controllers/transacoes-controller');
const routes = Router();

const transacoesController = new TransacoesController();

routes.get('/cadastrar', transacoesController.mostraCadastro);

routes.get('/deletar/:id', transacoesController.deletar);

routes.get('/editar/:id', transacoesController.mostraEdicao);

routes.post('/editar/:id', transacoesController.editar);

routes.get('/', transacoesController.listar);

routes.get('/:id', transacoesController.detalhar);

routes.post('/', transacoesController.cadastrar)

module.exports = routes;