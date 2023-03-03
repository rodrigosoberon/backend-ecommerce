const express = require('express')
const { Router } = express
const router = Router()
const CartsController = require('../controllers/carts.controller')
const cartsController = new CartsController()
const checkAuth = require('../middleware/check-auth')

router.use(checkAuth)

router.get('/:email', cartsController.getCartByEmailController)

router.post('/', cartsController.newCartController)

router.post('/:id', cartsController.addProductToCartController)

router.patch('/:id', cartsController.deleteProductFromCartController)

router.delete('/:email', cartsController.deleteCartController)

module.exports = router
