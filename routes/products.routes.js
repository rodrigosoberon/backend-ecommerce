const express = require('express')
const { Router } = express
const router = Router()
const ProductsController = require('../controllers/products.controller')
const productsController = new ProductsController()

router.get('/', productsController.getProductsController)

router.get('/:id', productsController.getProductByIdController)

router.put('/:id', productsController.putProductController)

router.post('/', productsController.postProductController)

router.delete('/:id', productsController.deleteProductController)

module.exports = router
