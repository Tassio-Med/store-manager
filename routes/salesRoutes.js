const { Router } = require('express');

const routes = Router();

const bothController = require('../controllers/bothController');
const salesController = require('../controllers/salesController');

routes.get('/:id', salesController.getById);

routes.get('/', salesController.getAll);

routes.post('/', bothController.create);

routes.delete('/:id', salesController.exclude);

routes.put('/:id', bothController.update);

module.exports = routes;