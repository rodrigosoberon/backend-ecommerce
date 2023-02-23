const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const HttpError = require('../utils/http-error')
const UsersService = require('../services/users.service')
const usersService = new UsersService()

class UsersController {
	async signup(req, res, next) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return next(new HttpError('Invalid inputs passed, please check your data.', 422))
		}

		const { name, email, password } = req.body

		let existingUser
		try {
			existingUser = await usersService.getUserByEmail(email, next)
		} catch (err) {}
		if (existingUser) {
			return next(new HttpError('User exists already, please login instead.', 422))
		}

		let hashedPassword
		try {
			hashedPassword = await bcrypt.hash(password, 12)
		} catch (err) {
			const error = new HttpError('Could not create user, please try again.', 500)
			return next(error)
		}

		const newUser = {
			name,
			email,
			password: hashedPassword,
			admin: false
		}

		const createdUser = await usersService.createUser(newUser)

		let token
		try {
			token = await usersService.createToken(createdUser, next)
		} catch (err) {}

		res.status(201).json({ userId: createdUser._id, email: createdUser.email, token: token })
	}

	async login(req, res, next) {
		const { email, password } = req.body
		let existingUser
		try {
			existingUser = await usersService.getUserByEmail(email, next)
		} catch (err) {
			return next(new HttpError('Loggin in failed, please try again later.', 500))
		}
		if (!existingUser) {
			return next('Invalid credentials, could not log you in', 401)
		}
		let isPasswordValid = false
		try {
			isPasswordValid = await bcrypt.compare(password, existingUser.password)
		} catch (err) {
			return next(new HttpError('Loggin in failed, please try again later.', 500))
		}
		if (!isPasswordValid) {
			return next('Invalid credentials, could not log you in', 401)
		}

		let token
		try {
			token = await usersService.createToken(existingUser, next)
		} catch (err) {}

		res.json({ userId: existingUser._id, email: existingUser.email, token: token })
	}
}
module.exports = UsersController
