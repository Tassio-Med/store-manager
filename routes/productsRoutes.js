const { Router } = require('express');

const router = Router();

const productController = require('../controllers/productsController');

router.get('/search', productController.getByName);

router.get('/:id', productController.getById);

router.get('/', productController.getAll);

router.post('/', productController.create);

router.put('/:id', productController.update);

router.delete('/:id', productController.exclude);

module.exports = router;