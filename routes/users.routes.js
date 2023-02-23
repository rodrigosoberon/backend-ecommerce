const express = require('express')
const { Router } = express
const router = Router()
const { check } = require('express-validator')

const UsersController = require('../controllers/users.controller')
const usersController = new UsersController()

router.post(
	'/signup',
	[
		check('name').not().isEmpty(),
		check('email').normalizeEmail().isEmail(),
		check('password').isLength({ min: 6 })
	],
	usersController.signup
)
router.post('/login', usersController.login)

module.exports = router
