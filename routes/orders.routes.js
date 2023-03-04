const express = require('express')
const { Router } = express
const router = Router()
const OrdersController = require('../controllers/orders.controllers')
const ordersController = new OrdersController()
const checkAuth = require('../middleware/check-auth')

router.use(checkAuth)

router.get('/', ordersController.getOrdersController)

router.post('/:cartId', ordersController.postOrderController)

router.put('/:orderId', ordersController.confirmOrderController)

router.patch('/:orderId', ordersController.cancelOrderController)

module.exports = router
