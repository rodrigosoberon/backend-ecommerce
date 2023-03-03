const express = require('express')
const { Router } = express
const router = Router()
const OrdersController = require('../controllers/orders.controllers')
const ordersController = new OrdersController()
const checkAuth = require('../middleware/check-auth')

router.post('/:cartId', ordersController.postOrderController)

module.exports = router
